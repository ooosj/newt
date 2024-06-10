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
let article;

let active = false;
let active_com = false;
let num = 0;
let pivot = 1;
let left_temp = [];
let right_temp = [];

function dataIn() {
  if (!!article[num]) {
    let temp_data = article[num].title;
    num = num + 1;
    return temp_data;
  }
  return null;
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

  fetch("../article/NaverNews.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // 데이터 확인
      console.log(data.Sheet1);

      // JSON 데이터를 변수에 저장
      article = data.Sheet1;
      const newTitle = document.createElement("div");
      newTitle.innerText = update();
      newTitle.classList.add("title");
      switch (num % 5) {
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
      newCardRight.appendChild(newTitle);

      cardMain.innerText = dataIn();
      cardRight.innerText = dataIn();
      cardTempRight.innerText = dataIn();
    })
    .catch((error) => {
      console.log("에러에러");
    });

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
    const newTitle = document.createElement("div");
    newTitle.innerText = update();
    newTitle.classList.add("title");
    switch (pivot % 5) {
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
    newCardRight.appendChild(newTitle);

    document.body
      .getElementsByClassName("e2479_2")[0]
      .appendChild(newCardRight);

    // Update references for the next shift
    cardLeft.addEventListener(
      "transitionend",
      () => {
        active = false;
        left_temp.push(cardTempLeft.innerText);
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
        let t = dataIn();
        return t;
      }
      let t = right_temp.pop();
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
    const newTitle = document.createElement("div");
    newTitle.innerText = update();
    newTitle.classList.add("title");
    switch (pivot % 5) {
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
    newCardLeft.appendChild(newTitle);

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
        right_temp.push(cardTempRight.innerText);
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

  cardMain.addEventListener("mousedown", (event) => {
    isCardDragging = true;
    cardInitialY = event.clientY - cardOffsetY;
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

  function clearComments() {
    commentList.innerHTML = "";
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
