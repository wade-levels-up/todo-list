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
let formattedTodaysDate = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`;

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
    tasks.push(new Todo('Wash Car', 'Home', 'Give the Holden a clean inside and out', 'car', '2024-12-8', 'low', false, 0));
    tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '2024-9-3', 'high', false, 1));
    tasks.push(new Todo('Sort Emails', 'Work', 'Deleted all read emails', 'inbox', '2024-11-6', 'low', false, 2));
    renderTasks(tasks);
    renderProjects(projects);
    console.log(`Today's date is: ${formattedTodaysDate}`);
});

document.getElementById("taskForm").addEventListener("submit", function (e) { 
  
    let formData = new FormData(e.target);
    let formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.table(formObject['title'], formObject['project'], formObject['description'], 'star', formObject['date'], formObject['priority'], true, (tasks.length + 1));
    tasks.push(createTask(formObject['title'], formObject['project'], formObject['description'], 'star', formObject['date'], formObject['priority'], true, (tasks.length + 1)));
    titleDisplay.textContent = 'All Tasks'
    renderTasks(tasks);
});







