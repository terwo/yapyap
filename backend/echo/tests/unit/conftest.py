from unittest.mock import patch

import pytest
from pymongo import MongoClient
from pymongo.errors import OperationFailure


MONGODB_LAYER = "echo.layers.python.mongo_db"


class MockMongoClient(MongoClient):
    def __init__(self, *args, **kwargs):
        pass

    def start_session(self, **kwargs):
        return MockMongoSession()


class MockClientSession:

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return self
    
    
class MockMongoSession:
    def __init__(self):
        self.transaction_in_progress = False

    def start_transaction(self):
        self.transaction_in_progress = True
        return MockClientSession()

    def commit_transaction(self):
        if not self.transaction_in_progress:
            raise OperationFailure("No transaction in progress")
        self.transaction_in_progress = False

    def abort_transaction(self):
        if not self.transaction_in_progress:
            raise OperationFailure("No transaction in progress")
        self.transaction_in_progress = False
            
    def __enter__(self):
        self.start_transaction()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            self.commit_transaction()
        else:
            self.abort_transaction()
            

@pytest.fixture
def mock_mongo_client():
    with patch(f"{MONGODB_LAYER}.pymongo.MongoClient") as mocked:
        yield MockMongoClient()


@pytest.fixture
def mock_objectid():
    with patch(f"{MONGODB_LAYER}.ObjectId") as mocked:
        yield mocked


@pytest.fixture
def mock_generate_token():
    with patch(f"{MONGODB_LAYER}._generate_token") as mocked:
        mocked.return_value = "1711192160YAPd2c3ca6200c240516fc2cfef40ceaafd"
        yield mocked
    

@pytest.fixture
def mock_read_client(mock_mongo_client):
    with patch(f"{MONGODB_LAYER}._read_client") as mocked:
        # mocked.return_value = mock_mongo_client
        mocked.return_value = True
        yield mocked
        
        
@pytest.fixture
def mock_read_users_collection():
    with patch(f"{MONGODB_LAYER}._read_users_collection") as mocked:
        yield mocked


@pytest.fixture
def mock_read_posts_collection():
    with patch(f"{MONGODB_LAYER}._read_posts_collection") as mocked:
        yield mocked
