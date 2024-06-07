import pytest

from echo.layers.python.mongo_db import ErrorCode, login
from echo.tests.unit.test_mongodb_layer.utils import get_john_smith, get_derek1


class TestLogin:    

    @pytest.mark.parametrize(
        "username, password",
        [
            ("derek", "abcd"),
            (get_derek1()["username"], "password"),
            ("username", get_derek1()["password"])
        ],
        ids=[
            "wrong_username, wrong_password",
            "right_username, wrong_password",
            "wrong_username, right_password"
        ]
    )
    def test_invalid_username_or_password(
        self, 
        username, 
        password, 
        mongodb, 
        mock_read_client,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_users_collection.return_value = mongodb.users          
        assert login(username, password, "") == ErrorCode.FAILED_TO_GET_USER
    
    @pytest.mark.parametrize(
        "user_obj, device_id",
        [
            (get_john_smith(), "ddc7f420-47b1-4f7e-bc35-07765cbd811"),
            (get_derek1(), "ddc7f420-47b1-4f7e-bc35-07765cbd811"),
            (get_derek1(), get_derek1()["yap_yap_auth_tokens"][1]["device_id"])
        ],
        ids=[
            "empty_yap_yap_auth_tokens",
            "device_id_does_not_exist_in_yap_yap_auth_tokens",
            "device_id_exists_in_yap_yap_auth_tokens"
        ]
    )
    def test_success(
        self,
        user_obj,
        device_id,
        mongodb,
        mock_read_client,
        mock_read_users_collection,
        mock_generate_token
    ):
        mock_read_client.return_value = True
        mock_read_users_collection.return_value = mongodb.users
        
        username = user_obj["username"]
        password = user_obj["password"]
        user = login(username, password, device_id)    
    
        if device_id == "ddc7f420-47b1-4f7e-bc35-07765cbd811":
            user_obj["yap_yap_auth_tokens"].append({
                "device_id": device_id,
                "token": mock_generate_token.return_value
            })
        else:
            user_obj["yap_yap_auth_tokens"][1]["token"] = mock_generate_token.return_value
            
        assert user == user_obj
        