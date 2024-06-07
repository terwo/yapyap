from unittest.mock import patch, Mock

import pytest

from echo.layers.python.mongo_db import ErrorCode, react_to_post
from echo.tests.unit.test_mongodb_layer.utils import get_percy_jackson


class TestReactToPost:
    
    post_id = ""
    user_id = get_percy_jackson()["_id"]
    device_id = get_percy_jackson()["yap_yap_auth_tokens"][0]["device_id"]
    token = get_percy_jackson()["yap_yap_auth_tokens"][0]["token"]
    
    def test_invalid_reaction(self):
        assert react_to_post(
            self.post_id, 
            self.user_id, 
            self.device_id, 
            self.token, 
            "random_reaction"
        ) == ErrorCode.INVALID_REACTION
    
    def test_invalid_post_id(
        self,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
      
        self.post_id = "507f191e810c19729de860ea"
        mock_objectid.side_effect = [self.user_id, self.post_id]
        assert react_to_post(
            self.post_id, 
            self.user_id,
            self.device_id, 
            self.token, 
            "medal"
        ) == ErrorCode.FAILED_TO_GET_POST
        
    @pytest.mark.parametrize(
        "reaction", 
        ["high_five", "medal"]
    )
    def test_user_reacting_multiple_times(
        self,
        reaction,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        
        # a post that percy_jackson has already reacted to
        self.post_id = "65fd51cd0c20d1065e0bbcdb"
        
        side_effect = [self.user_id, self.post_id, self.user_id, self.user_id]
        mock_objectid.side_effect = side_effect
        assert react_to_post(
            self.post_id, 
            self.user_id, 
            self.device_id, 
            self.token, 
            reaction
        ) == ErrorCode.CANNOT_REACT
    
    def test_user_unreacting_multiple_times(
        self,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        
        # a post that percy_jackson has not reacted to
        self.post_id = "65fd51bf9b27cef811390514"
        
        mock_objectid.side_effect = [self.user_id, self.post_id, self.user_id]
        assert react_to_post(
            self.post_id, 
            self.user_id,
            self.device_id,
            self.token, 
            "star", 
            increment=False
        ) == ErrorCode.CANNOT_REACT
    
    def test_db_update_timeout(
        self,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        
        # a post that percy_jackson has not reacted to
        self.post_id = "65fd51bf9b27cef811390514"
        mock_objectid.side_effect = [self.user_id, self.post_id, self.user_id, self.user_id]

        with patch.object(mongodb.posts, "update_one") as mock_update_one:
            mock_update_result = Mock()
            mock_update_result.acknowledged = False
            mock_update_one.return_value = mock_update_result
                
            assert react_to_post(
                self.post_id, 
                self.user_id, 
                self.device_id, 
                self.token, 
                "star"
            ) == False
    
    def test_react_successful( 
        self,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        
        # a post that percy_jackson has not reacted to
        self.post_id = "65fd51bf9b27cef811390514"
        
        mock_objectid.side_effect = [self.user_id, self.post_id, self.user_id, self.user_id]
        assert react_to_post(
            self.post_id, 
            self.user_id, 
            self.device_id, 
            self.token, 
            "star"
        ) == True
    
        post = mongodb.posts.find_one({"_id": self.post_id})
        assert post["reactions"]["star"] == 1
        assert post["reacted_user_ids"][0] == {
            "user_id": self.user_id,
            "reaction": "star"
        }
    
    def test_unreact_successful( 
        self,
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        
        # a post that john_smith has already reacted to
        self.post_id = "65fd51cd0c20d1065e0bbcdb"
        
        mock_objectid.side_effect = [self.user_id, self.post_id, self.user_id, self.user_id, self.user_id]
        assert react_to_post(
            self.post_id, 
            self.user_id, 
            self.device_id, 
            self.token, 
            "high_five", 
            increment=False
        ) == True
    
        post = mongodb.posts.find_one({"_id": self.post_id})
        assert post["reactions"]["high_five"] == 0
        assert len(post["reacted_user_ids"]) == 1
    