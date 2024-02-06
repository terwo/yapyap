import json

from .utils import invoke_function


EVENTS_DIR = "./tests/events/create_profile_events/"


class TestCreateProfile:
    """
    Unit tests for the Create Profile lambda function.
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
            "CreateProfileFunction",
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
                                          + "the username and the password"

    def test_missing_username_event(self):
        response = self.get_response("missing_username")        
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A username must be included " \
                                          + "in the request body."
            
    def test_missing_password_event(self):
        response = self.get_response("missing_password")                
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A password must be included " \
                                          + "in the request body."

    def test_valid_event(self):
        response = self.get_response("valid")        
        assert response.get("statusCode", 0) == 200
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Data recieved: username=test_event_username; " \
                                          + "password=test_event_password. " \
                                          + "NOTE: This data is not being " \
                                          + "written to a database."
