import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import  { getAuth, signOut  } from  "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"//Firestore
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
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
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const user = auth.currentUser
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
              <img
              src="${Usuario}"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
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