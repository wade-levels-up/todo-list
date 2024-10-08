import "./style.css";
import { test } from './createDOMEl.js';
import { Todo } from "./todoClass.js";
import { sortTasks } from "./sorter.js";
import { renderProjects, renderTasks } from "./render.js";
import { createTask, removeTask, updateTask } from "./taskManager.js";

const allTasksBtn = document.querySelector('#all-projects-btn');
const addTasksBtn = document.querySelector('#add-tasks-btn');
const updateTasksBtn = document.querySelector('#update-tasks-btn');

export let tasks = [];
export let projects = ['Home', 'Relationship', 'Work'];


allTasksBtn.addEventListener('click', ()=>{ renderTasks(sortTasks(null, null, tasks, true)) });
addTasksBtn.addEventListener('click', () => { tasks.push(createTask()) });
updateTasksBtn.addEventListener('click', ()=> { tasks = updateTask(prompt('id'), prompt('prop'), prompt('val'), tasks)});

window.addEventListener('DOMContentLoaded', ()=>{
    tasks.push(new Todo('Wash Car', 'Home', 'Give the Holden a clean inside and out', 'car', '8/10/24', 'low', false, 0));
    tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '14/10/24', 'high', false, 1));
    tasks.push(new Todo('Sort Emails', 'Work', 'Deleted all read emails', 'inbox', '2/10/24', 'low', false, 2));
    renderTasks(tasks);
    renderProjects(projects);
});







