from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

# link = input('link: ')
driver = webdriver.Chrome(chrome_options=chrome_options)


driver.get('https://embedsocial.com/admin/feedlink/editor/14f64cc45c1b51d6c0141acc54dd38faf29bee2a')

#log in screen

login = driver.find_element(By.XPATH, '//*[@id="username"]').send_keys('cinnamonchipspub@aol.com')
password = driver.find_element(By.XPATH, '//*[@id="password"]').send_keys('Rochdale1!')
loginButton = driver.find_element(By.XPATH, '//*[@id="_submit"]').click()

post = driver.find_element(By.CLASS_NAME, 'load-more-button push-20-t')
ActionChains(driver)\
    .scroll_to_element(post)\
    .perform()
post.click()