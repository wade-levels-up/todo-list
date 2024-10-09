import { createDOMElement } from "./createDOMEl";
import { removeTask, updateTask } from "./taskManager";
import { removeProject, addProject } from "./projectManager";
import { tasks as taskList } from "./index"; 
import { projects as projectList } from "./index";
import { titleDisplay } from "./index";
import { sortTasks } from "./sorter";

export function renderTasks(tasks) {
    let taskContainer = document.querySelector('#task-container');
    taskContainer.textContent = '';
    for (let task of tasks) {

        let taskCard = createDOMElement('li', '', 'class', 'task', 'data-id', `${task['id']}`);
        taskCard.appendChild(createDOMElement('input', '', 'type', `checkbox`, 'style', 'accent-color: green'));
        
        let div1 = createDOMElement('div', '', 'class', 'taskCardDiv1');
        div1.appendChild(createDOMElement('span', '', 'class', `fa-solid fa-${task['icon']}`));
        div1.appendChild(createDOMElement('p', `${task['title']}`));
        taskCard.appendChild(div1);

        let div2 = createDOMElement('div', '', 'class', 'taskCardDiv2');
        div2.appendChild(createDOMElement('span', `${task['dueDate']}`, 'class', `dueDate`));
        let updateTaskBtn = createDOMElement('div', '', 'class', `fa-solid fa-edit editTaskBtn`);
        updateTaskBtn.addEventListener('click', ()=>{
            updateTask(taskCard.dataset.id, prompt('Property: '), prompt('Value: '));
            renderTasks(taskList);
        })
        div2.appendChild(updateTaskBtn);
        let removeTaskBtn = createDOMElement('div', '', 'class', `fa-solid fa-trash removeTaskBtn`);
        removeTaskBtn.onclick = ()=>{
            taskList.splice(removeTask(taskCard.dataset.id, taskList), 1);
            renderTasks(taskList);
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
        })
        project.appendChild(projectName);
        let deleteBtn = createDOMElement('span', '', 'class', 'fa-solid fa-trash projectDelBtn');
        deleteBtn.addEventListener('click', ()=>{
            projectList.splice(removeProject(project.dataset.name, projectList), 1);
            renderProjects(projectList);
        })
        project.appendChild(deleteBtn);
        projectsMenu.appendChild(project);

        projectDropDown.appendChild(createDOMElement('option', `${array[i]}`, 'value', `${array[i]}`));
    }

    const addNewProject = createDOMElement('li', '+ New Project', 'class', 'projectCard');
    addNewProject.addEventListener('click', ()=>{
        addProject(projectList, prompt('New Project Name: '));
        renderProjects(projectList);
    })
    projectsMenu.appendChild(addNewProject);
}