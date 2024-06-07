from datetime import datetime
from unittest.mock import patch

import pytest

from echo.layers.python.mongo_db import posted_today
from echo.tests.unit.test_mongodb_layer.utils import get_derek1


class TestPostedToday:
    
    @pytest.mark.parametrize(
        "date, expected_result",
        [
            
            (
                datetime.fromisoformat("2024-01-20T23:03:21"),
                False
            ),      
            (
                datetime.fromisoformat("2024-01-20T12:03:21"),
                True
            )      
        ],
        ids=[
            "did_not_post_in_the_last_24_hours",
            "posted_in_the_last_24_hours"
        ]
    )
    def test_posted_today(
        self, 
        date,
        expected_result,
        mongodb, 
        mock_objectid,
        mock_read_client,
        mock_read_posts_collection,
        mock_read_users_collection
    ):    
        user_id = get_derek1()["_id"]
        device_id = get_derek1()["yap_yap_auth_tokens"][0]["device_id"]
        token = get_derek1()["yap_yap_auth_tokens"][0]["token"]
    
        with patch("echo.layers.python.mongo_db.datetime") as mocked_datetime: 
            mock_read_client.return_value = True
            mocked_datetime.now.return_value = date 
            mock_objectid.return_value = user_id
            mock_read_posts_collection.return_value = mongodb.posts
            mock_read_users_collection.return_value = mongodb.users
            assert posted_today(user_id, device_id, token) == expected_result
    