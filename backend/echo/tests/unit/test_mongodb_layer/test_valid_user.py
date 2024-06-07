import pytest

from echo.layers.python.mongo_db import _valid_user
from echo.tests.unit.test_mongodb_layer.utils import DEREK1


class TestValidUser:

    @pytest.mark.parametrize(
        "user_id, device_id, token, expected_result",
        [
            (
                "65fd56af0cf5da8ce24eb59f",
                DEREK1["yap_yap_auth_tokens"][0]["device_id"],
                DEREK1["yap_yap_auth_tokens"][0]["token"],
                None           
            ),
            (
                DEREK1["_id"],
                DEREK1["yap_yap_auth_tokens"][0]["device_id"],
                DEREK1["yap_yap_auth_tokens"][1]["token"],
                None    
            ),
            (
                DEREK1["_id"],
                DEREK1["yap_yap_auth_tokens"][0]["device_id"],
                DEREK1["yap_yap_auth_tokens"][0]["token"],
                DEREK1
            )
        ],
        ids=[
            "invalid_user_id",
            "token_does_not_match_device_id",
            "success"
        ]
    )
    def test_valid_user(
        self, 
        user_id, 
        device_id,
        token, 
        expected_result,   
        mock_objectid, 
        mongodb, 
        mock_read_client, 
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_users_collection.return_value = mongodb.users   
        mock_objectid.return_value = user_id        
        assert _valid_user(None, user_id, device_id, token) == expected_result