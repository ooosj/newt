import { loginEmail, signupEmail } from './firebase.js';

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

//Email 로그인, 회원가입 구현
signinForm.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value; // 이메일 입력값 가져오기
  const password = document.getElementById('signin-password').value; // 비밀번호 입력값 가져오기
  loginEmail(email, password).then((result) => {
    console.log(result);
    const user = result.user;
    // loginSuccess(user.email, user.uid);
  });
});

signupForm.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value; // 이메일 입력값 가져오기
  const password = document.getElementById('signup-password').value; // 비밀번호 입력값 가져오기
  signupEmail(email, password) //
    .then((result) => {
      const user = result.user;
      // loginSuccess(user.email, user.uid);
    })
    .catch((error) => console.log(error));
});

// const loginSuccess = (email, uid) => {
//   const login_area = document.getElementById('login-area');
//   login_area.innerHTML = `<h2>Login 성공!</h2><div>uid: ${uid}</div><div>email: ${email}</div>`;


// };
