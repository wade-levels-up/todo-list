import "./style.css";
import { test } from './createDOMEl.js';
import { Todo } from "./todoClass.js";
import { sortTasks } from "./sorter.js";
import { renderProjects, renderTasks } from "./render.js";
import { createTask, removeTask, updateTask } from "./taskManager.js";
import { compareAsc, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export let tasks = [];
export let projects = ['Home', 'Relationship', 'Work'];
export let todaysDate = new Date();
export let formattedTodaysDate = format(todaysDate, 'yyyy-MM-dd');
export let startOfWeekDate = startOfWeek(todaysDate, { weekStartsOn: 1});
export let endOfWeekDate = endOfWeek(todaysDate, {weekStartsOn: 1});
export let startOfMonthDate = startOfMonth(todaysDate);
export let endOfMonthDate = endOfMonth(todaysDate);

export let titleDisplay = document.querySelector('#displayTitle');
let form = document.querySelector('dialog');
let closeModalBtn = document.querySelector('#close-modal-btn');
closeModalBtn.addEventListener('click', ()=> { form.close(); })

// Identify buttons and store in variables
const allTasksBtn = document.querySelector('#all-projects-btn');
const addTasksBtn = document.querySelector('#add-tasks-btn');
const todaysTasksBtn = document.querySelector('.todays-tasks');
const weeksTasksBtn = document.querySelector('.weeks-tasks');
const overdueTasksBtn = document.querySelector('.overdue-tasks');
const monthsTasksBtn = document.querySelector('.months-tasks');


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
    titleDisplay.textContent = `Today's Tasks`;
})
weeksTasksBtn.addEventListener('click', ()=>{
    renderTasks(tasks.filter(task => {
        return isWithinInterval(task.dueDate, { start: startOfWeekDate, end: endOfWeekDate });
    }));
    titleDisplay.textContent = `This Week's Tasks`;
})
overdueTasksBtn.addEventListener('click', ()=>{
    renderTasks(tasks.filter(task => {
        return task.dueDate < formattedTodaysDate;
    }));
    titleDisplay.textContent = `Overdue Tasks`;
})
monthsTasksBtn.addEventListener('click', ()=>{
    renderTasks(tasks.filter(task => {
        return isWithinInterval(task.dueDate, { start: startOfMonthDate, end: endOfMonthDate });
    }));
    titleDisplay.textContent = `This Month's Tasks`;
})

window.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('tasks') && localStorage.getItem('projects')) {
        loadData();
        console.log('loaded tasks from localstorage');
        renderTasks(tasks);
        renderProjects(projects)
    } else {
        tasks.push(new Todo('Wash Car', 'Home', 'Give the car a clean inside and out', 'car', '2024-10-13', 'low', false, 0));
        tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '2024-10-12', 'high', false, 1));
        tasks.push(new Todo('Sort Emails', 'Work', 'File away all read emails', 'inbox', '2024-11-6', 'low', false, 2));
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




