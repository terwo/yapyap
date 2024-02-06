import json

def extract_body_from_request(event) -> dict | None:
    """
    Extract the body from an HTTP POST request.

    Args:
        event: Request event.
        
    Returns:
        dict | None: A dictionary of body parameters. If error, return None.
    """
    if "body" in event:
        event = event["body"]
        
    try:
        return json.loads(event)
    except Exception as e:
        return None
    

def extract_value_from_body(body: dict, key: str) -> tuple[bool, dict]:
    """
    Get the values of a specify key from a HTTP POST request.

    Args:
        body (dict): Body from HTTP POST request.
        key (str): Key to access the desired values.

    Returns:
        tuple[bool, dict]: True and the data if key is successfully used.
                           Otherwise, False and a 400 HTTP response
    """
    if (data := body.get(key)) is None:
        return False, {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "message": f"A {key} must be included in " 
                                + "the request body."
                }
            )
        }
    else:
        return True, data