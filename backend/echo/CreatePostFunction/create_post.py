import json

from mongo_db import create_post
from request_validation import (
    extract_body_from_request,
    extract_value_from_body
)

def lambda_handler(event, context):
    """
    Returns:
        Return a completion message and the sentimental value for the journal entry.
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
                                + " with the user id and the journal entry"
                }
            )
        }   

    # validate the event body
    status, user_id = extract_value_from_body(event, "user_id")
    if not status:
        return user_id
    
    status, journal_entry = extract_value_from_body(event, "journal_entry")
    if not status:
        return journal_entry
    
    #TODO write to database
    
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": f"Data recieved: user_id={user_id}; " 
                            + f"journal_entry={journal_entry}. NOTE: This data "
                            + "is not being written to a database. The " 
                            + "sentimental_value is hard-coded",
                "sentimental_value": "SAD"
            }
        )
    }
    
    
    
    
    