import { getTasks, saveTasks } from "./storage.js";

const taskInput = document.querySelector('#taskInput')
const taskButton = document.querySelector('#addTask-button')
const taskList = document.getElementById('taskList')

const filtroSelect = document.getElementById('filtro')
const filtroButton = document.querySelector('.filtros button')

taskButton.addEventListener('click', addTask)

function renderTasks() {
    taskList.innerHTML = ""
    const tasks = getTasks()

    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        const taskSpan = document.createElement('span')

        taskSpan.textContent = task.text
        if (task.concluida) {
            taskSpan.classList.add('concluida')
        }

        const finishButton = document.createElement('button')
        finishButton.textContent = task.concluida ? '🟦' : '✅'
        finishButton.style.marginLeft = '10px'

        finishButton.addEventListener('click', function () {
            task.concluida = !task.concluida
            saveTasks(tasks)
            renderTasks();
        })

        const removeButton = document.createElement('button')
        removeButton.textContent = '❌'
        removeButton.style.marginLeft = '10px'

        removeButton.addEventListener('click', function () {
            tasks.splice(index, 1)
            saveTasks(tasks)
            renderTasks()
        })

        const buttonsDiv = document.createElement('div')

        buttonsDiv.appendChild(finishButton)
        buttonsDiv.appendChild(removeButton)

        li.appendChild(taskSpan)
        li.appendChild(buttonsDiv)
        taskList.appendChild(li)

        taskInput.value = ''
    })
}

function addTask() {
    const taskText = taskInput.value.trim()

    if (taskText === '') {
        alert('Digite uma tarefa!')
        return
    }

    const taskObj = {
        text: taskText,
        concluida: false
    }

    const tasks = getTasks()
    tasks.push(taskObj)
    saveTasks(tasks)

    renderTasks()
    taskInput.value = ''
}

filtroButton.addEventListener('click', () => {
    const filtro = filtroSelect.value;
    const tarefas = document.querySelectorAll('#taskList li')

    tarefas.forEach(tarefa => {

        const span = tarefa.querySelector('span')

        if (filtro === 'Todas') {
            tarefa.style.display = 'flex';
        }
        else if (filtro === 'Concluidas') {
            tarefa.style.display = span.classList.contains('concluida') ? 'flex' : 'none';
        }
        else if (filtro === 'Pendentes') {
            tarefa.style.display = !span.classList.contains('concluida') ? 'flex' : 'none';
        }
    });
})

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});
