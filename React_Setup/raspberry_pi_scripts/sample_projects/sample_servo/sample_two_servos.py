import RPi.GPIO as GPIO
import time

# Set GPIO numbering mode
GPIO.setmode(GPIO.BOARD)

# Set pins 11 and 12 as an output pins, and define the pins as PWM for both servos
GPIO.setup(11, GPIO.OUT)
servo1 = GPIO.PWM(11, 50) # Note: 11 => pin, 50 => 50Hz pulse

GPIO.setup(12, GPIO.OUT)
servo2 = GPIO.PWM(12, 50) # Note: 12 => pin, 50 => 50Hz pulse

# Start PWM running, but with value of 0 (pulse off)
servo1.start(0)
servo2.start(0)

print("Waiting for 2 seconds")
time.sleep(2)

# Let's move the servo!
print("Rotating 180 degrees in 10 steps")

# Define the duty variable
duty = 2

while duty <= 11:
    servo1.ChangeDutyCycle(duty)
    servo2.ChangeDutyCycle(duty)
    time.sleep(1)
    duty = duty + 1

time.sleep(2)
print("Reversing the direction and rotating 180 degrees in 10 steps")

while duty >= 3:
    servo1.ChangeDutyCycle(duty)
    servo2.ChangeDutyCycle(duty)
    time.sleep(1)
    duty = duty - 1

# Wait a couple of seconds

print("FINISHED")

# Clean things up at the end
servo1.stop()
servo2.stop()
GPIO.cleanup()
