import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import  { getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, FacebookAuthProvider,
  TwitterAuthProvider, signInWithPopup, 
  signOut} from  "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import { getFirestore, collection, query, orderBy,
  onSnapshot, addDoc, getDocs, deleteDoc, doc, getDoc,
  updateDoc} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"//Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAsgrQ5iaiMeU196UR0afVVGvsfSElBuk",
  authDomain: "nosql-test-f45f2.firebaseapp.com",
  projectId: "nosql-test-f45f2",
  storageBucket: "nosql-test-f45f2.appspot.com",
  messagingSenderId: "874177783462",
  appId: "1:874177783462:web:35b9b65490c339dac67667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()
const storage = getStorage();
const page = window.location;

//LOGIN
if (page.pathname == "/Parcial_2/login.html"){
  const logInForm = document.querySelector('#login-form')
  const signupForm = document.querySelector('#signupform')
  const signupModal = document.getElementById('signupModal')
  const googleLogin = document.querySelector('#google_login')
  const FBLogin = document.querySelector('#facebook_login')
  const twitterlogin = document.querySelector('#twitter_login')
  const modal = new mdb.Modal(signupModal)

  logInForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const email = document.querySelector('#email-input').value
      const pass = document.querySelector('#pass-input').value
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

  googleLogin.addEventListener('click',(e) =>{
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then(result =>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.href = "mainPage.html"
    })
    .catch((error) => {
      console.error(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
  })

  twitterlogin.addEventListener('click',e=>{
    e.preventDefault()
    const provider = new TwitterAuthProvider()
    signInWithPopup(auth, provider)
    .then((result)=>{
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      const user = credential.user;
      console.log(token)
      console.log(secret)
      console.log(user)
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = TwitterAuthProvider.credentialFromError(error)
      console.log('Error de Signup')
    })
  })

  FBLogin.addEventListener('click', e =>{
    e.preventDefault();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=>{
      const user = result.user
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log('Inicio de Sesión con Facebook')
      window.location.href = "mainPage.html"
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
  })
}

//MAINPAGE
if (page.pathname == "/Parcial_2/mainPage.html"){
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.providerData[0].providerId)
      if (user.providerData[0].providerId == 'google.com'){
        console.log('logeado con google')
      }
    } 
    else {
      console.log("user esta en null")
      window.location.href = 'login.html'
    }
  });
  const logout = document.querySelector('#logout')
  const newcityform = document.querySelector('#new-city-form')
  const editcityform = document.querySelector('#edit-city-form')
  const newcityModal = document.getElementById('#new-city-modal')
  var count = 1
  let id = '';

  const EliminarCiudad = (id) =>{
    deleteDoc(doc(db,"Ciudades",id));
    count =1
  } 
  const SearchCity = (id) => getDoc(doc(db,"Ciudades",id))

  logout.addEventListener('click',(e)=>{
      e.preventDefault()
      signOut(auth)
      .then(()=>{
          console.log('Cerrando sesion')
          window.location.href = 'login.html'
      })
      .catch((error)=>{
          const errorCode = error.code
          const errorMessage = error.message
      })
  })

  const getTask1 = () => query(collection(db,'Ciudades'));
  const getTask2 = () => query(collection(db,'Usuarios'));
  const getTask3 = () => query(collection(db,'Ciudades'),orderBy("Nombre"));

  window.addEventListener('DOMContentLoaded',async () =>{
    const q1 = await getTask1()
    const q2 = await getTask2()
    const q3 = await getTask3()
    count = 1
    //CIUDADES
    var unsubscribe = onSnapshot(q1,(querySnapshot)=>{
      let taskContainer = document.getElementById('tabla1-body')
      let html = ''
      const ciudades = [];
        querySnapshot.forEach((doc)=>{
          let ciudad = doc.data()
          ciudad.ID = doc.id
          ciudades.push(ciudad.Nombre)
          html +=`
          <tr>
          <td>
            <p class="fw-bold">${count++}</p>
          </td>
          <td>
            <p class="">${ciudad.Nombre}</p>
          </td>
          <td>
            <p class="">${ciudad.Región}</p>
          </td>
          <td>
            <p class="">${ciudad.Población}</p>
          </td>
          <td>
            <div class="d-grid gap-2 col-1">
              <button class="btn btn-outline-warning btn-dark btn-rounded text-warning btn-edit-city"
              data-mdb-toggle="modal" data-mdb-target="#edit-city-modal"'
              data-id=${ciudad.ID}>Editar</button>
              <button class="btn btn-outline-danger btn-dark btn-rounded text-danger btn-delete-city"
              id='btn-edit-city' data-id=${ciudad.ID}>Eliminar</button>
            </div>
          </td>
        </tr>`;
      });
      taskContainer.innerHTML = html
      const CityDelBtns = document.querySelectorAll('.btn-delete-city')
      CityDelBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          let text = 'Seguro que quieres eliminar esta tarea?'
          if(confirm(text)==true){
            await EliminarCiudad(e.target.dataset.id)
          }
        })
      })
      const CityEditBtns = document.querySelectorAll('.btn-edit-city')
      CityEditBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await SearchCity(e.target.dataset.id)
          id = doc.id
          const task = doc.data()
          editcityform['edit-city-name'].value = task.Nombre
          editcityform['edit-city-region'].value = task.Región
          editcityform['edit-city-pop'].value = task.Población
        })
      })
    })
    //CIUDADES ORDENADAS
    var unsubscribe = onSnapshot(q3,(querySnapshot)=>{
      let taskContainer = document.getElementById('tabla1-order-body')
      let html = ''
      const ciudades = [];
      count = 1
      querySnapshot.forEach((doc)=>{
          let ciudad = doc.data()
          ciudad.ID = doc.id
          ciudades.push(ciudad.Nombre)
          html +=`
          <tr>
          <td>
            <p class="fw-bold">${count++}</p>
          </td>
          <td>
            <p class="">${ciudad.Nombre}</p>
          </td>
          <td>
            <p class="">${ciudad.Región}</p>
          </td>
          <td>
            <p class="">${ciudad.Población}</p>
          </td>
          <td>
              <div class="d-grid gap-2 col-1">
                <button class="btn btn-outline-warning btn-dark btn-rounded text-warning"
                data-mdb-toggle="modal" data-mdb-target="#edit-city-modal" id='btn-edit-city'
                data-id=${ciudad.ID}>Editar</button>
                <button class="btn btn-outline-danger btn-dark btn-rounded text-danger btn-delete-city"
                id='btn-edit-city' data-id=${ciudad.ID}>Eliminar</button>
              </div>
            </td>
        </tr>`;
      });
      taskContainer.innerHTML = html
      const CityDelBtns = document.querySelectorAll('.btn-delete-city')
        CityDelBtns.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            let text = 'Seguro que quieres eliminar esta tarea?'
            if(confirm(text)==true){
                await EliminarCiudad(e.target.dataset.id)
            }
          })
        })
        const CityEditBtns = document.querySelectorAll('.btn-edit-city')
        CityEditBtns.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await SearchCity(e.target.dataset.id)
            id = doc.id
            const task = doc.data()
            editcityform['edit-city-name'].value = task.Nombre
            editcityform['edit-city-region'].value = task.Región
            editcityform['edit-city-pop'].value = task.Población
          })
        })
    })
    //USUARIOS
    var unsubscribe = onSnapshot(q2,(querySnapshot)=>{
      let taskContainer = document.getElementById('tabla2-body')
      let html = ''
      const Usuarios = [];
      count = 1
      querySnapshot.forEach((doc)=>{
          const Usuario = doc.data()
          Usuario.ID = doc.id
          Usuarios.push(Usuario.Nombre)
          html +=`
          <tr>
          <td>
            <p class="fw-bold">${count++}</p>
          </td>
          <td>
            <img
            src=""
            alt=""
            style="width: 45px; height: 45px"
            class="rounded-circle
            id= profilepic"
            data-foto = ${Usuario.foto}
            />
          </td>
          <td>
            <p class="">${Usuario.Nombre}</p>
          </td>
          <td>
            <p class="">${Usuario.Rol}</p>
          </td>
          <td>
            <p>${Usuario.Área}</p>
          </td>
          <td>
            <div class="d-grid gap-2 col-1">
              <button class="btn btn-outline-warning btn-dark btn-rounded text-warning"
              data-mdb-toggle="modal" data-mdb-target="#edit-city-modal" id='btn-edit-city'
              data-id=${Usuario.ID}>Editar</button>
              <button class="btn btn-outline-danger btn-dark btn-rounded text-danger btn-delete-city"
              id='btn-edit-city' data-id=${Usuario.ID}>Eliminar</button>
            </div>
          </td>
        </tr>`;
      });
      taskContainer.innerHTML = html
      const profilepics = document.querySelectorAll('.profilepic')
        profilepics.forEach(img => {
          const imagen = ref(storage,img.dataset.foto)
          getDownloadURL(imagen)
          .then((url)=>{
            img.setAttribute('src', url)
          })
        })
    })
  })

  newcityform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const Nombre = document.querySelector('#city-name').value;
    const Región = document.querySelector('#city-region').value;
    const Población = document.querySelector('#city-pop').value;
    addDoc(collection(db,'Ciudades'),{Nombre,Región,Población})
    count = 1
    newcityform.reset()
  })
  editcityform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newNombre = document.querySelector('#edit-city-name').value;
    const newRegión = document.querySelector('#edit-city-region').value;
    const newPoblación = document.querySelector('#edit-city-pop').value;
    updateDoc(doc(db,"Ciudades",id),{Nombre: newNombre, Región: newRegión, Población: newPoblación})
    count = 1
    editcityform.reset()
  })
}