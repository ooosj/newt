import { getUserName, loginEmail, signupEmail } from './firebase.js';

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

const signinForm = document.getElementById('sign_in'); // 로그인 폼 추가
const signupForm = document.getElementById('sign_up'); // 회원가입 폼 추가

//로그인 구현
signinForm.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value; // 이메일 입력값 가져오기
  const password = document.getElementById('signin-password').value; // 비밀번호 입력값 가져오기
  loginEmail(email, password).then((result) => {
    console.log(result);
    const user = result.user;
    alert(getUserName());
  }).catch((error) => {
    console.log(error);
    alert('로그인 실패!');
  });
});

// 회원가입 구현
signupForm.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value; // 이름 입력값 가져오기
  const email = document.getElementById('signup-email').value; // 이메일 입력값 가져오기
  const password = document.getElementById('signup-password').value; // 비밀번호 입력값 가져오기
  signupEmail({name, email, password}) //
    .then ((result) => {
      const user = result.user;
      alert('회원가입 성공!');
    })
    .catch((error) => {
      console.log(error);
      alert('회원가입 실패\n 이미 가입된 이메일이거나, 비밀번호가 너무 짧습니다');
    });
});

