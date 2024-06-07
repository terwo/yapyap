from unittest.mock import patch, Mock

from echo.layers.python.mongo_db import ErrorCode, create_user


class TestCreateUser: 

    def test_username_exists(
        self, 
        mongodb, 
        mock_read_client, 
        mock_read_users_collection
    ):            
        mock_read_client.return_value = True
        mock_read_users_collection.return_value = mongodb.users   
        assert create_user("derek1", "abc") == ErrorCode.USER_ALREADY_EXISTS
   
    def test_db_timeout(
        self,
        mongodb,
        mock_read_client,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_users_collection.return_value = mongodb.users
        with patch.object(mongodb.users, "insert_one") as mock_insert_one:
            mock_insert_result = Mock()
            mock_insert_result.acknowledged = False
            mock_insert_one.return_value = mock_insert_result
            assert create_user("derek", "abc") == False
    
    def test_success(
        self, 
        mongodb, 
        mock_read_client, 
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        with patch("random.randint") as mock_randomint:
            mock_randomint.return_value = 0
            mock_read_users_collection.return_value = mongodb.users   

            new_user = mongodb.users.find_one({"username": "derek"})
            assert new_user == None

            assert create_user("derek", "abc") == True
                        
            new_user = mongodb.users.find_one({"username": "derek"})
            del new_user["_id"]
            assert new_user == \
                {
                    "username": "derek",
                    "password": "abc",
                    "avatar": "penguin",
                    "posts": [],
                    "yap_yap_auth_tokens": []
                }
    