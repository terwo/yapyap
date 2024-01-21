import json
import os

from mongoDB import create_post

def lambda_handler(event, context):
    """
    Returns:
        Return a completion message and the sentimental value for the journal entry.
    """

    # extract user_id and journal entry from event[body]    
    event = json.loads(event["body"]) if "body" in event else event 
    
    # authenticate the user
    if (user_id := event.get("user_id")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"A user_id must be included {event}"})
        }

    if (journal_entry := event.get("journal_entry")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "A journal_entry must be included"})
        }
    
    # create a Post object
    result = create_post(os.environ.get("ATLAS_URI"), user_id, journal_entry)
    if result is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "something went wrong..."})
        }
    
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"sentimental_value": result})
    }
