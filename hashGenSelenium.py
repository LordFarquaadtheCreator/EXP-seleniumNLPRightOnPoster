from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# link = input('link: ')

def remove_spaces(string):
    return ''.join(string.split())

topic = input('topic: ')
driver = webdriver.Chrome()

driver.get(f'http://best-hashtags.com/hashtag/{remove_spaces(topic)}/')
copy = driver.find_element(By.CLASS_NAME , 'btn-u').click()
