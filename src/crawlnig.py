import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import os

# 웹드라이버 설정
chrome_options = Options()
chrome_options.add_argument('--headless')  # 브라우저를 실제로 띄우지 않고 실행
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

# 페이지 url 형식에 맞게 바꾸어 주는 함수 만들기
def makePgNum(num):
    if num == 1:
        return num
    elif num == 0:
        return num + 1
    else:
        return num + 9 * (num - 1)

# 크롤링할 url 생성하는 함수 만들기(검색어, 크롤링 시작 페이지, 크롤링 종료 페이지)
def makeUrl(search, start_pg, end_pg):
    urls = []
    for i in range(start_pg, end_pg + 1):
        page = makePgNum(i)
        url = f"https://search.naver.com/search.naver?where=news&sm=tab_pge&query={search}&start={page}"
        urls.append(url)
    return urls

##########뉴스크롤링 시작###################

# 검색어 입력
search = input("검색할 키워드를 입력해주세요:")

# 검색 시작할 페이지 입력
start_page = int(input("\n크롤링할 시작 페이지를 입력해주세요. ex)1(숫자만입력):"))  # ex)1 =1페이지,2=2페이지...
print("\n크롤링할 시작 페이지: ", start_page, "페이지")
# 검색 종료할 페이지 입력
end_page = int(input("\n크롤링할 종료 페이지를 입력해주세요. ex)1(숫자만입력):"))  # ex)1 =1페이지,2=2페이지...
print("\n크롤링할 종료 페이지: ", end_page, "페이지")

# naver url 생성
search_urls = makeUrl(search, start_page, end_page)

chrome_driver_path = ChromeDriverManager().install()
service = Service(chrome_driver_path)

# 브라우저 열기
driver = webdriver.Chrome(service=service, options=chrome_options)
driver.implicitly_wait(30)

# selenium으로 검색 페이지 불러오기 #
naver_urls = []

for url in search_urls:
    driver.get(url)
    time.sleep(3)  # 대기시간 변경 가능

    # 네이버 기사 눌러서 제목 및 본문 가져오기
    a_tags = driver.find_elements(By.CSS_SELECTOR, 'a.info')

    for a_tag in a_tags:
        attempts = 3
        while attempts > 0:
            try:
                a_tag.click()
                driver.switch_to.window(driver.window_handles[1])
                time.sleep(3)  # 대기시간 변경 가능

                # 네이버 뉴스 url만 가져오기
                current_url = driver.current_url
                if "news.naver.com" in current_url:
                    naver_urls.append(current_url)

                # 현재 탭 닫기
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                break
            except Exception as e:
                print(f"Error during click or switch: {e}. Retrying...")
                attempts -= 1
                time.sleep(2)
        if attempts == 0:
            try:
                print(f"Failed to process a_tag: {a_tag.get_attribute('href')}")
            except Exception as e:
                print(f"Failed to get attribute from a_tag: {e}")

print(naver_urls)

titles = []
authors = []
dates = []
contents = []
comments = []
images = []  # 이미지를 저장할 리스트

def extract_news_data(naver_url):
    driver.get(naver_url)
    wait = WebDriverWait(driver, 10)  # 타임아웃 시간을 30초로 증가

    try:
        # 뉴스 제목 가져오기
        title = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h2#title_area span'))).text

        # 작성자 가져오기
        author = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.byline'))).text

        # 작성일 가져오기
        date = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.media_end_head_info_datestamp_time'))).text

        # 뉴스 본문 가져오기
        content = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'article#dic_area'))).text

        # 뉴스 이미지 가져오기
        image_url = "이미지 없음"
        selectors = ['img#img1', 'div#contents img', 'span.end_photo_org img']
        for selector in selectors:
            try:
                image_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, selector)))
                image_url = image_element.get_attribute('src')
                if image_url:
                    break
            except:
                continue

        return title, author, date, content, image_url

    except Exception as e:
        print(f"Error extracting data from {naver_url}: {e}")
        return None, None, None, None, None

for naver_url in naver_urls:
    title, author, date, content, image_url = extract_news_data(naver_url)

    if all([title, author, date, content, image_url]):
        titles.append(title)
        authors.append(author)
        dates.append(date)
        contents.append(content)
        images.append(image_url)

        print(f"URL: {naver_url}")
        print(f"Title: {title}")
        print(f"Image URL: {image_url}")
    else:
        print(f"Skipping URL due to missing data: {naver_url}")

    time.sleep(2)  # 대기시간 변경 가능

    # 댓글 모두 보기 버튼 클릭 (필요 시)
    try:
        more_comments_button = driver.find_element(By.CSS_SELECTOR, 'a.u_cbox_btn_more')
        while more_comments_button.is_displayed():
            more_comments_button.click()
            time.sleep(1)
    except:
        pass

    # 댓글 가져오기
    comment_elements = driver.find_elements(By.CSS_SELECTOR, 'span.u_cbox_contents')
    article_comments = [comment.get_attribute('innerText') for comment in comment_elements]
    comments.append(article_comments if article_comments else [])

print(titles)
print(authors)
print(dates)
print(contents)
print(comments)
print(images)  # 이미지를 출력합니다.

# 데이터프레임으로 정리(titles, authors, dates, contents, images)
min_length = min(len(titles), len(authors), len(dates), len(contents), len(images), len(comments))
data = {
    'title': titles[:min_length],
    'author': authors[:min_length],
    'date': dates[:min_length],
    'link': naver_urls[:min_length],
    'content': contents[:min_length],
    'comments': comments[:min_length],
    'image_url': images[:min_length]
}

news_df = pd.DataFrame(data)

# data 폴더에 저장하도록 경로 설정
output_dir = 'newt/src/data'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, f'NaverNews_{search}.csv')
news_df.to_csv(output_path, index=False, encoding='utf-8-sig')

print(f"CSV 파일이 저장되었습니다: {output_path}")

# 브라우저 닫기
driver.quit()
