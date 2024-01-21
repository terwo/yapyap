import json


def lambda_handler(event, context):
    """
    This lambda function does the following:
    * Authenticate the user #TODO
    * Extract the post_id from the event[body] #TODO
    * Get the Post object from the database #TODO
    Returns:
        Return the post object
    """

    # authenticate the user
    
    # extract the post_id from the event[body]
    
    # get the Post object from the database    
    
    #! dummy data
    return {
        "statusCode": 200,
        "data": {
            "post": {
                "post_id": "1",
                "user_id": "12345",
                "last_saved_date": "2024-01-20T23:28:19-0800",
                "journal_entry": "This is a journal entry from user 12345",
                "sentimental_value": "angry",
                "reactions": {
                    "heart": 5,
                    "hi_five": 22
                }
            }
        }
    }
