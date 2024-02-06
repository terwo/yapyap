import json

from .utils import invoke_function


EVENTS_DIR = "./tests/events/create_reaction_events/"


class TestCreateReaction:
    """
    Unit tests for the Create Reaction lambda function.
    """    
    
    def get_response(self, event_name: str) -> dict:
        """
        Helper method to invoke a lambda function
        with a specific event.

        Args:
            event_name (str): Name of the event that is being tested.

        Returns:
            dict: HTTP response.
        """
        response = invoke_function(
            "CreateReactionFunction",
            EVENTS_DIR + f"{event_name}_event.json"    
        )
        if isinstance(response, int):
            assert False # something went wrong!
        return response    
        
    def test_empty_body_event(self):
        response = self.get_response("empty_body")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Invalid request body! " \
                                          + "Request must have a body with "\
                                          + "the user_id, post_id and reaction."

    def test_missing_user_id_event(self):
        response = self.get_response("missing_user_id")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A user_id must be included " \
                                          + "in the request body."
            
    def test_missing_post_id_event(self):
        response = self.get_response("missing_post_id")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A post_id must be included " \
                                          + "in the request body."

    def test_missing_reaction_event(self):
        response = self.get_response("missing_reaction")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A reaction must be included " \
                                          + "in the request body."
    def test_valid_event(self):
        response = self.get_response("valid")        
        assert response.get("statusCode", 0) == 200
