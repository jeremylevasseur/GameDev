import sys
import os
import requests
import json
from subprocess import call
from dotenv import load_dotenv

# Global Variables
baseURL = "https://www.nautilusdevelopment.ca/api/itad/v1/"

robotId = None
robotUsername = None
robotPassword = None

jwt = None

# Input Format: python CommandExecutor.py {commandId} {commandNumber}   
commandId = sys.argv[1]
commandNumber = sys.argv[2]


def runCommandScript(scriptToRun):
    if scriptToRun == "1":
        call("python3 /home/ubuntu/command_scripts/command_one.py", shell=True)
    elif scriptToRun == "2":
        call("python3 /home/ubuntu/command_scripts/command_two.py", shell=True)
    elif scriptToRun == "3":
        call("python3 /home/ubuntu/command_scripts/command_three.py", shell=True)
    elif scriptToRun == "4":
        call("python3 /home/ubuntu/command_scripts/command_four.py", shell=True)

    return


def getRobotJsonWebToken():
    # This function authenticates the robot and returns it's JSON web token.

    postData = {
        'username': robotUsername,
        'password': robotPassword
    }

    req = requests.post(baseURL + "authenticate", data=postData, verify=False)
    res = json.loads(req.text)

    return res['jwt']


def changeCommandStatusToInProgress(commandId):
    # This function makes an HTTP POST request to set the status of a specific command to "In Progress".

    postData = {
        "commandId": commandId,
        "commandStatus": "In Progress"
    }
    
    req = requests.post(baseURL + "update_command_status?jwt=" + jwt, data=postData, verify=False)
    res = json.loads(req.text)

    if res['status'] == "OK":
        return 0
    else:
        return 1


def changeCommandStatusToCompleted(commandId):
    # This function makes an HTTP POST request to set the status of a specific command to "Completed".

    postData = {
            "robotId": robotId,
            "commandId": commandId
    }

    req = requests.post(baseURL + "complete_command?jwt=" + jwt, data=postData, verify=False)
    res = json.loads(req.text)

    if res['status'] == "OK":
        return 0
    else:
        return 1


if __name__ == "__main__":
    load_dotenv()
    robotId = os.getenv('ROBOT_ID')
    robotUsername = os.getenv('ROBOT_USERNAME')
    robotPassword = os.getenv('ROBOT_PASSWORD')

    if jwt == None:
        jwt = getRobotJsonWebToken()

    # Setting the status of the requested command to "In Progress"
    changeCommandStatusToInProgress(int(commandId))

    # Executing the script
    runCommandScript(commandNumber)

    # Setting the status of the requested command to "Completed"
    changeCommandStatusToCompleted(int(commandId))

    exit()

    
