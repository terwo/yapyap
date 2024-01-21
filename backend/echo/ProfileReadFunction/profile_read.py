import json
import os

from mongoDB import user_profile


def lambda_handler(event, context):
    """
    Get the profile of the user
    Return a User Object
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
                
    # get the user information from the authentication
    result = user_profile(os.environ.get("ATLAS_URI"), username, password)
    
    if isinstance(result, dict):
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "user": result
            })
        }
    else:
        return {
            "statusCode": 401,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "message": "Unauthorized user"
            })
        }