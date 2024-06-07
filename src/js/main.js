
document.addEventListener('DOMContentLoaded', function() {
    const loginArea = document.getElementById('login-area');
    const userName = window.sessionStorage.getItem('username');
    if (userName !== null) {
        // If logged in, show username
        loginArea.innerHTML = `
            <span style="margin-left:20px";>${userName}님</span>
            <button id="logoutButton" style="margin-left:20px";> 로그아웃 </button>
        `;
        console.log(1);

        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function() {
            alert('로그아웃 되었습니다.');
            window.sessionStorage.removeItem('username'); // Remove username from session storage
            location.reload(); // Reload the page
        });
    } else {
        // If not logged in, show login button
        loginArea.innerHTML = `<button onClick="location.href='./login.html'">로그인</button>`;
        console.log(2);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const container = document.getElementById('container');
    let currentIndex = 0; // 현재 뉴스 인덱스
    const imageUrl = '../images/ms.jpg'; // 테스트 이미지 URL

    // 초기에 표시될 뉴스 개수
    createNewsPlaceholders(6);

    // 스크롤 이벤트 감지하여 추가 뉴스 생성
    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            createNewsPlaceholders(3); // 추가로 생성할 뉴스의 개수
        }
    });

// placeholder를 동적으로 생성하는 함수
function createNewsPlaceholders(count) {
    for (let i = 0; i < count; i++) {
        const newsWrapper = document.createElement('div');
        newsWrapper.classList.add('news-wrapper');

        const titleElement = document.createElement('div');
        titleElement.classList.add('news-title');
        titleElement.textContent = `${currentIndex + 1}번째 뉴스`; // 뉴스 번호

        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');

        const imgElement = new Image();
        imgElement.classList.add('thumbnail');
        imgElement.onload = function() {
            // 이미지가 로드되면 실행되는 함수
            placeholder.style.width = imgElement.width + 'px';
            placeholder.style.height = imgElement.height + 'px';
        };
        imgElement.src = imageUrl; // 썸네일 이미지 URL

        placeholder.appendChild(imgElement); // 썸네일 이미지를 placeholder에 추가
        newsWrapper.appendChild(placeholder);
        newsWrapper.appendChild(titleElement);

        container.appendChild(newsWrapper);

        currentIndex++;
    }
}

});



