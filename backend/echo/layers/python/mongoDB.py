import random

from pymongo import MongoClient


AVATARS = ["penguin", "duck", "pig", "bunny"]


def get_client(atlas_uri: str) -> MongoClient:
    return MongoClient(host=atlas_uri)


def add_user(atlas_uri: str, username: str, password:str) -> str | int:
    """
    Add a user to the database.

    Args:
        username (str): Unique username of the user.
        password (str): Password for the user.

    Returns:
        bool | None: True if inserted, False if not. None if the username already exists.
    """
    client = get_client(atlas_uri)
    users = client.EchoDev.users

    if users.find_one({"username": username}) is not None:
        return -1
    
    result = users.insert_one({
        "username": username,
        "password": password,
        "avatar": AVATARS[random.randint(0, len(AVATARS) - 1)],
        "posts": []
    })            

    return str(result.inserted_id) if result.inserted_id else -2       


def login_user(atlas_uri: str, username: str, password:str) -> str | int:
    """
    Validate a user into the database.

    Args:
        username (str): Unique username of the user.
        password (str): Password for the user.

    Returns:
        
    """
    client = get_client(atlas_uri)
    users = client.EchoDev.users

    if users.find_one({"username": username}) is None:
        return -1
    
    result = users.insert_one({
        "username": username,
        "password": password,
        "avatar": AVATARS[random.randint(0, len(AVATARS) - 1)],
        "posts": []
    })            

    return str(result.inserted_id) if result.inserted_id else -2     


def user_profile(atlas_uri: str, username: str, password:str) -> str | bool:
    """
    Get the user profile

    Args:
        username (str): Unique name of the user.
        password (str): Password for the user.

    Returns:
        str | bool: user object if log in was successful, False otherwise.
    """
    client = get_client(atlas_uri)
    users = client.EchoDev.users

    if (user := users.find_one({"username": username})) is None:
        return False
   
    user["_id"] = str(user["_id"])
    
    for i, post in enumerate(user["posts"]):
        user["posts"][i] = str(post)
 
    return user
