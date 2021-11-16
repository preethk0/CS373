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
        cls.driver = webdriver.Chrome(PATH, options=chrome_options)
        cls.driver.get(URL)
        cls.actions = ActionChains(cls.driver)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testCountryCard(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card ant-card-bordered ant-card-hoverable countryCardStyle'))
            )
        except Exception as ex:
            print(ex)
            return

        grid = self.driver.find_element(By.CLASS_NAME, 'cardGrid')
        element = grid.find_elements(By.CLASS_NAME, 'ant-card-body')[1]
        time.sleep(2)
        country_name = element.text.split("\n")[0]
        assert country_name == 'Marshall Islands'

    def testCountryFilter(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'select__control css-1s2u09g-control'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'select__control css-1s2u09g-control')[1].click()
        time.sleep(2)
        self.actions.send_keys(Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.RETURN).perform()
        time.sleep(2)

        grid = self.driver.find_element(By.CLASS_NAME, 'cardGrid')
        element = grid.find_elements(By.CLASS_NAME, 'ant-card-body')[0]
        time.sleep(2)
        country_name = element.text.split("\n")[0]
        assert country_name == 'China'

    def testCountrySort(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'select__value-container css-1d8n9bt'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_element(By.CLASS_NAME, 'select__value-container css-1d8n9bt').click()
        time.sleep(2)
        self.actions.send_keys(Keys.DOWN, Keys.DOWN, Keys.DOWN, Keys.RETURN).perform()
        time.sleep(2)

        grid = self.driver.find_element(By.CLASS_NAME, 'cardGrid')
        element = grid.find_elements(By.CLASS_NAME, 'ant-card-body')[0]
        time.sleep(2)
        country_name = element.text.split("\n")[0]
        assert country_name == 'Nauru'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
