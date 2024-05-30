window.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');

    // 처음에 화면에 보여지는 placeholder의 수
    const initialPlaceholderCount = 6;

    // 스크롤 이벤트 감지하여 placeholder 동적 생성
    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            createPlaceholders(3); // 추가로 생성할 placeholder의 수
        }
    });

    // 초기에 일정 개수의 placeholder 생성
    createPlaceholders(initialPlaceholderCount);

    // placeholder를 동적으로 생성하는 함수
    function createPlaceholders(count) {
        for (let i = 0; i < count; i++) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            container.appendChild(placeholder);
        }
    }
});