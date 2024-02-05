import json

from request_validation import extract_body_from_request


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
    if (username := event.get("username")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "A username must be included in " 
                                + "the request body"
                }
            )
        }
    if (password := event.get("password")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "A password must be included " 
                                + "in the request body"
                }
            )
        }
    
    #TODO: check if username already exists
    #TODO: check for a strong password 
    #TODO: write to database
    
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
    
    
    
    
    