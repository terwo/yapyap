from copy import deepcopy

# pre-defined data in the mock database

JOHN_SMITH = {
    "_id": "507f1f77bcf86cd799439011",
    "username": "JohnSmith12", 
    "password": "ABC",
    "avatar": "duck",
    "posts": ["65fd4fcae22f455e39f50e17"],
    "yap_yap_auth_tokens": []
}

DEREK1 = {
    "_id": "507f191e810c19729de860ea",
    "username": "derek1",
    "password": "xyz",
    "avatar": "pig",
    "posts": [
        "65fd51bf9b27cef811390514", 
        "65fd51cd0c20d1065e0bbcdb"
    ],
    "yap_yap_auth_tokens": [
        {
            "device_id": "af7c1fe6-d669-414e-b066-e9733f0de7a8",
            "token": "1711187590YAPsLJUV3UYCBLu2fEelsn4kmbxCJy-kzBVSFibNjTB4Yg"
        },
        {
            "device_id": "fd4a096f-93f5-4f2a-86c6-69a2d20365ff",
            "token": "1711190097YAP3td6WFjoEGQ4M4GCq6El4jUGF24Xf3PhMnjHQGNRRIg"
        }
    ]
}


HARRY_POTTER = {
    "_id": "65ffcfcd2db694b71dc5afcb",
    "username": "HarryPotter",
    "password": "ab12",
    "avatar": "bunny",
    "posts": [],
    "yap_yap_auth_tokens": []
}


PERCY_JACKSON = {
    "_id": "66634e25472d7181f3000df2",
    "username": "percy_jackson",
    "password": "SeaweedBrain",
    "avatar": "penguin",
    "posts": [],
    "yap_yap_auth_tokens": [
        {
            "device_id": "0723e7a1-ec12-4cdb-b4d5-6169dba540c6",
            "token": "1717784448YAP8a01db5603744166d74caa33e2c4e591"
        }
    ]
}


JOHN_SMITH_POST_1 = {
    "_id": "65fd4fcae22f455e39f50e17",
    "user_id": "507f1f77bcf86cd799439011",
    "last_saved_date": "2024-01-20T23:02:21.535000",
    "journal_entry": "This is my first sad journal entry",
    "sentimental_value": "sadness",
    "reactions": {
        "heart": 1,
        "high_five": 0,
        "star": 0,
        "battery": 0,
        "medal": 0
    },
    "reacted_user_ids": [
        {
            "user_id": "507f191e810c19729de860ea",
            "reaction": "heart" 
        }
    ]
}


DEREK1_POST_1 = {
    "_id": "65fd51bf9b27cef811390514",
    "user_id": "507f191e810c19729de860ea",
    "last_saved_date": "2024-01-18T23:02:21.535000",
    "journal_entry": "This is a fearful journal entry.", 
    "sentimental_value": "fear",
    "reactions": {
        "heart": 0,
        "high_five": 0,
        "star": 0,
        "battery": 0,
        "medal": 0
    },
    "reacted_user_ids": []    
}


DEREK1_POST_2 = {
    "_id": "65fd51cd0c20d1065e0bbcdb",
    "user_id": "507f191e810c19729de860ea",
    "last_saved_date": "2024-01-19T23:02:21.535000",
    "journal_entry": "This is a neutral journal entry",
    "sentimental_value": "neutral",
    "reactions": {
        "heart": 0,
        "high_five": 1,
        "star": 1,
        "battery": 0,
        "medal": 0
    },
    "reacted_user_ids": [
        {     
            "user_id": "507f1f77bcf86cd799439011",
            "reaction": "star"
        },
        {     
            "user_id": "66634e25472d7181f3000df2",
            "reaction": "high_five"
        }
    ]
}



def get_john_smith():
    return deepcopy(JOHN_SMITH)


def get_derek1():
    return deepcopy(DEREK1)


def get_harry_potter():
    return deepcopy(HARRY_POTTER)

def get_percy_jackson():
    return deepcopy(PERCY_JACKSON)

def get_john_smith_post_1():
    return deepcopy(JOHN_SMITH_POST_1)


def get_derek1_post_1():
    return deepcopy(DEREK1_POST_1)


def get_derek1_post_2():
    return deepcopy(DEREK1_POST_2)
