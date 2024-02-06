import json

from .utils import invoke_function


EVENTS_DIR = "./tests/events/read_profile_events/"


class TestReadProfile:
    """
    Unit tests for the Read Profile lambda function.
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
            "ReadProfileFunction",
            EVENTS_DIR + f"{event_name}_event.json"    
        )
        if isinstance(response, int):
            assert False # something went wrong!
        return response    
    
    def test_empty_qsp_event(self):
        response = self.get_response("empty_qsp")        
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Invalid request! Request must " \
                                          + "include a query string with " \
                                          + "the user_id"
                                          
    def test_missing_user_id_event(self):
        response = self.get_response("missing_user_id")        
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Request must include the user_id " \
                                          + "in the query string parameters"
            
    def test_valid_event(self):
        response = self.get_response("valid")        
        assert response.get("statusCode", 0) == 200
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "Data recieved: user_id=test_event_id. " \
                                          + "NOTE: This data does not come from a database."
        assert body.get("avatar", "") == "duck"
        assert body.get("posts") == []