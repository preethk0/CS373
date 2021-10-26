import unittest
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import sys

PATH = "chromedriver.exe"
# PATH = "./front-end/gui_tests/chromedriver.exe"
URL = "https://www.around-the-world.me/demographics"

class TestDemographics(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        cls.driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
        cls.driver.get(URL)
        cls.driver.implicitly_wait(40)
        cls.actions = ActionChains(cls.driver)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testCountryTitle(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card-hoverable'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'ant-card-hoverable')[0].click()
        time.sleep(2)
        element = self.driver.find_element(By.CLASS_NAME, 'countryName')
        assert element.text == 'Paraguay 🇵🇾'

    def testCountryLearnMore(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card-hoverable'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'ant-card-hoverable')[2].click()
        time.sleep(2)

        element = self.driver.find_elements(By.TAG_NAME, 'a')[6]
        self.driver.execute_script("arguments[0].click();", element)
        time.sleep(2)
        currentURL = self.driver.current_url
        assert currentURL == "https://www.around-the-world.me/foodandtourism/DK"

    def testCountryInfo(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card-hoverable'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'ant-card-hoverable')[1].click()
        time.sleep(2)
        element = self.driver.find_elements(By.CLASS_NAME, 'card-text')[0]
        assert element.text == 'Capital: Majuro'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
