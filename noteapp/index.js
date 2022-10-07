import {saveTask, getTask2} from './firebase.js';
import {onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async () => {
    const q = await getTask2()
    const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        let html = ''
        const tasks = [];
        querySnapshot.forEach((doc)=>{
            const task = doc.data()
            tasks.push(task.Titulo)
            html +=`
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.Titulo} </h3>
                <p>${task.Descripcion}</p>
            <div>
            </div>
            </div>`;
        });
        console.log(tasks.join(", "))
        console.log(html)
        taskContainer.innerHTML = html
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

    saveTask(Titulo.value, Descripcion.value)

    taskForm.reset()
})