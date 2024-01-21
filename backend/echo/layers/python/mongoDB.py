from bson.objectid import ObjectId
import random
from datetime import datetime, timedelta, timezone

from pymongo import MongoClient


AVATARS = ["penguin", "duck", "pig", "bunny"]
REACTIONS = ["heart", "high-five"]



def get_client(atlas_uri: str) -> MongoClient:
    return MongoClient(host=atlas_uri)


def find_user_by_user_id(atlas_uri: str, user_id: str):
    client = get_client(atlas_uri)
    users = client.EchoDev.users
    
    result = users.find_one({"_id": ObjectId(user_id)})
    return result if isinstance(result, dict) else False
 

def add_user(atlas_uri: str, username: str, password:str) -> str | int:
    """
    Add a user to the database.

    Args:
        atlas_uri (str): URI to the datebase.
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


def user_profile(atlas_uri: str, username: str, password:str) -> str | bool:
    """
    Get the user profile

    Args:
        atlas_uri (str): URI to the datebase.
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


def read_all_posts(atlas_uri: str) -> list[dict]:
    """
    Get all the posts from the database.

    Args:
        atlas_uri (str): URI to the datebase.

    Returns:
        list[dict] | None: A list of dictionaries containing a post entry. None otherwise.
    """
    client = get_client(atlas_uri)
    db = client.EchoDev
    
    posts = list(db.posts.find().sort({"last_saved_date": 1}))

    if not posts:
        return None    
        
    for post in posts:
        post["_id"] = str(post["_id"])
        post["user_id"] = str(post["user_id"])
        post["last_saved_date"] = post["last_saved_date"].isoformat()
     
    return posts


def posted_today(atlas_uri: str, user_id: str) -> bool:
    """
    Check if the user made a post today.

    Args:
        atlas_uri (str): URI to the database.
        user_id (str): User id.

    Returns:
        bool: True if the user made a post today. False otherwise.
    """
    client = get_client(atlas_uri)
    db = client.EchoDev    
    
    result = db.posts.find_one(
        {
            "user_id": ObjectId(user_id), 
            "last_saved_date": {
                "$gte": datetime.today(),
                "$lt": datetime.today() + timedelta(days=1)
            }
        }
    )
    
    if isinstance(result, dict):
        result["_id"] = str(result["_id"])
        result["user_id"] = str(result["user_id"])
    return None


def create_post(atlas_uri: str, user_id: str, journal_entry: str):
    client = get_client(atlas_uri)
    posts = client.EchoDev.posts
    users = client.EchoDev.users
    
    user = find_user_by_user_id(atlas_uri, user_id)
    
    if not isinstance(user, dict):
        return None
        
    # get sentimental value
    sentimental_value = "sad"
    
    insert_result = posts.insert_one({
        "user_id": ObjectId(user_id),
        "last_saved_date": datetime.now(tz=timezone.utc),
        "journal_entry": journal_entry,
        "sentimental_value": sentimental_value, #TODO
        "reactions": {
            "heart": 0,
            "high-five": 0
        },
        "reacted_users": []
    })
    
    if not insert_result.inserted_id:
        return None
    
    user["posts"].append(ObjectId(insert_result.inserted_id))
    update_result = users.update_one(
        {"_id": user["_id"]},
        {"$set": {"posts": user["posts"]}}
    )
    
    if not update_result.acknowledged: # rollback
        posts.delete_one({"_id": ObjectId(insert_result.inserted_id) })
        return None
    
    return sentimental_value


def react_to_post(atlas_uri: str, post_id: str, user_id: str, reaction: str, increment: bool = True):    
    if reaction not in REACTIONS:
        return -1
    
    client = get_client(atlas_uri)
    posts = client.EchoDev.posts
    
    post_result = posts.find_one({"_id": ObjectId(post_id)})
    
    if not isinstance(post_result, dict):
        return -2
    
    if not find_user_by_user_id(atlas_uri, user_id):
        return -3
    
    # check if the user has already reacted to this
    has_reacted = ObjectId(user_id) in post_result["reacted_users"]
    
    if (increment and has_reacted) or \
        (not increment and not has_reacted):
        return -4
    
    if increment:
        post_result["reacted_users"].append(ObjectId(user_id))
    else: 
        post_result["reacted_users"].remove(ObjectId(user_id))
    update_result = posts.update_one(
        {"_id": post_result["_id"]},
        {
            "$set": {"reacted_users": post_result["reacted_users"]},
            "$inc": {f"reactions.{reaction}": 1 if increment else -1}
        }
    )
    
    if not update_result.acknowledged:
        return -5
    return 0
