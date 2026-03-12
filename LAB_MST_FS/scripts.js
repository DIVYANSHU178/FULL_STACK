let tasks = [];

const taskInput = document.getElementById("taskName");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

addBtn.addEventListener("click", addTask);

filter.addEventListener("change", function(){
    displayTasks(this.value);
});

function addTask(){

let name = taskInput.value.trim();
let priority = priorityInput.value;

if(name === ""){
    alert("Please enter a task");
    return;
}

let task = {
    name: name,
    priority: priority,
    completed: false
};

tasks.push(task);

displayTasks(filter.value || "all");

taskInput.value="";
}

function displayTasks(type = "all"){

taskList.innerHTML = "";

tasks.forEach((task,index)=>{

if(type==="completed" && !task.completed) return;
if(type==="pending" && task.completed) return;

if(type==="low" && task.priority!=="Low") return;
if(type==="medium" && task.priority!=="Medium") return;
if(type==="high" && task.priority!=="High") return;

let li = document.createElement("li");

if(task.completed){
    li.classList.add("completed");
}

li.innerHTML = `
<input type="checkbox" ${task.completed ? "checked":""} data-index="${index}" class="completeBox">
${task.name} (${task.priority})
<button data-index="${index}" class="deleteBtn">Delete</button>
`;

taskList.appendChild(li);

});

}

taskList.addEventListener("click", function(e){

if(e.target.classList.contains("deleteBtn")){
let index = e.target.dataset.index;
tasks.splice(index,1);
displayTasks(filter.value || "all");
}

if(e.target.classList.contains("completeBox")){
let index = e.target.dataset.index;
tasks[index].completed = !tasks[index].completed;
displayTasks(filter.value || "all");
}

});