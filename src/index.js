import "./style.css";
import { test } from './createDOMEl.js';
import { Todo } from "./todoClass.js";
import { sortTasks } from "./sorter.js";
import { renderTasks } from "./render.js";
import { createTask, removeTask, updateTask } from "./taskManager.js";

const homeTasksBtn = document.querySelector('#home-projects-btn');
const allTasksBtn = document.querySelector('#all-projects-btn');
const addTasksBtn = document.querySelector('#add-tasks-btn');
const removeTasksBtn = document.querySelector('#remove-tasks-btn');
const updateTasksBtn = document.querySelector('#update-tasks-btn');

let tasks = [];

homeTasksBtn.addEventListener('click', ()=>{ renderTasks(sortTasks('project', 'Home', tasks)) });
allTasksBtn.addEventListener('click', ()=>{ renderTasks(sortTasks(null, null, tasks, true)) });
addTasksBtn.addEventListener('click', () => { tasks.push(createTask()) });
removeTasksBtn.addEventListener('click', ()=> { tasks.splice(removeTask(null, tasks), 1) });
updateTasksBtn.addEventListener('click', ()=> { tasks = updateTask(prompt('id'), prompt('prop'), prompt('val'), tasks)});

window.addEventListener('DOMContentLoaded', ()=>{
    tasks.push(new Todo('Wash Car', 'Home', 'Give the Holden a clean inside and out', '🚗', '8/10/24', 'low', false, 0));
    tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', '❤️', '14/10/24', 'high', false, 1));
    tasks.push(new Todo('Sort Emails', 'Work', 'Deleted all read emails', '📖', '2/10/24', 'low', false, 2));
});







