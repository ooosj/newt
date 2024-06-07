const position = {
  main: {
    left: "465px",
    top: "228px",
  },
  right: {
    left: "1581px",
    top: "518px",
  },
  left: {
    left: "-418px",
    top: "518px",
  },
  tempLeft: {
    left: "-1000px",
    top: "518px",
  },
  tempRight: {
    left: "2000px",
    top: "518px",
  },
};

let active = false;
let num = 0;
let pivot = 1;
let left_temp = [];
let right_temp = [];

function dataIn() {
  num = num + 1;
  return num;
}

document.addEventListener("DOMContentLoaded", () => {
  let cardMain = document.querySelector(".card_main");
  let cardLeft = document.querySelector(".card_left");
  let cardRight = document.querySelector(".card_right");
  let cardTempRight = document.querySelector(".card_temp_right");
  let cardTempLeft = document.querySelector(".card_temp_left");

  // 초기 카드에 값 설정
  cardTempLeft.innerText = dataIn();
  cardLeft.innerText = dataIn();
  cardMain.innerText = dataIn();
  cardRight.innerText = dataIn();
  cardTempRight.innerText = dataIn();

  const shiftCards = () => {
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
    newCardRight.innerText = update();

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
      },
      { once: true }
    );
    function update() {
      if (right_temp.length === 0) {
        // 비어있음
        console.log("r over");
        let t = dataIn();
        return t;
      }
      console.log(right_temp);
      let t = right_temp.pop();
      return t;
    }
  };

  const backCards = () => {
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
    newCardLeft.innerText = update();

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
    if (event.key === "ArrowRight" && !active) {
      active = true;
      shiftCards();
    } else if (event.key === "ArrowLeft" && !active) {
      active = true;
      backCards();
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let commentButton = document.querySelector(".comment_button");
  let commentSection = document.querySelector(".comment_section");

  let isDragging = false;
  let initialY = 0;
  let offsetY = 0;

  // 댓글 버튼 클릭 시 댓글 창이 나타나도록
  commentButton.addEventListener("click", () => {
    commentSection.classList.toggle("expanded");
  });

  // 댓글 창을 드래그하여 올리면 마우스를 따라 올라가도록
  commentSection.addEventListener("mousedown", (event) => {
    isDragging = true;
    initialY = event.clientY - offsetY;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    updateCommentSectionPosition();
    commentSection.style.transform = ``;
    offsetY = initialY = 0;
    // 댓글 창의 위치를 갱신하여 완전히 펼친 상태인지 확인
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      offsetY = event.clientY - initialY;
      commentSection.style.transform = `translateY(${offsetY}px)`;
    }
  });

  // 댓글 창의 위치를 갱신하여 완전히 펼친 상태인지 확인
  function updateCommentSectionPosition() {
    let comment_top = commentSection.getBoundingClientRect().top;
    console.log(comment_top);
    if (comment_top < 500) {
      commentSection.classList.add("expanded");
    } else {
      commentSection.classList.remove("expanded");
    }
  }
});
