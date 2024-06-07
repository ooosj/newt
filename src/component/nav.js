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