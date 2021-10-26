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
URL = "https://www.around-the-world.me/geography"

class TestGeography(unittest.TestCase):

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

    def testSorting(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableCell-root MuiTableCell-head'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'MuiTableCell-root MuiTableCell-head')[1].click()
        time.sleep(2)

        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover')[0].click()
        time.sleep(2)
        element = self.driver.find_element(By.TAG_NAME, 'h1')
        assert element.text == 'Tonga'

    def testAdjacentCountries(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover')[4].click()
        time.sleep(2)
        self.driver.find_elements(By.TAG_NAME, 'a')[0].click()
        currentURL = self.driver.current_url
        assert currentURL == "https://www.around-the-world.me/foodandtourism/GT"
        self.driver.back()

        self.driver.find_elements(By.TAG_NAME, 'a')[1].click()
        currentURL = self.driver.current_url
        assert currentURL == "https://www.around-the-world.me/foodandtourism/HN"
        self.driver.back()

    def testGeographicInfo(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements(By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover')[2].click()
        time.sleep(2)
        element = self.driver.find_element(By.CLASS_NAME, 'location')
        assert element.text == 'Latitude: 11.5 Longitude: 43 Continent: Africa Region: Middle East & North Africa'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
