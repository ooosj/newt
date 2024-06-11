const position = {
  main: {
    left: "465px",
    top: "180px",
  },
  right: {
    left: "1581px",
    top: "470px",
  },
  left: {
    left: "-418px",
    top: "470px",
  },
  tempLeft: {
    left: "-1000px",
    top: "470px",
  },
  tempRight: {
    left: "2000px",
    top: "470px",
  },
};
let article = [];

let active = false;
let active_com = false;
let num = 0;
let pivot = 1;
let left_temp = [];
let right_temp = [];
let newsValue;

function discreteGaussian(p, sigmaX, sigmaY, size) {
  const gaussian = Array.from({ length: size }, () => Array(size).fill(0));
  let sum = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const exponent = -(
        Math.pow(i - p, 2) / (2 * Math.pow(sigmaX, 2)) +
        Math.pow(j - p, 2) / (2 * Math.pow(sigmaY, 2))
      );
      gaussian[i][j] = Math.exp(exponent);
      sum += gaussian[i][j];
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      gaussian[i][j] /= sum;
    }
  }

  return gaussian;
}

function randomCat(p) {
  const sigma = 0.1; // Standard deviation
  const size = 7; // 1 to 7

  const gaussian = discreteGaussian(p - 1, sigma, sigma, size);

  const flatGaussian = gaussian.flat();

  const cumulativeDistribution = [];
  flatGaussian.reduce((acc, value, index) => {
    cumulativeDistribution[index] = acc + value;
    return cumulativeDistribution[index];
  }, 0);

  const randomValue = Math.random();
  for (let i = 0; i < cumulativeDistribution.length; i++) {
    if (randomValue <= cumulativeDistribution[i]) {
      return Math.floor(i / size) + 1;
    }
  }

  return 1;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const csvFilePath = [
  "",
  "../data/NaverNews_정치.csv",
  "../data/NaverNews_경제.csv",
  "../data/NaverNews_국제.csv",
  "../data/NaverNews_사회.csv",
  "../data/NaverNews_문화.csv",
  "../data/NaverNews_연예.csv",
  "../data/NaverNews_스포츠.csv",
];

function dataIn(valueN) {
  if (isNaN(valueN)) return null;
  if (!!valueN && !!article[Math.floor(valueN / 1000)][valueN % 1000]) {
    return article[Math.floor(valueN / 1000)][valueN % 1000].title;
  }
  return null;
}
function picIn(valueN) {
  if (isNaN(valueN)) return null;
  if (!!valueN && !!article[Math.floor(valueN / 1000)][valueN % 1000]) {
    return article[Math.floor(valueN / 1000)][valueN % 1000].image_url;
  }
  return null;
}

function setStyle(ns) {
  const newTitle = document.createElement("div");
  switch (ns % 5) {
    case 0:
      newTitle.classList.add("style1");
      break;
    case 1:
      newTitle.classList.add("style2");
      break;
    case 2:
      newTitle.classList.add("style3");
      break;
    case 3:
      newTitle.classList.add("style4");
      break;
    case 4:
      newTitle.classList.add("style5");
      break;
    default:
      break;
  }
  return newTitle;
}
function picStyle(ns) {
  switch (ns % 5) {
    case 0:
      return "style1";
    case 1:
      return "style2";
    case 2:
      return "style3";
    case 3:
      return "style4";
    case 4:
      return "style5";
    default:
      return "style1";
  }
}

function feect(frameN) {
  if (frameN > 7) return;
  if (!!article[frameN] == false)
    fetch(csvFilePath[frameN])
      .then((response) => response.text())
      .then((data) => {
        const parsedData = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        }).data;
        article[frameN] = parsedData;
        console.log("Load ", frameN);
        console.log(article[frameN]);
        feect(frameN + 1);
      });
  else {
    feect(frameN + 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let cardMain = document.querySelector(".card_main");
  let cardLeft = document.querySelector(".card_left");
  let cardRight = document.querySelector(".card_right");
  let cardTempRight = document.querySelector(".card_temp_right");
  let cardTempLeft = document.querySelector(".card_temp_left");

  let commentButton = document.querySelector(".comment_button");
  let likeButton = document.querySelector(".like_button");

  // 초기 카드에 값 설정
  cardTempLeft.classList.add("hide");
  cardLeft.classList.add("hide");

  // CSV 파일 경로 설정

  // 현재 URL에서 쿼리 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);

  // 'news' 파라미터 값 가져오기
  newsValue = urlParams.get("news");

  // 가져온 값을 콘솔에 출력 (또는 원하는 곳에 표시)
  console.log("news 파라미터 값:", newsValue);

  fetch(csvFilePath[Math.floor(newsValue / 1000)])
    .then((response) => response.text())
    .then((data) => {
      const parsedData = Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
      }).data;

      //console.log(parsedData);

      // JSON 데이터를 변수에 저장
      article[Math.floor(newsValue / 1000)] = parsedData;

      console.log(article[Math.floor(newsValue / 1000)]);
      let temp = setStyle(newsValue);
      temp.classList.add("title");
      temp.innerText = dataIn(newsValue);
      let imgElement = new Image();
      imgElement.src = picIn(newsValue) || "";
      imgElement.classList.add(picStyle(newsValue));
      imgElement.classList.add("pic");
      cardMain.appendChild(imgElement);
      cardMain.setAttribute("data-value", newsValue);
      cardMain.appendChild(temp);

      let t = randomCat(Math.floor(newsValue / 1000));
      t = t * 1000 + rand(1, article[t].length);
      temp = setStyle(t);
      temp.classList.add("title");
      temp.innerText = dataIn(t);
      imgElement = new Image();
      imgElement.classList.add(picStyle(t));
      imgElement.classList.add("pic");
      imgElement.src = picIn(t) || "";
      cardRight.appendChild(imgElement);
      cardRight.setAttribute("data-value", t);
      cardRight.appendChild(temp);

      t = randomCat(Math.floor(newsValue / 1000));
      t = t * 1000 + rand(1, article[t].length);
      temp = setStyle(t);
      temp.classList.add("title");
      imgElement = new Image();
      imgElement.classList.add(picStyle(t));
      imgElement.classList.add("pic");
      imgElement.src = picIn(t);
      cardTempRight.appendChild(imgElement);
      temp.innerText = dataIn(t);
      cardTempRight.setAttribute("data-value", t);
      cardTempRight.appendChild(temp);

      feect(1);
    })
    .catch((error) => console.error("Error fetching the CSV file:", error));

  const shiftCards = () => {
    commentButton.classList.add("hide");
    likeButton.classList.add("hide");
    // Move cards to their new positions
    cardLeft.classList.replace("card_left", "card_temp_left");
    cardMain.classList.replace("card_main", "card_left");
    cardRight.classList.replace("card_right", "card_main");
    cardTempRight.classList.replace("card_temp_right", "card_right");

    cardLeft.style.left = position["tempLeft"].left;
    cardLeft.style.top = position["tempLeft"].top;

    cardMain.style.left = position["left"].left;
    cardMain.style.top = position["left"].top;

    cardRight.style.left = position["main"].left;
    cardRight.style.top = position["main"].top;

    cardTempRight.style.left = position["right"].left;
    cardTempRight.style.top = position["right"].top;

    // Create new card element for the new right card
    const newCardRight = document.createElement("div");
    newCardRight.classList.add("card_temp_right");
    newCardRight.style.left = position["tempRight"].left;
    newCardRight.style.top = position["tempRight"].top;

    let aValue = update();
    let newTitle = setStyle(aValue);
    newTitle.classList.add("title");
    newTitle.innerText = dataIn(aValue);
    newCardRight.setAttribute("data-value", aValue);
    newCardRight.appendChild(newTitle);
    let imgElement = new Image();
    imgElement.src = picIn(aValue) || "";
    imgElement.classList.add(picStyle(aValue));
    imgElement.classList.add("pic");
    newCardRight.appendChild(imgElement);

    document.body
      .getElementsByClassName("e2479_2")[0]
      .appendChild(newCardRight);

    // Update references for the next shift
    cardLeft.addEventListener(
      "transitionend",
      () => {
        active = false;
        left_temp.push(cardTempLeft.getAttribute("data-value"));
        cardTempLeft.remove();
        cardTempLeft = cardLeft;
        cardLeft = cardMain;
        cardMain = cardRight;
        cardRight = cardTempRight;
        cardTempRight = newCardRight;

        commentButton.classList.remove("hide");
        likeButton.classList.remove("hide");
      },
      { once: true }
    );
    function update() {
      if (right_temp.length === 0) {
        // 비어있음
        let t = randomCat(Math.floor(newsValue / 1000));
        t = t * 1000 + rand(1, article[t].length);
        return t;
      }
      let t = right_temp.pop();
      console.log("pop ", t);
      return t;
    }
  };

  const backCards = () => {
    commentButton.classList.add("hide");
    likeButton.classList.add("hide");
    // Move cards to their new positions
    cardTempLeft.classList.replace("card_temp_left", "card_left");
    cardLeft.classList.replace("card_left", "card_main");
    cardMain.classList.replace("card_main", "card_right");
    cardRight.classList.replace("card_right", "card_temp_right");

    cardLeft.style.left = position["main"].left;
    cardLeft.style.top = position["main"].top;

    cardMain.style.left = position["right"].left;
    cardMain.style.top = position["right"].top;

    cardRight.style.left = position["tempRight"].left;
    cardRight.style.top = position["tempRight"].top;

    cardTempLeft.style.left = position["left"].left;
    cardTempLeft.style.top = position["left"].top;

    // Create new card element for the new right card
    const newCardLeft = document.createElement("div");
    newCardLeft.classList.add("card_temp_left");
    newCardLeft.style.left = position["tempLeft"].left;
    newCardLeft.style.top = position["tempLeft"].top;

    let aValue = update();
    let newTitle = setStyle(aValue);
    newTitle.classList.add("title");
    newTitle.innerText = dataIn(aValue);
    newCardLeft.setAttribute("data-value", aValue);
    newCardLeft.appendChild(newTitle);
    let imgElement = new Image();
    imgElement.src = picIn(aValue) || "";
    imgElement.classList.add(picStyle(aValue));
    imgElement.classList.add("pic");
    newCardLeft.appendChild(imgElement);

    if (newCardLeft.innerText === "") {
      newCardLeft.classList.add("hide");
    }

    document.body.getElementsByClassName("e2479_2")[0].appendChild(newCardLeft);

    // Update references for the next shift
    cardLeft.addEventListener(
      "transitionend",
      () => {
        active = false;
        // 삭제 전 저장
        right_temp.push(cardTempRight.getAttribute("data-value"));
        cardTempRight.remove();
        cardTempRight = cardRight;
        cardRight = cardMain;
        cardMain = cardLeft;
        cardLeft = cardTempLeft;
        cardTempLeft = newCardLeft;

        commentButton.classList.remove("hide");
        likeButton.classList.remove("hide");
      },
      { once: true }
    );
    function update() {
      if (left_temp.length === 0) {
        // 비어있음
        console.log("err");
        return 0;
      }
      let t = left_temp.pop();
      return t;
    }
  };

  document.addEventListener("keydown", (event) => {
    if (active_com) return;
    if (event.key === "ArrowRight" && !active) {
      active = true;
      pivot = pivot + 1;
      shiftCards();
    } else if (event.key === "ArrowLeft" && !active && left_temp.length !== 0) {
      pivot = pivot - 1;
      active = true;
      backCards();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let commentButton = document.querySelector(".comment_button");
  let cardMain = document.querySelector(".card_main");
  let cardMainCircle = document.querySelector(".card_main_circle");
  let commentSection = document.querySelector(".comment_section");
  let commentList = document.querySelector(".comment_list");
  let commentInput = document.querySelector(".comment_input");
  let submitCommentButton = document.querySelector("#submit_comment");

  let isCardDragging = false;
  let cardInitialY = 0;
  let cardOffsetY = 0;

  let isDragging = false;
  let initialY = 0;
  let offsetY = 0;

  loadComments(); // 댓글 로드 함수 호출
  function extend() {
    commentSection.classList.add("expanded");
    active_com = true;
  }
  function reduce() {
    commentSection.classList.remove("expanded");
    commentInput.classList.add("hide");
    commentList.classList.add("hide");
    active_com = false;
  }

  commentSection.addEventListener("transitionend", () => {
    if (active_com) {
      commentInput.classList.remove("hide");
      commentList.classList.remove("hide");
    }
  });

  // 댓글 버튼 클릭 시 댓글 창이 나타나도록
  commentButton.addEventListener("click", () => {
    extend();
  });

  // 댓글 창을 드래그하여 올리면 마우스를 따라 올라가도록
  commentSection.addEventListener("mousedown", (event) => {
    isDragging = true;
    active_com = true;
    initialY = event.clientY - offsetY;
  });

  document.addEventListener("mouseup", () => {
    if (isCardDragging) {
      cardMainCircle.style.background = `radial-gradient(circle, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 100%)`;
      isCardDragging = false;
      cardMain.style.transform = "";
      cardOffsetY = cardInitialY = 0;
    }
    if (isDragging) {
      isDragging = false;
      updateCommentSectionPosition();
      commentSection.style.transform = ``;
      offsetY = initialY = 0;
    }

    // 댓글 창의 위치를 갱신하여 완전히 펼친 상태인지 확인
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      let comment_bottom = commentSection.getBoundingClientRect().bottom;
      if (isDragging && comment_bottom > 1200) {
        offsetY = event.clientY - initialY;
        if (offsetY < -708) offsetY = -708;
        commentSection.style.transform = `translateY(${offsetY}px)`;
      }
    }
    if (isCardDragging) {
      cardOffsetY = event.clientY - cardInitialY;
      cardMain.style.transform = `translateY(${cardOffsetY}px)`;

      let topPosition = cardMain.getBoundingClientRect().top;
      let opacity = Math.max(0, 1 - topPosition / 500); // 카드 위치에 따라 원의 투명도 조정 (예시: 500px 기준)
      cardMainCircle.style.background = `radial-gradient(circle, rgba(255, 0, 0, ${opacity}) 0%, rgba(255, 0, 0, 0) 100%)`;
    }
  });

  commentSection.addEventListener("dblclick", () => {
    console.log(active_com);
    if (active_com) {
      reduce();
    } else {
      extend();
    }
  });

  // 댓글 창의 위치를 갱신하여 완전히 펼친 상태인지 확인
  function updateCommentSectionPosition() {
    let comment_top = commentSection.getBoundingClientRect().top;
    console.log(comment_top);
    if (comment_top < 500) {
      extend();
    } else {
      reduce();
    }
  }

  function loadComments() {
    // 예시 댓글 데이터
    let comments = [
      { author: "작성자1", content: "첫 번째 댓글입니다." },
      { author: "작성자2", content: "두 번째 댓글입니다." },
      { author: "작성자3", content: "세 번째 댓글입니다." },
      { author: "작성자4", content: "네 번째 댓글입니다." },
      { author: "작성자5", content: "다섯 번째 댓글입니다." },
    ];

    commentList.innerHTML = ""; // 기존 댓글 초기화

    comments.forEach((comment) => {
      let commentItem = document.createElement("div");
      commentItem.classList.add("comment_item");
      commentItem.innerHTML = `<strong>${comment.author}</strong>: ${comment.content}`;
      commentList.appendChild(commentItem);
    });
  }

  submitCommentButton.addEventListener("click", () => {
    let author = document.querySelector("#author").value;
    let comment = document.querySelector("#comment").value;

    if (author && comment) {
      let commentItem = document.createElement("div");
      commentItem.classList.add("comment_item");
      commentItem.innerHTML = `<strong>${author}</strong>: ${comment}`;
      commentList.appendChild(commentItem);

      // 입력 필드 초기화
      document.querySelector("#author").value = "";
      document.querySelector("#comment").value = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {});
