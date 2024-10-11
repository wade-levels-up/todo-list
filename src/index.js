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
export let viewMode = 'All';
export function setViewMode(mode) {
    viewMode = mode;
}
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

// View mode functions
 export function displayAllTasks() {
    renderTasks(sortTasks(null, null, tasks, true));
    titleDisplay.textContent = 'All Tasks'; 
    viewMode = 'All';
}
export function displayTodaysTasks() {
    renderTasks(sortTasks('dueDate', formattedTodaysDate, tasks, null));
    titleDisplay.textContent = `Today's Tasks`;
    viewMode = 'Today';
}

export function displayWeeksTasks() {
    renderTasks(tasks.filter(task => {
        return isWithinInterval(task.dueDate, { start: startOfWeekDate, end: endOfWeekDate });
    }));
    titleDisplay.textContent = `This Week's Tasks`;
    viewMode = 'Week';
}

export function displayOverdueTasks() {
    renderTasks(tasks.filter(task => {
        return task.dueDate < formattedTodaysDate;
    }));
    titleDisplay.textContent = `Overdue Tasks`;
    viewMode = 'Overdue';
}

export function displayMonthsTasks() {
    renderTasks(tasks.filter(task => {
        return isWithinInterval(task.dueDate, { start: startOfMonthDate, end: endOfMonthDate });
    }));
    titleDisplay.textContent = `This Month's Tasks`;
    viewMode = 'Month';
}
// Assign button logic
allTasksBtn.addEventListener('click', displayAllTasks);
addTasksBtn.addEventListener('click', () => { form.showModal() });
todaysTasksBtn.addEventListener('click', displayTodaysTasks);
weeksTasksBtn.addEventListener('click', displayWeeksTasks);
overdueTasksBtn.addEventListener('click', displayOverdueTasks);
monthsTasksBtn.addEventListener('click', displayMonthsTasks);

window.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('tasks') && localStorage.getItem('projects')) {
        loadData();
        renderTasks(tasks);
        renderProjects(projects)
    } else {
        tasks.push(new Todo('Wash Car', 'Home', 'Give the car a clean inside and out', 'car', '2024-10-13', 'low', false, 0));
        tasks.push(new Todo('Date Night', 'Relationship', 'Go out for dinner with my partner', 'heart', '2024-10-12', 'high', false, 1));
        tasks.push(new Todo('Sort Emails', 'Work', 'File away all read emails', 'inbox', '2024-11-6', 'low', false, 2));
        renderTasks(tasks);
        renderProjects(projects);
        saveData();
    }
});

document.getElementById("taskForm").addEventListener("submit", function (e) { 
    let formData = new FormData(e.target);
    let formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    tasks.push(createTask(formObject['title'], formObject['project'], formObject['description'], 'star', formObject['date'], formObject['priority'], false, (tasks.length + 1)));
    // titleDisplay.textContent = 'All Tasks';
    // viewMode = 'All';
    saveData();
    if (viewMode === 'All') {
        displayAllTasks();
    } else if (viewMode === 'Today') {
        displayTodaysTasks();
    } else if (viewMode === 'Week') {
        displayWeeksTasks();
    } else if (viewMode === 'Month') {
        displayMonthsTasks();
    } else if (viewMode === 'Overdue') {
        displayOverdueTasks();
    } else if (viewMode === 'Project') {
        let displayTitle = document.querySelector('#displayTitle');
        renderTasks(tasks.filter((task) => {
            if (task.project === displayTitle.textContent) {
                return task;
            }
        }))
}});

export function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadData() {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    projects = JSON.parse(localStorage.getItem('projects'));
}




