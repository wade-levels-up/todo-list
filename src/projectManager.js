export function addProject(projects, value){
    projects.push(value);
}


// Refactor later, function misleading, returns index from array;
export function removeProject(value, projects){
    let projectArr = projects;
    for (let i = 0; i < projectArr.length; i++) {
        if (projectArr[i] === value) {
            return i;
        }
    }
}