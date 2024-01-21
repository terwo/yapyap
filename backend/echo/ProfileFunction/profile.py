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

    # authenticate the user
    
    # get the user information from the authentication
    
    # get the user object from the database
    
    #! dummy data
    return {
        "statusCode": 200,
        "data": {
            "user": {
                "user_id": "1",
                "posts": ["1", "2", "4536", "58888"],
                "avatar": "HappyLama"
            }
        }
    }
