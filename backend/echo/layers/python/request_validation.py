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