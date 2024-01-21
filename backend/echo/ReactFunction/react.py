import json
import os

from mongoDB import react_to_post

def lambda_handler(event, context):
    """
    Update the reaction count.   
    """
     
    # extract the post_id and reaction for the event[body]
    event = json.loads(event["body"]) if "body" in event else event 
    if (post_id := event.get("post_id")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"A post_id must be included {event}"})
        }
    if (user_id := event.get("user_id")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"A user_id must be included {event}"})
        }
    if (reaction := event.get("reaction")) is None:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": f"A reaction must be included {event}"})
        }
 
    # update the Post object reaction field
    result = react_to_post(os.environ.get("ATLAS_URI"), 
                           post_id, 
                           user_id, 
                           reaction)
    
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
