import {saveTask, getTask2, Eliminar, SearchTask, Actualizar} from './firebase.js';
import {onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"//Firestore
import { getStorage, ref, deleteObject, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";//Storage

// const storage = getStorage();

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')
let editing = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    const q = await getTask2()
    const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        let html = ''
        const tasks = [];
        querySnapshot.forEach((doc)=>{
            const task = doc.data()
            task.ID = doc.id
            tasks.push(task.Titulo)
            html +=`
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.Titulo} </h3>
                <p>${task.Descripcion}</p>
                <div>
                    <button class="btn btn-secondary btn-edit" data-id="${task.ID}"> Editar </button>
                    <button class="btn btn-danger btn-delete" data-id="${task.ID}"> Eliminar </button>
                </div>
            <div>
            </div>
            </div>`;
        });
        taskContainer.innerHTML = html

        const DelBtns = document.querySelectorAll('.btn-delete')
        DelBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                let text = 'Seguro que quieres eliminar esta tarea?'
                if(confirm(text)==true){
                    await Eliminar(e.target.dataset.id)
                }
            })
        })
        const EditBtns = document.querySelectorAll('.btn-edit')
        EditBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                editing = true
                taskForm['btn-task-form'].innerText = 'Actualizar'
                const doc = await SearchTask(e.target.dataset.id)
                id = doc.id
                const task = doc.data()
                taskForm['task-title'].value = task.Titulo
                taskForm['task-description'].value = task.Descripcion
            })
        })
    })
    

    // q.forEach(
    //     doc=>{
    //         const task = doc.data()
    //         html +=`
    //         <div class="card card-body mt-2 border-primary">
    //             <h3 class="h5">${task.Titulo} </h3>
    //             <p>${task.Descripcion}</p>
    //         <div>
    //         </div>
    //         </div>`;
    //     });
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const Titulo = taskForm['task-title']
    const Descripcion = taskForm['task-description']
    if(!editing){
        saveTask(Titulo.value, Descripcion.value)
    }else{
        console.log(id,Titulo.value,Descripcion.value)
        Actualizar(id,Titulo.value,Descripcion.value)
        editing=false
        taskForm['btn-task-form'].innerText = 'Guardar'
        id = ''
    }
    

    taskForm.reset()
})