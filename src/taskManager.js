import { Todo } from "./todoClass"

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
    let ID = prompt('Id to delete?:'); // replace this with param id later
    for (let i = 0; i < tasks.length; i++) {
        if (+tasks[i].id === +ID) {
            return i;
        }
    }
}

export function updateTask(id, property, value, tasks) {
    let modifiedTasks = tasks;

    for (let i = 0; i < modifiedTasks.length; i++) {
        if (+modifiedTasks[i].id === +id) {
            modifiedTasks[i][property] = value;
        }
    }
    return modifiedTasks;
}