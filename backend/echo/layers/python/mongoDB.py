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
        "avatar": AVATARS[random.randint(0, len(AVATARS))],
        "posts": []
    })            

    return str(result.inserted_id) if result.inserted_id else -2       