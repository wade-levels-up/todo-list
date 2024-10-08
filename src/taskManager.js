import { Todo } from "./todoClass"
import { tasks as taskList } from "./index.js";
import { renderTasks } from "./render";

export function createTask() {
    return new Todo(
        prompt('title:'),
        prompt('project:'),
        prompt('desc:'),
        prompt('icon:'),
        prompt('dueDate:'),
        prompt('priority:'),
        prompt('checklist:'),
        prompt('id')
    );
}

export function removeTask(id, tasks){
    for (let i = 0; i < tasks.length; i++) {
        if (+tasks[i].id === +id) {
            return i;
        }
    }
}

export function updateTask(id, property, value, tasks) {
    for (let i = 0; i < taskList.length; i++) {
        if (+taskList[i].id === +id) {
            taskList[i][property] = value;
        }
    }
}

// export function updateTask(id, property, value, tasks) {
//     let modifiedTasks = tasks;

//     for (let i = 0; i < modifiedTasks.length; i++) {
//         if (+modifiedTasks[i].id === +id) {
//             modifiedTasks[i][property] = value;
//         }
//     }
//     return modifiedTasks;
// }