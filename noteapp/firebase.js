import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";//Firebase App
import { getFirestore, collection, query, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"//Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Pegar su configuración propia de Firebase (Consola-> Configuración de Proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyDAsgrQ5iaiMeU196UR0afVVGvsfSElBuk",
  authDomain: "nosql-test-f45f2.firebaseapp.com",
  projectId: "nosql-test-f45f2",
  storageBucket: "nosql-test-f45f2.appspot.com",
  messagingSenderId: "874177783462",
  appId: "1:874177783462:web:18629bf11cb5c3fcc67667"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (Titulo, Descripcion) => {
    addDoc(collection(db,'Homework'), {Titulo, Descripcion})
}
export const getTask = () => getDocs(collection(db,'Homework'));
export const getTask2 = () => query(collection(db,'Homework'));
export const Eliminar = (id) => deleteDoc(doc(db,"Homework",id));
export const SearchTask = (id) => getDoc(doc(db,"Homework",id));
export const Actualizar = (id,nuevoTitulo,nuevaDescripcion) => updateDoc(doc(db,"Homework",id),{Titulo: nuevoTitulo, Descripcion: nuevaDescripcion})