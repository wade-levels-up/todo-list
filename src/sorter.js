export function sortTasks(property, value, tasks, displayAll) {
    if (displayAll) {
        return tasks;
    } else {
        let filteredArray = [];
        for (let task of tasks) {
            if (task[property] === value) {
                filteredArray.push(task);
            }
        }
        return filteredArray;
    }
}