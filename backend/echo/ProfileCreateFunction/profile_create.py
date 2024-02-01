import json
import os

from mongoDB import add_user


def lambda_handler(event, context):
    """
    Add a user to the database.
    Returns:
        Return a User Object.
    """
    event = json.loads(event["body"]) if "body" in event else event 
    
    # authenticate the user
    if (username := event.get("username")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"A username must be included {event}"})
        }

    if (password := event.get("password")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "A password must be included"})
        }
    
    result = add_user(
        os.environ.get("PYMONGO_USR"), 
        os.environ.get("PYMONGO_PWD"), 
        username, 
        password
    )
    
    if isinstance(result, str):
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"user_id": result})
            
        }        
    if result == -1:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"}, 
            "body": json.dumps({"message": f"Username {username} already exists"})
        }
    else:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"}, 
            "body": json.dumps({"message": f"Could not create a new user"})
        }
