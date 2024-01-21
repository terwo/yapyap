import json
import os

from mongoDB import (
    read_all_posts, 
    posted_today
)


def lambda_handler(event, context):
    """
    
    Returns:
        Return a list of Post objects in the data field.
    """
    params = event["queryStringParameters"]
   
    # authenticate the user
    if (user_id := params.get("user_id")) is None:
        return {"statusCode": 401}
    
    uri = os.environ.get("ATLAS_URI")
    if posted_today(uri, user_id) is not None:
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