import pytest

from echo.layers.python.mongo_db import read_user_posts
from echo.tests.unit.test_mongodb_layer.utils import (
    get_derek1,
    get_percy_jackson,
    get_derek1_post_1,
    get_derek1_post_2
)


class TestReadUserPosts:
    
    @pytest.mark.parametrize(
        "user, expected_result",
        [
            (
                get_percy_jackson(),
                []
            ),
            (
                get_derek1(),
                [get_derek1_post_2(), get_derek1_post_1()]
            )
        ],
        ids=[
            "no_posts",
            "multiple_posts"
        ]
    )
    def test_read_user_posts(
        self,
        user,
        expected_result,   
        mongodb,
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):
        user_id = user["_id"]
        device_id = user["yap_yap_auth_tokens"][0]["device_id"]
        token = user["yap_yap_auth_tokens"][0]["token"]
        mock_objectid.return_value = user_id
        mock_read_client.return_value = True
        mock_read_posts_collection.return_value = mongodb.posts
        mock_read_users_collection.return_value = mongodb.users
        assert read_user_posts(user_id, device_id, token) == expected_result
        