import { Todo } from "./todoClass"
import { saveData, tasks as taskList } from "./index.js";
import { renderTasks } from "./render";

export function createTask(title, project, desc, icon, dueDate, priority, checklist, id) {
    return new Todo(title, project, desc, icon, dueDate, priority, checklist, id);
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