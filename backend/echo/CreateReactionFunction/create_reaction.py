import json

from mongo_db import react_to_post
from request_validation import (
    extract_body_from_request,
    extract_value_from_body
)

def lambda_handler(event, context):
    """
    Update the reaction count for a given post.
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
                                + " with the user_id, post_id and reaction."
                }
            )
        }   

    # authenticate the body
    status, user_id = extract_value_from_body(event, "user_id")
    if not status:
        return user_id
    
    status, post_id = extract_value_from_body(event, "post_id")
    if not status:
        return post_id
    
    status, reaction = extract_value_from_body(event, "reaction")
    if not status:
        return reaction
    
    #TODO update the database
    # result = react_to_post(post_id, user_id, reaction)
    
    result = 0 #TODO remove before deployment
    
    match result:
        case 0:
            return {"statusCode": 200}
        case -1:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": f"unknown reaction: {reaction}"})
            }
        case -2:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": f"unknown post: {post_id}"})
            } 
        case -3: 
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": f"unknown post: {post_id}"})
            }
        case -4, -5:
          return {
                "statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"message": "Update issue"})
            } 

    return {
        "statusCode": 500,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": f"Uknown error"})
    } 
