export function addProject(projects, value){

}

export function removeProject(value, projects){
    let projectArr = projects;
    for (let i = 0; i < projectArr.length; i++) {
        if (projectArr[i] === value) {
            projectArr.splice(i, 1);
        }
    }
    return projectArr;
}