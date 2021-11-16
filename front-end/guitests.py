import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "linux":
        PATH = "./front-end/gui_tests/chromedriver_linux"
    elif platform == "darwin":
        PATH = "./front-end/gui_tests/chromedriver_mac"
    else:
        PATH = "./front-end/gui_tests/chromedriver.exe"

    # Run all of the gui tests
    os.system("python3 ./front-end/gui_tests/demographicsTests.py " + PATH)
    # os.system("python3 ./front-end/gui_tests/geographyTests.py " + PATH)
    # os.system("python3 ./front-end/gui_tests/foodandtourismTests.py " + PATH)
