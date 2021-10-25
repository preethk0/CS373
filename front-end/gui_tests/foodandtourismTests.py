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
URL = "https://www.around-the-world.me/foodandtourism"
# URL = "https://www.texasvotes.me/districts/view/"

class TestFoodAndTourism(unittest.TestCase):

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

    def testSorting(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableCell-root MuiTableCell-head'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('MuiTableCell-root MuiTableCell-head')[2].click()
        time.sleep(2)

        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('MuiTableRow-root MuiTableRow-hover')[0].click()
        time.sleep(2)
        element = self.driver.find_elements_by_class_name('card-text')[3]
        assert element.text == 'Number of Tourists (per year): 2,500'

    def testCountryInfo(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('MuiTableRow-root MuiTableRow-hover')[3].click()
        time.sleep(2)
        element = self.driver.find_elements_by_class_name('card-text')[0]
        assert element.text == 'Main Dishes: Fufu, Egusi Soup'

    def testTitles(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'MuiTableRow-root MuiTableRow-hover'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('MuiTableRow-root MuiTableRow-hover')[0].click()
        time.sleep(2)
        element = self.driver.find_elements_by_tag_name('h3')[0]
        assert element.text == 'Food'
        element = self.driver.find_elements_by_tag_name('h3')[0]
        assert element.text == 'Tourism'

    def testSearch(self):
        self.driver.get(URL)

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
