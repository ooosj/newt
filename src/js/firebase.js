// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC7RilGl7FzQ05TByGLa88oaw83xIT4jk",
  authDomain: "newt-159b2.firebaseapp.com",
  projectId: "newt-159b2",
  storageBucket: "newt-159b2.appspot.com",
  messagingSenderId: "223446751175",
  appId: "1:223446751175:web:a59c9fba04f7beee72ebe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

//Email 로그인
export const signupEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};