import json


def lambda_handler(event, context):
    """
    This lambda function does the following:
    * authenticate the user #TODO
    * Extract the user_id and journal entry for event[body] #TODO
    * Get the sentimental value of the journal entry #TODO
    * Create a Post object #TODO
    * Save the Post object to the database #TODO
    
    Returns:
        Return a completion message and the sentimental value for the journal entry.
    """

    # authenticate the user

    # extract user_id and journal entry from event[body]    

    # get the sentimental value
    
    # create a Post object
    
    # write the Post object to the database

    #! dummy data
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "message": "Post created successfully",
        "body": json.dumps({"sentimental_value": "sad"})
    }
