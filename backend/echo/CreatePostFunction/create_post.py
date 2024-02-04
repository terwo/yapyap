import json

from mongo_db import create_post
from request_validation import extract_body_from_request


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


    # authenticate the user
    if (user_id := event.get("user_id")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "A user_id must be included in " 
                                + "the request body"
                }
            )
        }
    
    # validate the journal entry
    if (journal_entry := event.get("journal_entry")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": "A journal_entry must be included " 
                                + "in the request body"
                }
            )
        }
    
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
    
    
    
    
    