import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import  { getAuth, signOut  } from  "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"//Firestore
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
console.log(app)
const db = getFirestore();
const auth = getAuth();
const logout = document.querySelector('#logout')
const cityform = document.querySelector('#city-form')
const cityModal = document.getElementById('#city-modal')

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
    let count = 1
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
          </tr>`;
        });
        taskContainer.innerHTML = html
    })

    var unsubscribe = onSnapshot(q3,(querySnapshot)=>{
      let taskContainer = document.getElementById('tabla1-order-body')
      let html = ''
      const ciudades = [];
      let count = 1
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
        </tr>`;
      });
      taskContainer.innerHTML = html
  })
    
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
              <p class="">${Usuario.Nombre}</p>
            </td>
            <td>
              <p class="">${Usuario.Rol}</p>
            </td>
            <td>
              <p>${Usuario.Área}</p>
            </td>       
          </tr>`;
        });
        taskContainer.innerHTML = html
    })
})

cityform.addEventListener('submit', (e)=>{
  e.preventDefault();
  const Nombre = document.querySelector('#city-name').value;
  const Región = document.querySelector('#city-region').value;
  const Población = document.querySelector('#city-pop').value;
  addDoc(collection(db,'Ciudades'),{Nombre,Región,Población})
  cityform.reset()
})