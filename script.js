let addBtn = document.getElementById("add-task-btn");
let addTask = document.getElementById("add-task");
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");
let deleteBtn = document.getElementsByClassName("delete-task");
let editBtn = document.getElementsByClassName("edit-task");
let editBtn2 = document.getElementById("edit");

let clickEditBtn = true;

// add task function

function handleAddTaskBtn() {
  let task = taskInput.value;
  if (task.trim().length > 0) {
    //creating element
    let taskCon = document.createElement("div");
    let oldTask = document.createElement("div");
    let taskHeading = document.createElement("h2");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    //set value or text content of element
    taskHeading.innerHTML = task;
    deleteBtn.innerHTML = "DELETE TASK";
    editBtn.innerHTML = "EDIT TASK";

    //set class of element
    taskCon.className = "task-con";
    oldTask.className = "old-task";
    // newTask.className="new-task"
    taskHeading.className = "task-heading";
    deleteBtn.classList.add("delete-task");
    editBtn.classList.add("edit-task");

    //insert element
    taskList.append(taskCon);
    taskCon.append(oldTask);
    // taskCon.append(newTask);
    oldTask.append(taskHeading);
    oldTask.append(editBtn);
    oldTask.append(deleteBtn);
  }
}

//edit task function

function handleEditTaskBtn(evt){ let target = evt.target;
    if (target.className == "edit-task") {
      //target parent ele of edit-btn and get old task content
      if (clickEditBtn) {
        let oldTask = target.parentElement;
        let targetContent = oldTask.children[0];
        let oldContent = targetContent.innerText;
  
        //target grand parent ele ,create newTask div and insert
  
        let gpEle = oldTask.parentElement;
        let newTask = document.createElement("div");
        newTask.className = "new-task";
        gpEle.append(newTask);
  
        //create    input edit and cancel btn and insert
        let editInput = document.createElement("input");
        let editBtn2 = document.createElement("button");
        let cancelBtn = document.createElement("button");
        editBtn2.innerHTML = "EDIT";
        editBtn2.className = "edit";
        editBtn2.id = "edit";
        cancelBtn.innerHTML = "CANCEL";
        cancelBtn.className = "cancel";
        cancelBtn.id = "cancel";
        editInput.className = "new-input";
        editInput.value = oldContent;
        newTask.append(editInput);
        newTask.append(editBtn2);
        newTask.append(cancelBtn);
        clickEditBtn = false;
      }
    }}

//edit content function

function handleEditcontentBtn(evt){
    let targetBtn = evt.target;
    if (targetBtn.id == "edit") {
      let newTask = targetBtn.parentElement;
      let taskCon = newTask.parentElement;
      let editInput = newTask.children[0];
      let oldTask = taskCon.children[0];
      let taskHeading = oldTask.children[0];
      if (editInput.value.length < 1) {
        alert("enter some content");
      } else {
        taskHeading.innerText = editInput.value;
        clickEditBtn = true;
        newTask.remove();
      }
    }
}

//cancel button function

function handleCancelBtn(evt){
    let targetBtn = evt.target;
    if (targetBtn.id == "cancel") {
      let newTask = targetBtn.parentElement;
      newTask.remove();
      clickEditBtn = true;
    }
}

//delete button function

function handleDeleteBtn(evt){
    let target = evt.target;
  if (target.className == "delete-task") {
    if (clickEditBtn == true) {
      let parent = target.parentElement.parentElement;
      console.log(parent);
      parent.remove();
      clickEditBtn = true;
    }
  }
}

//add new task event
addBtn.addEventListener("click", handleAddTaskBtn);

//edit task event
taskList.addEventListener("click",handleEditTaskBtn);


//edit-new content adding

taskList.addEventListener("click", handleEditcontentBtn);

//cancel edit task

taskList.addEventListener("click", handleCancelBtn);

//delete task event

taskList.addEventListener("click", handleDeleteBtn);