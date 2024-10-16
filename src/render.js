import { createDOMElement } from "./createDOMEl";
import { removeTask, updateTask } from "./taskManager";
import { removeProject, addProject } from "./projectManager";
import { tasks as taskList } from "./index"; 
import { projects as projectList } from "./index";
import { titleDisplay, saveData, loadData, displayAllTasks, displayMonthsTasks, displayOverdueTasks, displayTodaysTasks, displayWeeksTasks, viewMode, setViewMode } from "./index";
import { sortTasks } from "./sorter";
import { format } from "date-fns";

let addingNewProject = false;
let displayTitle = document.querySelector('#displayTitle');
let updateForm = document.querySelector('#updateTaskForm');

function displayTitleHandler() {
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
        renderTasks(taskList.filter((task) => {
            if (task.project === displayTitle.textContent) {
                return task;
            }
        }));
    }
}

export function renderTasks(tasks) {
    let taskContainer = document.querySelector('#task-container');
    taskContainer.textContent = '';
    for (let task of tasks) {

        let taskCard = createDOMElement('li', '', 'class', 'task', 'data-id', `${task['id']}`);
        let checkBox = createDOMElement('input', '', 'type', `checkbox`, 'data-id', `${task['id']}`);
        checkBox.style.accentColor = 'green';
        if (task.checklist === true) { 
            checkBox.checked = true 
            taskCard.style.borderTop = '2px ridge rgb(0, 255, 0, 0.5)';
            taskCard.style.borderBottom = '2px ridge rgb(0, 255, 0, 0.5)';
            taskCard.style.backgroundColor = 'rgb(0, 255, 0, 0.2)';
        };
        checkBox.addEventListener('click', ()=>{
            if (task.checklist === true) { 
                checkBox.checked = false;
                updateTask(`${task['id']}`, 'checklist', false);
                saveData();
                taskCard.style.borderTop = '3px ridge rgb(0, 0, 0, 0.2)';
                taskCard.style.borderBottom = '3px ridge rgb(0, 0, 0, 0.2)';
                taskCard.style.backgroundColor = 'rgb(0, 0, 0, 0)';
            } else if (task.checklist === false) {
                checkBox.checked = true;
                updateTask(`${task['id']}`, 'checklist', true);
                saveData();
                taskCard.style.borderTop = '3px ridge rgb(0, 255, 0, 0.5)';
                taskCard.style.borderBottom = '3px ridge rgb(0, 255, 0, 0.5)';
                taskCard.style.backgroundColor = 'rgb(0, 255, 0, 0.2)';
            }
        })
        taskCard.appendChild(checkBox);
        
        let div1 = createDOMElement('div', '', 'class', 'taskCardDiv1');
        div1.appendChild(createDOMElement('span', '', 'class', `fa-solid fa-${task['icon']}`));
        div1.appendChild(createDOMElement('p', `${task['title']}`));
        taskCard.appendChild(div1);
        
        let div2 = createDOMElement('div', '', 'class', 'taskCardDiv2');
        div2.appendChild(createDOMElement('span', format(`${task['dueDate']}`, 'dd-MM-yyyy'), 'class', `dueDate`));
        let updateTaskBtn = createDOMElement('div', '', 'class', `fa-solid fa-edit editTaskBtn`);
        updateTaskBtn.addEventListener('click', ()=>{
            let uTitle = document.querySelector('#uTitle');
            let uProject = document.querySelector('#uProject');
            uProject.textContent = '';
            uProject.appendChild(createDOMElement('option', `None`, 'value', `None`));
            for (let proj of projectList) {
                uProject.appendChild(createDOMElement('option', `${proj}`, 'value', `${proj}`));
            }
            let uDate = document.querySelector('#uDate');
            let uDesc = document.querySelector('#uDesc');
            let uPriority = document.querySelector('#uPriority');
            let uID = document.querySelector('#uID');
            let uIcon = document.querySelector('#uIcon');
            uIcon.value = task.icon;
            uID.value = task.id;
            uPriority.value = task.priority;
            uDesc.value = task.description;
            uDate.value = format(task.dueDate, 'yyyy-MM-dd');
            uProject.value = task.project;
            uTitle.value = task.title;
            updateForm.showModal();
            displayTitleHandler();
        })
        div2.appendChild(updateTaskBtn);
        let removeTaskBtn = createDOMElement('div', '', 'class', `fa-solid fa-trash removeTaskBtn`);
        removeTaskBtn.onclick = ()=>{
            taskList.splice(removeTask(taskCard.dataset.id, taskList), 1);
            saveData();
            displayTitleHandler();
        };
        div2.appendChild(removeTaskBtn);
        taskCard.appendChild(div2);
        taskCard.appendChild(createDOMElement('div', `${task['description']}`, 'class', 'taskCardDiv3'));

        taskContainer.appendChild(taskCard);
    }
}

export function renderProjects(array) {
    const projectsMenu = document.querySelector('#projects');
    projectsMenu.textContent = '';
    const projectDropDown = document.querySelector('#tProject');
    projectDropDown.textContent = '';
    projectDropDown.appendChild(createDOMElement('option', 'None', 'value', 'None'));


    for (let i = 0; i < array.length; i++) {
        let project = createDOMElement('li', '', 'class', 'projectCard', 'data-name', `${array[i]}`);
        project.appendChild(createDOMElement('span', '', 'class', 'fa-solid fa-folder'));
        let projectName = createDOMElement('p', `${array[i]}`, 'style', 'flex-grow: 1');
        projectName.addEventListener('click', ()=>{
            renderTasks(sortTasks('project', project.dataset.name, taskList));
            titleDisplay.textContent = `${array[i]}`;
            setViewMode('Project');
        })
        project.appendChild(projectName);
        let deleteBtn = createDOMElement('span', '', 'class', 'fa-solid fa-trash projectDelBtn');
        deleteBtn.addEventListener('click', ()=>{
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].project === project.dataset.name) {
                    taskList.splice(i, 1);
                }
            }
            saveData();
            projectList.splice(removeProject(project.dataset.name, projectList), 1);
            renderProjects(projectList);
            displayTitleHandler();
        })
        project.appendChild(deleteBtn);
        projectsMenu.appendChild(project);

        projectDropDown.appendChild(createDOMElement('option', `${array[i]}`, 'value', `${array[i]}`));
    }

    const addNewProject = createDOMElement('li', '+ New Project', 'class', 'projectCard inputProj', 'style', 'display: block');
    const inputNewProjectDiv = createDOMElement('div', '', 'style', 'display: none', 'class', 'input-project-div');
    const inputNewProject = createDOMElement('input', '', 'type', 'text');
    inputNewProjectDiv.appendChild(inputNewProject);
    const cancelBtn = createDOMElement('button', 'cancel');
    cancelBtn.addEventListener('click', ()=>{
        addNewProject.style.display = 'block';
        inputNewProjectDiv.style.display = 'none';
        addingNewProject = false;
    });
    const addBtn = createDOMElement('button', 'add');
    addBtn.addEventListener('click', ()=>{
        if (inputNewProject.value.length <= 13) {
            projectList.push(inputNewProject.value);
            console.log(projectList);
            addNewProject.style.display = 'block';
            inputNewProjectDiv.style.display = 'none';
            addingNewProject = false;
            renderProjects(projectList);
        } else if (inputNewProject.value.length < 1) {
            alert('Please enter at least 1 character');
        } else if (inputNewProject.value.length > 13) {
            alert('Please enter no more than 13 characters');
        }
    })
    inputNewProjectDiv.appendChild(addBtn);
    inputNewProjectDiv.appendChild(cancelBtn);
    addNewProject.addEventListener('click', ()=> {
        if (addingNewProject === false) {
            addNewProject.style.display = 'none';
            inputNewProjectDiv.style.display = 'block';
            addingNewProject = true;
        }
    })
    if (projectList.length < 6) {
        projectsMenu.appendChild(addNewProject);
    }
    projectsMenu.appendChild(inputNewProjectDiv);
    saveData();
}