import json

from .utils import invoke_function


EVENTS_DIR = "./tests/events/create_post_events/"


class TestCreatePost:
    """
    Unit tests for the Create Post lambda function.
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
            "CreatePostFunction",
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
                                          + "the user id and the journal entry"

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
            
    def test_missing_journal_entry_event(self):
        response = self.get_response("missing_journal_entry")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A journal_entry must be included " \
                                          + "in the request body."

    def test_valid_event(self):
        response = self.get_response("valid")        
        assert response.get("statusCode", 0) == 200
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Data recieved: user_id=test_event_id; " \
                                          + "journal_entry=Some journal entry. " \
                                          + "NOTE: This data is not being " \
                                          + "written to a database. " \
                                          + "The sentimental_value is hard-coded"
        assert body.get("sentimental_value", "") == "SAD"
