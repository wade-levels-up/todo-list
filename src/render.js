import { createDOMElement } from "./createDOMEl";
import { removeTask } from "./taskManager";
import { removeProject, addProject } from "./projectManager";
import { tasks as taskList } from "./index"; 
import { projects as projectList } from "./index";

export function renderTasks(tasks) {
    let taskContainer = document.querySelector('#task-container');
    taskContainer.textContent = '';
    for (let task of tasks) {

        let taskCard = createDOMElement('li', '', 'class', 'task');
        taskCard.appendChild(createDOMElement('input', '', 'type', `checkbox`, 'style', 'accent-color: green'));
        
        let div1 = createDOMElement('div', '', 'class', 'taskCardDiv');
        div1.appendChild(createDOMElement('span', '', 'class', `fa-solid fa-${task['icon']}`));
        div1.appendChild(createDOMElement('p', `${task['title']}`));
        taskCard.appendChild(div1);

        let div2 = createDOMElement('div', '', 'class', 'taskCardDiv');
        div2.appendChild(createDOMElement('span', '', 'class', `fa-solid fa-clock dueDate`, 'title', `${task['dueDate']}`));
        div2.appendChild(createDOMElement('div', '', 'class', `fa-solid fa-edit editTaskBtn`));
        let removeTaskBtn = createDOMElement('div', '', 'class', `fa-solid fa-trash removeTaskBtn`, 'data-id', `${task['id']}`);
        removeTaskBtn.onclick = ()=>{
            taskList.splice(removeTask(removeTaskBtn.dataset.id, taskList), 1);
            console.table(taskList);
            renderTasks(taskList);
        };
        div2.appendChild(removeTaskBtn);
        taskCard.appendChild(div2);

        taskContainer.appendChild(taskCard);
    }
}

export function renderProjects(array) {
    const projectsMenu = document.querySelector('#projects');
    projectsMenu.textContent = '';


    for (let i = 0; i < array.length; i++) {
        let project = createDOMElement('li', '', 'class', 'projectCard', 'data-name', `${array[i]}`);
        project.appendChild(createDOMElement('span', '', 'class', 'fa-solid fa-folder'));
        project.appendChild(createDOMElement('p', `${array[i]}`, 'style', 'flex-grow: 1'))
        let deleteBtn = createDOMElement('span', '', 'class', 'fa-solid fa-trash projectDelBtn');
        deleteBtn.addEventListener('click', ()=>{
            projectList.splice(removeProject(project.dataset.name, projectList), 1);
            renderProjects(projectList);
        })
        project.appendChild(deleteBtn);
        projectsMenu.appendChild(project);
    }

    const addNewProject = createDOMElement('li', '+ New Project', 'class', 'projectCard');
    addNewProject.addEventListener('click', ()=>{
        projectList.push(prompt('New Project Name: '));
        renderProjects(projectList);
    })
    projectsMenu.appendChild(addNewProject);
}