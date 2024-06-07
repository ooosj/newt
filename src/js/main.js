document.addEventListener('DOMContentLoaded', async function() {
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

    // Fetch the title from data.json
    const response = await fetch('data.json');
    const data = await response.json();
    const newsTitle = data.title;

    // Create placeholder with the fetched title
    const container = document.getElementById('container');
    const newsWrapper = document.createElement('div');
    newsWrapper.classList.add('news-wrapper');

    const titleElement = document.createElement('div');
    titleElement.classList.add('news-title');
    titleElement.textContent = newsTitle; // Set the fetched title here

    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');

    const imgElement = new Image();
    imgElement.classList.add('thumbnail');
    imgElement.onload = function() {
        // 이미지가 로드되면 실행되는 함수
        placeholder.style.width = imgElement.width + 'px';
        placeholder.style.height = imgElement.height + 'px';
    };
    imgElement.src = '../images/ms.jpg'; // 썸네일 이미지 URL

    placeholder.appendChild(imgElement); // 썸네일 이미지를 placeholder에 추가
    newsWrapper.appendChild(placeholder);
    newsWrapper.appendChild(titleElement);

    container.appendChild(newsWrapper);
});
