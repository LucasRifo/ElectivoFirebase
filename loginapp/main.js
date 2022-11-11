import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import  { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from  "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAsgrQ5iaiMeU196UR0afVVGvsfSElBuk",
  authDomain: "nosql-test-f45f2.firebaseapp.com",
  projectId: "nosql-test-f45f2",
  storageBucket: "nosql-test-f45f2.appspot.com",
  messagingSenderId: "874177783462",
  appId: "1:874177783462:web:74e4b4820fcdf154c67667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const signupForm = document.querySelector('#signup-form')
const signupModal = document.getElementById('signupModal')
const modal = new mdb.Modal(signupModal)

signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const pass = document.querySelector('#signup-pass').value;
    createUserWithEmailAndPassword(auth, email, pass)
    .then(userCredential=>{
      signupForm.reset()
      modal.hide()
      console.log('Registrado')
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
    })
})

const logInForm = document.querySelector('#login-form')

logInForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const email = document.querySelector('#Email-input').value
  const pass = document.querySelector('#Pass-input').value
  signInWithEmailAndPassword(auth, email, pass)
  .then(userCredential =>{
    logInForm.reset();
    window.location.href = "mainPage.html"
    console.log("Sesion Iniciada")
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.Message;
  })
})

const logout = document.querySelector('#logout')

const googleLogin = document.querySelector('#google_login')
googleLogin.addEventListener('click',(e) =>{
  e.preventDefault()
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth,provider)
  .then(result =>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    window.location.href = "mainPage.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
})

const facebooklogin = document.querySelector('#facebook_login')
facebooklogin.addEventListener('click', e =>{
  e.preventDefault();
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider).then(result=>{
    console.log(result)
    console.log('Inicio de Sesión con Facebook')
    window.location.href = "mainPage.html"
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


})