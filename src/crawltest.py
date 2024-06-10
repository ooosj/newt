import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ChromeDriver 경로 설정
chrome_driver_path = "C:\\Users\\MSI\\Desktop\\chromedriver-win64\\chromedriver.exe"  # 실제 ChromeDriver 경로로 수정

# Chrome 옵션 설정
chrome_options = Options()
chrome_options.add_argument('--headless')  # 브라우저를 실제로 띄우지 않고 실행
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

# ChromeDriver 서비스 설정
service = Service(chrome_driver_path)

# 브라우저 열기
driver = webdriver.Chrome(service=service, options=chrome_options)

# 네이버 뉴스 기사 페이지 열기
url = 'https://n.news.naver.com/mnews/article/009/0005315109'
driver.get(url)

# 페이지 로드 대기
wait = WebDriverWait(driver, 10)

# 제목 크롤링
title = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h2#title_area span'))).text

# 작성자 크롤링
author = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.byline'))).text

# 작성일 크롤링
date = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.media_end_head_info_datestamp_time'))).text

# 본문 내용 크롤링
content = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'article#dic_area'))).text

# 이미지 URL 크롤링
image_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#img1')))
image_url = image_element.get_attribute('src')

# 크롤링한 내용 출력
print(f"Title: {title}")
print(f"Author: {author}")
print(f"Date: {date}")
print(f"Content: {content}")
print(f"Image URL: {image_url}")

# 크롤링한 데이터를 파일에 저장
data = {
    "title": title,
    "author": author,
    "date": date,
    "content": content,
    "image_url": image_url
}

with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

# 브라우저 닫기
driver.quit()