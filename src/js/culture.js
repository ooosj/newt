function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 무작위로 index 값 생성 (0 이상 i 미만)
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("DOMContentLoaded", function () {
  
  const container = document.getElementById("container");
  let currentIndex = 0; // 현재 뉴스 인덱스

  // CSV 파일 경로 설정
  const csvFilePath = "../data/NaverNews_문화.csv";

  // CSV 파일 읽기
  fetch(csvFilePath)
    .then((response) => response.text())
    .then((data) => {
      const parsedData = Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
      }).data;

      console.log(parsedData);

      shuffle(parsedData);

      // 초기 뉴스 생성
      createNewsPlaceholders(6, parsedData);

      // 스크롤 이벤트 감지하여 추가 뉴스 생성
      window.addEventListener("scroll", function () {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 10
        ) {
          createNewsPlaceholders(3, parsedData); // 추가로 생성할 뉴스의 개수
        }
      });
    })
    .catch((error) => console.error("Error fetching the CSV file:", error));

  // placeholder를 동적으로 생성하는 함수
  function createNewsPlaceholders(count, newsItems) {
    for (let i = 0; i < count; i++) {
      if (currentIndex >= newsItems.length) break; // 배열 범위 초과 방지

      const newsIndex = currentIndex; // 클로저로 현재 인덱스를 캡처
      const newsWrapper = document.createElement("div");
      newsWrapper.classList.add("news-wrapper");

      const titleElement = document.createElement("div");
      titleElement.classList.add("news-title");
      // 이 부분에서 제목을 출력합니다.
      titleElement.textContent =
        newsItems[newsIndex].title || `${newsIndex + 1}번째 뉴스`; // 뉴스 번호

      const placeholder = document.createElement("div");
      placeholder.classList.add("placeholder");

      const imgElement = new Image();
      imgElement.classList.add("thumbnail");
      imgElement.onload = function () {
        // 이미지가 로드되면 실행되는 함수
        placeholder.style.width = imgElement.width + "px";
        placeholder.style.height = imgElement.height + "px";
      };

      // 이미지 URL 로그 출력
      console.log("Loading image:", newsItems[newsIndex].image_url);
      imgElement.src = newsItems[newsIndex].image_url || ""; // CSV에서 가져온 이미지 URL

      placeholder.appendChild(imgElement); // 썸네일 이미지를 placeholder에 추가
      newsWrapper.appendChild(placeholder);
      newsWrapper.appendChild(titleElement);

      // 클릭 이벤트 추가
      newsWrapper.addEventListener("click", function () {
        window.location.href = `detail.html?news=${newsIndex + 1}`;
      });

      container.appendChild(newsWrapper);

      currentIndex++;
    }
  }
});
