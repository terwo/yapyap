import json

def lambda_handler(event, context):
    """
    Returns:
        Get an existing user's information.
    """
    if (qsp := event.get("queryStringParameters")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "Invalid request! Request must include "
                                + "a query string with the user_id"
                }
            )
        }   
        
    if (user_id := qsp.get("user_id")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "Request must include the user_id "
                                + "in the query string parameters"
                }
            )
        }   
    
    #TODO: check if username exists
    #TODO: customize the posts to the user
    #TODO: get data from database
    
    return {
        "statusCode": 200,
        "body": json.dumps(
            { # TODO: temp; to be deleted
                "message": f"Data recieved: user_id={user_id}. " 
                            + "NOTE: This data does not come from a database.",
                "posts": []
            }
        )
    }
    
    
    
    
    