import { createDOMElement } from "./createDOMEl";
import { removeTask } from "./taskManager";
import { tasks as taskList } from "./index"; 

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