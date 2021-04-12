import requests
from pprint import pprint
import json
import random
import time
from datetime import datetime
from subprocess import call
import socket
from requests.exceptions import ConnectionError

address = "https://www.nautilusdevelopment.ca/api/itad/v1/"

try:
    r = requests.get(address)
    print(r.text + " => " + str(datetime.now()))
except ConnectionError as e:
    print("No internet connection...")

exit()
