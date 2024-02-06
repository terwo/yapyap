import json
import os
import subprocess


def invoke_function(
    function_name: str, 
    event_path: str,
    env_vars_path: str = "./tests/env.json"  
) -> dict | int:
    
    if not os.path.exists(env_vars_path):
        print("Missing local testing environment variables!")
        return -1
    
    if not os.path.exists(event_path):
        print("Missing event path!")
        return -2
    
    output = subprocess.run(
        ["sam", "local", "invoke", function_name, "--env-vars", env_vars_path, "-e", event_path],
        shell=True,
        capture_output=True
    )
    print(output.stdout)
    try:
        return json.loads(output.stdout.decode("utf-8"))
    except Exception as e:
        return -3
   