'''
iTAD COMMAND SCRIPT 1

AN LED ON PIN 3 WILL FLASH

'''


import RPi.GPIO as GPIO  # Importing the Raspberry Pi GPIO Library
from time import sleep  # Importing a library that allows for a pause

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)  # This allows us to use the physical pin numbering

ledPin1 = 3 
ledPin2 = 5
ledPin3 = 7
ledPin4 = 8

# Setting up the pin
GPIO.setup(ledPin1, GPIO.OUT, initial=GPIO.LOW)  # Setting pin 3 as an output pin and setting the initial value to being off
GPIO.setup(ledPin2, GPIO.OUT, initial=GPIO.LOW)  # Setting pin 5 as an output pin and setting the initial value to being off
GPIO.setup(ledPin3, GPIO.OUT, initial=GPIO.LOW)  # Setting pin 7 as an output pin and setting the initial value to being off
GPIO.setup(ledPin4, GPIO.OUT, initial=GPIO.LOW)  # Setting pin 8 as an output pin and setting the initial value to being off

counter = 0
while counter < 30:
    GPIO.output(ledPin1, GPIO.HIGH)  # Turning the LED on
    sleep(1)  # Sleeping for 1 second
    GPIO.output(ledPin1, GPIO.LOW)  # Turning the LED off
    sleep(1)  # Sleeping for 1 second
    counter += 1

GPIO.cleanup()
