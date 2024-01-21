import json


def lambda_handler(event, context):
    """
    This lambda function does the following:
    * Authenticate the user #TODO
    * Extract the post_id, user_id and reaction from event[body] #TODO
    * Check if the user has already reacted to the post. 
      If not, update the Post object in the database #TODO
    * Signal the user of the post to get a reaction notification #TODO
    Returns:
        Return a message
    """

    # authenticate the user
    
    # extract the post_id and reaction for the event[body]
    
    # check to see if the user has already reacted to this post
    
    # update the Post object reaction field
    
    #! dummy data
    return {"statusCode": 200}
