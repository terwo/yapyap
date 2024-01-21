import json
import os

from mongoDB import add_user


def lambda_handler(event, context):
    """
    Add a user to the database.
    Returns:
        Return a User Object.
    """

    event = json.loads(event["body"])

    # authenticate the user
    if (username := event.get("username")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "A username must be included"})
        }
    
    if (password := event.get("password")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "A password must be included"})
        }
    
    result = add_user(os.environ.get("ATLAS_URI"), username, password)
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
