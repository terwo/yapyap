import json

from request_validation import (
    extract_body_from_request,
    extract_value_from_body
)


def lambda_handler(event, context):
    """
    Returns:
        Add a new user to the database.
    """

    # extract user_id and journal entry from event[body]    
    event: dict | None = extract_body_from_request(event)
    
    if event is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "Invalid request body! Request must have a body"
                                + " with the username and the password"
                }
            )
        }   

    # authenticate the body
    status, username = extract_value_from_body(event, "username")
    if not status:
        return username
    
    status, password = extract_value_from_body(event, "password")
    if not status:
        return password
    
    #TODO validate user
    #TODO return a token to indicate user is logged in
        
    return {
        "statusCode": 200,
        "body": json.dumps(
            { # TODO: temp; to be deleted
                "message": f"Data recieved: username={username}; " 
                            + f"password={password}. NOTE: This data "
                            + "is not being written to a database."
            }
        )
    }
    
    
    
    
    