document.addEventListener('DOMContentLoaded', function() {
    const loginArea = document.getElementById('login-area');
    const userName = window.sessionStorage.getItem('username');
    if (userName !== null) {
        // 로그인 되어있을 때, 유저 이름을 보여줌
        loginArea.innerHTML = `
            <span style="margin-left:20px; font-size : 18px";>${userName}님</span>
            <button id="logoutButton" style="margin-left:20px";> 로그아웃 </button>
        `;
        console.log(1);

        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function() {
            alert('로그아웃 되었습니다.');
            window.sessionStorage.removeItem('username'); // 세션 스토리지에서 유저 이름 삭제
            location.reload(); 
        });
    } else {
        // 로그인 되어있지 않을 때, 로그인 버튼을 보여줌
        loginArea.innerHTML = `<button onClick="location.href='./login.html'">로그인</button>`;
        console.log(2);
    }
});


