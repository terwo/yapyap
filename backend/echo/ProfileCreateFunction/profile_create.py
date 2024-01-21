import json


def lambda_handler(event, context):
    """
    This lambda function does the following:
    * Authenticate the user #TODO
    * Get the user information from the authentication #TODO
    * Get the User object from the database #TODO
    Returns:
        Return a User Object
    """

    event = json.loads(event["body"])
    print(event)

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
    
        
    # get the user information from the authentication
    
    # get the user object from the database
    
    #! dummy data
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": f"User {username} will be created with password {password}"})
    }
