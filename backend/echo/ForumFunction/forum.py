import json
import os

from mongoDB import (
    read_all_posts, 
    posted_today
)


def lambda_handler(event, context):
    """
    This lambda function does the following:
    * authenticate the user
    * Check if the current user has made a post today #TODO
    * If so, get a list of the most recent posts from the database #TODO
    * Otherwise, return a message stating that the user has not made a request yet #TODO
    
    Returns:
        Return a list of Post objects in the data field.
    """
    event = json.loads(event["body"]) if "body" in event else event 
 
    # authenticate the user
    if (user_id := event.get("user_id")) is None:
        return {"statusCode": 401}
    
    uri = os.environ.get("ATLAS_URI")
    
    if posted_today(uri, user_id):
        if (posts := read_all_posts(uri)) is None:
            return {
                "statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": f"No posts found!"})
            }
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"posts": posts})
        }
    
    return {
        "statusCode": 401,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message", "User needs to post today before viewing other posts"})
    }
    
    
    # if user has made a post today

    #! dummy data
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({
            "posts": [
                {
                    "post_id": "1",
                    "user_id": "12345",
                    "last_saved_date": "2024-01-20T23:28:19-0800",
                    "journal_entry": "This is a journal entry from user 12345",
                    "sentimental_value": "angry",
                    "reactions": {
                        "heart": 0,
                        "hi_five": 0
                    }
                },
                {
                    "post_id": "45",
                    "user_id": "56789",
                    "last_saved_date": "2024-01-20T12:28:19-0800",
                    "journal_entry": "This is a journal entry from user 56789",
                    "sentimental_value": "sad",
                    "reactions": {
                        "heart": 56,
                        "hi_five": 2
                    }
                }
            ]
        })
    }
