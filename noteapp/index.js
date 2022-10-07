import {saveTask, getTask} from './firebase.js';

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getTask()

    let html = ''

    querySnapshot.forEach(
        html += ''


        doc=>{
            const task = doc.data()
            html +=`
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.Titulo} </h3>
                <p>${task.Descripcion}</p>
            <div>
            </div>
            </div>`;
        });

        taskContainer.innerHTML = html
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const Titulo = taskForm['task-title']
    const Descripcion = taskForm['task-description']

    saveTask(Titulo.value, Descripcion.value)

    taskForm.reset()
})