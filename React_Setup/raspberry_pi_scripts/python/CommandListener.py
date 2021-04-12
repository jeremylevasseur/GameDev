import sys
import os
import requests
import json
from subprocess import call
from dotenv import load_dotenv
from pprint import pprint
from time import sleep

# Global Variables
baseURL = "https://www.nautilusdevelopment.ca/api/itad/v1/"

robotId = None
robotUsername = None
robotPassword = None

jwt = None


def getRobotJsonWebToken():
    # This function authenticates the robot and returns it's unique JSON Web Token.

    postData = {
        'username': robotUsername,
        'password': robotPassword
    }

    req = requests.post(baseURL + "authenticate", data=postData, verify=False)
    res = json.loads(req.text)

    return res['jwt']


def getAvailableCommandsForRobot(verbose=0):

    if robotId == None or jwt == None:

        print("Must obtain robot ID and it's unique JSON Web Token.")
        return 1

    else:

        req = requests.get(baseURL + "get_available_commands?robotId=" + robotId + "&jwt=" + jwt, verify=False)
        res = json.loads(req.text)

        if verbose == 1:
            pprint(res)

        return res


def changeCommandStatusToQueued(commandId):
    # This function makes an HTTP POST request to set the status of a specific command to "Queued".

    postData = {
        "commandId": commandId,
        "commandStatus": "Queued"
    }

    req = requests.post(baseURL + "update_command_status?jwt=" + jwt, data=postData, verify=False)
    res = json.loads(req.text)

    if res['status'] == "OK":
        return 0
    else:
        return 1


def listenForNewCommands():

    while True:

        # Get available commands
        commandData = getAvailableCommandsForRobot()

        listOfCommandIds = []

        for command in commandData:
            listOfCommandIds.append(int(command['command_id']))

            # Change command status to being in the queue
            changeCommandStatusToQueued(int(command['command_id']))

        listOfCommandIds.sort()
        
        for i in range(len(listOfCommandIds)):

            tempCommandId = listOfCommandIds[i]

            for command in commandData:

                if tempCommandId == command['command_id']:

                    # This is the command that needs to be executed
                    
                    commandNumber = command['command_details'].split(':')[1]

                    call("python3 /home/ubuntu/python/CommandExecutor.py " + str(tempCommandId) + " " + str(commandNumber), shell=True)

        sleep(3)


if __name__ == "__main__":
    load_dotenv()
    robotId = os.getenv('ROBOT_ID')
    robotUsername = os.getenv('ROBOT_USERNAME')
    robotPassword = os.getenv('ROBOT_PASSWORD')

    if jwt == None:
        jwt = getRobotJsonWebToken()

    listenForNewCommands()

