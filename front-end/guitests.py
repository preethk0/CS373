import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./front-end/gui_tests/chromedriver.exe"
    elif platform == "linux":
        PATH = "./front-end/gui_tests/chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)

    # Run all of the gui tests
    os.system("python3 ./front-end/gui_tests/demographicsTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/geographyTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/foodandtourismTests.py " + PATH)
