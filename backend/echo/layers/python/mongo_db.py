from bson.objectid import ObjectId
from datetime import datetime, timedelta
from enum import Enum
import functools
import os
import random
import secrets
import time
import uuid

import pymongo
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.errors import OperationFailure


AVATARS = ["penguin", "duck", "pig", "bunny"]
REACTIONS = ["heart", "high_five", "star", "battery", "medal"]

DB_WRITE_ATTEMPTS = 5


class ErrorCode(Enum):
    """
    Error codes.
    
    6X: Authorization Errors.
        60: Invalid user credentials.
    7X: MongoDB Access Errors.
        70: Could not connect to MongoDB database.
        71: Could not get Posts collection.
        72: Could not get a specific Post for the Posts collection.
        73: Could not get Users collection.
        74: Could not get a specific User for the Users collection.
        75: User already exists.
        76: Failed to update a collection.
    8X: Miscellaneous Errors.
        80: Invalid reaction.
        81: User is trying to react to a reacted post or unreact to a already unreacted post.
    """
    
    INVALID_USER_CREDENTIALS = 60
    
    MONGODB_CONNECTION_FAILED = 70
    FAILED_TO_GET_POSTS_COLLECTION = 71
    FAILED_TO_GET_POST = 72
    FAILED_TO_GET_USERS_COLLECTION = 73
    FAILED_TO_GET_USER = 74
    USER_ALREADY_EXISTS = 75
    FAILED_TO_UPDATE_A_COLLECTION = 76
    
    INVALID_REACTION = 80
    CANNOT_REACT = 81


####################
# HELPER FUNCTIONS #
####################

def db_write_attempts(func):
    """
    Attempt to write to the database DB_WRITE_ATTEMPTS.
    If write was unsecessful, return False.

    Args:
        func: Database update function to run. 

    Returns:
        pymongo.results | bool: pymongo.results object if write was successfully. 
                                False otherwise. 
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for _ in range(DB_WRITE_ATTEMPTS):
            result = func(*args, **kwargs) # pymongo.results
            if result.acknowledged:
                return result
        return False
    return wrapper


def _read_client() -> MongoClient | bool:
    """
    Establish a connection with the MongoDB database.

    Returns:
        MongoClient | bool: PyMongo Object. Return False if 
                            a connection could not be established.
    """
    mongo_usr = os.environ.get("MONGO_DB_ID")
    mongo_pwd = os.environ.get("MONGO_DB_PWD")
    atlas_uri = f"mongodb+srv://{mongo_usr}:{mongo_pwd}@echodev.xuwka1h.mongodb.net/?retryWrites=true&w=majority"
    try:
        return MongoClient(host=atlas_uri)
    except Exception as e:
        return False    


def _read_users_collection(client: MongoClient) -> Collection | bool:
    """
    Get the user collection from the database specified 
    by the environment variable.

    Args:
        client (MongoClient): MongoDB client.

    Returns:
        MongoClient.Collection | bool: User collection if the environment 
                                       variable is known. False otherwise.
    """
    env: str = os.environ.get("ENV", "")
    match env:
        case "prod":
            return client.prod.users
        case "dev":
            return client.dev.users
        case "test":
            return client.test.users
        case _: # unknown environment variable
            return False


def _read_posts_collection(client: MongoClient) -> Collection | bool:
    """
    Get the posts collection from the database specified 
    by the environment variable.

    Args:
        client (MongoClient): MongoDB client.

    Returns:
        MongoClient.Collection | bool: Post collection if the environment 
                                       variable is known. False otherwise.
    """
    env: str = os.environ.get("ENV", "")
    match env:
        case "prod":
            return client.prod.posts
        case "dev":
            return client.dev.posts
        case "test":
            return client.test.posts
        case _: # unknown environment variable
            return False


def _valid_user(
    client: MongoClient, 
    user_id: str, 
    device_id: str,
    yap_yap_auth_token: str
) -> dict | None:
    """
    Validate the user's authentication token and their user_id.

    Args:
        client (MongoClient): MongoDB client.
        user_id (str): User's unique id.
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): Authentication token.

    Returns:
        dict | None: User data if user is found. None otherwise.
    """
    if not (users := _read_users_collection(client)):
        return None
    
    if (user := users.find_one({"_id": ObjectId(user_id)})) is None:
        return None
    
    try:
        uuid.UUID(device_id)
    except ValueError:
        return None
    
    target = {
        "device_id": device_id,
        "token": yap_yap_auth_token
    }
    
    return user if target in user["yap_yap_auth_tokens"] else None
    

def _find_posts(filters: dict, posts_collection: Collection) -> list[dict]:
    """
    Query for a posts according to the filter and return a list
    of posts ordered by latest date.

    Args:
        filter (dict): Filters for the query.
        posts_collection (Collection): Mongodb collection of posts.

    Returns:
        list[dict]: List of posts
    """
    
    posts = list(posts_collection.find(
        filters
    ).sort(
        [("last_saved_date", pymongo.DESCENDING)]
    ))
    
    for post in posts:
        post["_id"] = str(post["_id"])
        post["user_id"] = str(post["user_id"])
        post["last_saved_date"] = post["last_saved_date"].isoformat()
     
    return posts
    

###################
# TOKEN FUNCTIONS #
###################

DELIM = "YAP"

def _generate_token() -> str:
    timestamp = str(int(time.time()))
    while True:
        token = secrets.token_hex(16)
        if DELIM not in token:
            return timestamp + DELIM + token

    
def _is_valid_token(token: str) -> bool:
    # TODO
    return True


##########################
# USER-CENTRIC FUNCTIONS #
##########################

def create_user(username: str, password:str) -> bool | ErrorCode:
    """
    Add a user to the database.

    Args:
        username (str): Unique username of the user.
        password (str): Password for the user.

    Returns:
        bool | ErrorCode: True if inserted, False if insertion failure.
                    -1 if ENV variable was not set. 
                    Otherwise, return an ErrorCode.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if not (users_collection := _read_users_collection(client)):
        return ErrorCode.FAILED_TO_GET_USERS_COLLECTION
    if users_collection.find_one({"username": username}) is not None:
        return ErrorCode.USER_ALREADY_EXISTS
    
    @db_write_attempts
    def insert():
        return users_collection.insert_one({
            "username": username,
            "password": password,
            "avatar": AVATARS[random.randint(0, len(AVATARS) - 1)],
            "posts": [], # post object ids
            "yap_yap_auth_tokens": [] # list of uuid device and its token
        })  
           
    return False if isinstance(insert(), bool) else True   
    

def read_user(
    user_id: str, 
    device_id:str, 
    yap_yap_auth_token: str
) -> dict | ErrorCode:
    """
    Collect the user's data.

    Args:
        user_id (str): User's unique id.
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): User's authentication token.

    Returns:
        dict | int: Dictionary of the user's data if user is found.
                    If the ENV variable is not set, 
                        return -1 for an interal error.
                    If the user_id and token are not valid, return -2.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if (user := _valid_user(
            client, user_id, device_id, yap_yap_auth_token
            )) is None:
        return ErrorCode.INVALID_USER_CREDENTIALS
    
    user["_id"] = str(user["_id"])
    return user


def login(username: str, password:str, device_id: str) -> dict | ErrorCode:
    """
    Get the user profile.

    Args:
        username (str): Unique name of the user.
        password (str): Password for the user.
        device_id (str): User's unique device id.

    Returns:
        dict | ErrorCode: User object if login was successful. Otherwise, an ErrorCode.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if not (users_collection := _read_users_collection(client)):
        return ErrorCode.FAILED_TO_GET_USERS_COLLECTION
    if (user := users_collection.find_one(
            {"username": username, "password": password}
            )) is None:
        return ErrorCode.FAILED_TO_GET_USER
   
    # add the device id and the token for that device
    token = _generate_token()
    
    for index, device in enumerate(user["yap_yap_auth_tokens"]):
        if device["device_id"] == device_id:
            user["yap_yap_auth_tokens"][index]["token"] = token
            
            @db_write_attempts
            def update():
                return users_collection.update_one(
                    {"_id": user["_id"]},
                    {"$set": {"yap_yap_auth_tokens": user["yap_yap_auth_tokens"]}}
                )
            update_result = update()
            break
    else: # device has not yet be registered for this device
        @db_write_attempts
        def update():
            return users_collection.update_one(
                {"_id": user["_id"]},
                {
                    "$push": {
                        "yap_yap_auth_tokens": {
                            "device_id": device_id,
                            "token": token
                        }
                    }
                }
            )
        update_result = update()
        
    if isinstance(update_result, bool):
        return ErrorCode.FAILED_TO_UPDATE_A_COLLECTION
    
    if (user := users_collection.find_one(
            {"username": username, "password": password}
            )) is None:
        return ErrorCode.FAILED_TO_GET_USER
   
    user["_id"] = str(user["_id"])
    
    for i, post_id in enumerate(user["posts"]):
        user["posts"][i] = str(post_id) 
    
    return user


def logout():
    #TODO
    pass


##########################
# POST-CENTRIC FUNCTIONS #
##########################


def read_all_posts(
    user_id: str, 
    yap_yap_auth_token: str
)  -> list[dict] | int:
    """
    Get all the posts from the database.

    Args:
        user_id (str): User's unique id.
        yap_yap_auth_token (str): User's authentication token.

    Returns:
        list[dict] | None: A list of dictionaries containing a post entry.
                           If the collection could not be found, 
                                return -1 for an internal error.
                           If the user_id and the authentication 
                                token do not match, return -2.
                           Othwise, return -3.
    """
    if not (client := _read_client()):
        return -1
    if _valid_user(user_id, yap_yap_auth_token) is None:
        return -2
    if not (posts_collection := _read_posts_collection(client)):
        return -1
    
    #TODO a find filter
    filters = {}
    return _find_posts(filters, posts_collection)


def read_user_posts(
    user_id: str, 
    device_id: str,
    yap_yap_auth_token: str
)-> list[dict] | ErrorCode:
    """
    Get all the posts from a specific user from the database.

    Args:
        user_id (str): User's unique id.
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): User's authentication token.

    Returns:
        list[dict] | None: A list of dictionaries containing a post entry.
                           If the collection could not be found, 
                                return -1 for an internal error.
                           If the user_id and the authentication 
                                token do not match, return -2.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if _valid_user(client, user_id, device_id, yap_yap_auth_token) is None:
        return ErrorCode.INVALID_USER_CREDENTIALS
    if not (posts_collection := _read_posts_collection(client)):
        return ErrorCode.FAILED_TO_GET_POSTS_COLLECTION
    return _find_posts({"user_id": user_id}, posts_collection)
    
    
def posted_today(user_id: str, device_id: str, yap_yap_auth_token: str) -> bool | ErrorCode:
    """
    Check if the user made a post today.

    Args:
        user_id (str): User's unique id.
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): User's authentication token.

    Returns:
        bool | int: True if the user made a post today. 
              If the collection could not be found, 
                    return -1 for an internal error.
              If the user_id and the authentication 
                    token do not match, return -2.
              Othwise, return False.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if _valid_user(client, user_id, device_id, yap_yap_auth_token) is None:
        return ErrorCode.INVALID_USER_CREDENTIALS
    if not (posts_collection := _read_posts_collection(client)):
        return ErrorCode.FAILED_TO_GET_POSTS_COLLECTION
    
    date = datetime.now(datetime.UTC)    
    search_parms = {
        "$and": [
            {
                "user_id": ObjectId(user_id), 
            },
            {
                "last_saved_date": {
                    "$gte": date + timedelta(days=-1),
                    "$lt": date
                }
            }
        ]
    }
    return False if posts_collection.find_one(search_parms) is None else True
       

def create_post(
    user_id: str, 
    device_id: str,
    yap_yap_auth_token: str, 
    journal_entry: str, 
    sentimental_value: str
) -> bool | ErrorCode:
    """
    Save a post to the database.

    Args:
        user_id (str): User's unique id.
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): User's authentication token.
        journal_entry (str): New journal entry to be saved.
        sentimental_value (str): Sentimental value of the journal entry.

    Returns:
        bool | int: True if the post was successfully saved. Othwise, return an ErrorCode.
    """
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if (user := _valid_user(client, user_id, device_id, yap_yap_auth_token)) is None:
        return ErrorCode.INVALID_USER_CREDENTIALS
    if not (posts_collection := _read_posts_collection(client)):
        return ErrorCode.FAILED_TO_GET_POSTS_COLLECTION
    if not (users_collection := _read_users_collection(client)):
        return ErrorCode.FAILED_TO_GET_USERS_COLLECTION

    user["_id"] = str(user["_id"])    
    for i, post_id in enumerate(user["posts"]):
        user["posts"][i] = str(post_id)
    
    valid_transaction = True
    with client.start_session() as session:
        with session.start_transaction():
                        
            @db_write_attempts
            def insert():
                return posts_collection.insert_one(
                    {
                        "user_id": ObjectId(user_id),
                        "last_saved_date": datetime.now(datetime.UTC),
                        "journal_entry": journal_entry,
                        "sentimental_value": sentimental_value,
                        "reactions": {reaction: 0 for reaction in REACTIONS},
                        "reacted_users_ids": []
                    },
                    session=session
                )

            if isinstance(insert_result := insert(), bool):
                valid_transaction = False
                raise OperationFailure("Insertion failed")
                
            # update the user's list of posts
            user["posts"].append(ObjectId(insert_result.inserted_id))
            
            @db_write_attempts
            def update():
                return users_collection.update_one(
                    {"_id": user["_id"]},
                    {"$set": {"posts": user["posts"]}},
                    session=session
                )
            
            if isinstance(update(), bool):
                valid_transaction = False
                raise OperationFailure("Insertion failed")            
                
        return valid_transaction
        

def react_to_post(
    post_id: str, 
    user_id: str, 
    device_id: str,
    yap_yap_auth_token: str, 
    reaction: str, 
    increment: bool = True
) -> bool | ErrorCode:    
    """
    Add a reaction to a post.

    Args:
        post_id (str): Post id.
        user_id (str): Reactor's unique id. 
        device_id (str): User's unique device id.
        yap_yap_auth_token (str): User's authentication token.
        reaction (str): Target reaction.
        increment (bool, optional): Attempt to increment the reaction by 1. Defaults to True.

    Returns:
        bool | int: True if a reaction was successfully made. Otherwise, return an ErrorCode.
    """
    if reaction not in REACTIONS:
        return ErrorCode.INVALID_REACTION    
    if not (client := _read_client()):
        return ErrorCode.MONGODB_CONNECTION_FAILED
    if _valid_user(client, user_id, device_id, yap_yap_auth_token) is None:
        return ErrorCode.INVALID_USER_CREDENTIALS
    if not (posts_collection := _read_posts_collection(client)):
        return ErrorCode.FAILED_TO_GET_POSTS_COLLECTION
    if (post := posts_collection.find_one({"_id": ObjectId(post_id)})) is None:
        return ErrorCode.FAILED_TO_GET_POST
    
    # check if the user has already reacted to this
    reacted_user = next((reacted_user for reacted_user in post["reacted_user_ids"]
                         if reacted_user["user_id"] == ObjectId(user_id)), False)
    
    if (increment and reacted_user) or \
            (not increment and not reacted_user):
        return ErrorCode.CANNOT_REACT         
    
    reaction_obj = {
        "user_id": ObjectId(user_id),
        "reaction": reaction
    }
    
    if increment:
        post["reacted_user_ids"].append(reaction_obj)
    else: 
        post["reacted_user_ids"].remove(reaction_obj)
    
    @db_write_attempts
    def update():
        return posts_collection.update_one(
            {"_id": post["_id"]},
            {
                "$set": {"reacted_user_ids": post["reacted_user_ids"]},
                "$inc": {f"reactions.{reaction}": 1 if increment else -1}
            }
        )
    return False if isinstance(update(), bool) else True