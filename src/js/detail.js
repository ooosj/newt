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

document.addEventListener("DOMContentLoaded", () => {
  let cardMain = document.querySelector(".card_main");
  let cardLeft = document.querySelector(".card_left");
  let cardRight = document.querySelector(".card_right");
  let cardTempRight = document.querySelector(".card_temp_right");

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
    document.body
      .getElementsByClassName("e2479_2")[0]
      .appendChild(newCardRight);

    // Update references for the next shift
    cardLeft.addEventListener(
      "transitionend",
      () => {
        active = false;
        cardLeft.remove();
        cardLeft = cardMain;
        cardMain = cardRight;
        cardRight = cardTempRight;
        cardTempRight = newCardRight;
      },
      { once: true }
    );
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyA" && !active) {
      active = true;
      shiftCards();
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let commentButton = document.querySelector(".comment_button");
  let commentSection = document.querySelector(".comment_section");
  let cardMain = document.querySelector(".card_main");
  let e2479_3 = document.querySelector(".e2479_3");

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
