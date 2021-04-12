import RPi.GPIO as GPIO
import time

# Set GPIO numbering mode
GPIO.setmode(GPIO.BOARD)

# Set pin 11 as an output pin, and set servo1 as pin 11 with PWM
GPIO.setup(11, GPIO.OUT)
servo1 = GPIO.PWM(11, 50) # Note: 11 => pin, 50 => 50Hz pulze

# Start PWM running, but with value of 0 (pulse off)
servo1.start(0)
print("Waiting for 2 seconds")
time.sleep(2)

# Let's move the servo!
print("Rotating 180 degrees in 10 steps")

# Define the duty variable
duty = 2

while duty <= 11:
    servo1.ChangeDutyCycle(duty)
    time.sleep(0.3)
    servo1.ChangeDutyCycle(0)
    time.sleep(0.7)
    duty = duty + 1

time.sleep(2)
print("Reversing the direction and rotating 180 degrees in 10 steps")

while duty >= 3:
    servo1.ChangeDutyCycle(duty)
    time.sleep(0.3)
    servo1.ChangeDutyCycle(0)
    time.sleep(0.7)
    duty = duty - 1

# Wait a couple of seconds

print("FINISHED")

# Clean things up at the end
servo1.stop()
GPIO.cleanup()
