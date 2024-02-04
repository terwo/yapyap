import json

from .utils import invoke_function


class TestCreatePost:
    """
    Unit tests for the Create Post lambda function.
    """    
    
    def test_empty_body_event(self):
        response = invoke_function(
            "CreatePostFunction",
            "./tests/events/create_post_events/empty_body_event.json"     
        )        
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
        response = invoke_function(
            "CreatePostFunction",
            "./tests/events/create_post_events/missing_user_id_event.json"     
        )        
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A user_id must be included " \
                                          + "in the request body"
            
    def test_missing_journal_entry_event(self):
        response = invoke_function(
            "CreatePostFunction",
            "./tests/events/create_post_events/missing_journal_entry_event.json"     
        )        
        assert response.get("statusCode", 0) == 400
        try:
            body = json.loads(response.get("body"))
        except Exception as e:
            print(e)
            assert False

        assert body.get("message", "") == "A journal_entry must be included " \
                                          + "in the request body"

    def test_valid_event(self):
        response = invoke_function(
            "CreatePostFunction",
            "./tests/events/create_post_events/valid_event.json"     
        )
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
