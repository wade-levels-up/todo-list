import "./style.css";
import { test } from './createDOMEl.js';
import { Todo } from "./todoClass.js";
import { sortTasks } from "./sorter.js";
import { renderProjects, renderTasks } from "./render.js";
import { createTask, removeTask, updateTask } from "./taskManager.js";
import { compareAsc, format } from "date-fns";

export let tasks = [];
export let projects = ['Home', 'Relationship', 'Work'];
let todaysDate = new Date();
let formattedTodaysDate = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-0${todaysDate.getDate()}`;

export let titleDisplay = document.querySelector('#displayTitle');
let form = document.querySelector('dialog');
let closeModalBtn = document.querySelector('#close-modal-btn');
closeModalBtn.addEventListener('click', ()=> { form.close(); })

// Identify buttons and store in variables
const allTasksBtn = document.querySelector('#all-projects-btn');
const addTasksBtn = document.querySelector('#add-tasks-btn');
const todaysTasksBtn = document.querySelector('.todays-tasks');


// Assign button logic
allTasksBtn.addEventListener('click', ()=>{ 
    renderTasks(sortTasks(null, null, tasks, true));
    titleDisplay.textContent = 'All Tasks'; 
});
addTasksBtn.addEventListener('click', () => { 
    form.showModal();
});
todaysTasksBtn.addEventListener('click', ()=>{
    renderTasks(sortTasks('dueDate', formattedTodaysDate, tasks, null));
})

window.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('tasks') && localStorage.getItem('projects')) {
        loadData();
        console.log('loaded tasks from localstorage');
        renderTasks(tasks);
        renderProjects(projects)
    } else {
        tasks.push(new Todo('Wash Car', 'Home', 'Give the car a clean inside and out', 'car', '2024-12-08', 'low', false, 0));
        tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '2024-09-03', 'high', false, 1));
        tasks.push(new Todo('Sort Emails', 'Work', 'File away all read emails', 'inbox', '2024-11-06', 'low', false, 2));
        renderTasks(tasks);
        renderProjects(projects);
        console.log(`Today's date is: ${formattedTodaysDate}`);
        console.log('No tasks or projects detected in local storage - loading defaults');
        saveData();
    }
});

document.getElementById("taskForm").addEventListener("submit", function (e) { 
    let formData = new FormData(e.target);
    let formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.table(formObject['title'], formObject['project'], formObject['description'], 'star', formObject['date'], formObject['priority'], true, (tasks.length + 1));
    tasks.push(createTask(formObject['title'], formObject['project'], formObject['description'], 'star', formObject['date'], formObject['priority'], false, (tasks.length + 1)));
    titleDisplay.textContent = 'All Tasks';
    saveData();
    renderTasks(tasks);
});

export function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(`saved ${tasks} and ${projects}`);
}

export function loadData() {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    projects = JSON.parse(localStorage.getItem('projects'));
}







