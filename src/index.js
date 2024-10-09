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
    // tasks.push(createTask());
    // renderTasks(tasks);
    form.showModal();
});
todaysTasksBtn.addEventListener('click', ()=>{
    renderTasks(sortTasks('dueDate', Date(), tasks, null));
})

window.addEventListener('DOMContentLoaded', ()=>{
    tasks.push(new Todo('Wash Car', 'Home', 'Give the Holden a clean inside and out', 'car', '8/10/24', 'low', false, 0));
    tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '14/10/24', 'high', false, 1));
    tasks.push(new Todo('Sort Emails', 'Work', 'Deleted all read emails', 'inbox', '2/10/24', 'low', false, 2));
    renderTasks(tasks);
    renderProjects(projects);
    console.log(`Today's date is: ${todaysDate}`);
});







