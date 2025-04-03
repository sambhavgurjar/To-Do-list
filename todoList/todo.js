//access html element

let addBtn = document.getElementById("add-task-btn");
let addTask = document.getElementById("add-task");
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");
let deleteBtn = document.getElementsByClassName("delete-task");
let editBtn = document.getElementsByClassName("edit-task");
let editBtn2 = document.getElementById("edit");
let userName = document.getElementById("username");
let logout = document.getElementById("log-out");

//get username from url

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
userName.innerText = username;

//check for user authentication(signIn or not)
function checkSignin(username) {
  let logged = JSON.parse(localStorage.getItem("logins"));
  let logArr = [...logged];
  if (logArr[0] != username && logArr.length!=1) {
    alert("first log-in");
    window.location.href = "../login/login.html";
  }
}
checkSignin(username);



let taskArr;

//show task data of login user (through local storage)

function showTask() {
  let userTask = JSON.parse(localStorage.getItem("usertask"));
  if (userTask != null) {
    taskArr = [...userTask];
    let matchUser = taskArr.filter((data) => {
      return data.user == username;
    });
    if (matchUser.length > 0) {
      let idx = matchUser[0]["task"].forEach((tasks) => {
        //creating element
        let taskCon = document.createElement("div");
        let oldTask = document.createElement("div");
        let taskHeading = document.createElement("h2");
        let deleteBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        //set value or text content of element
        taskHeading.innerHTML = tasks;
        deleteBtn.innerHTML = "DELETE TASK";
        editBtn.innerHTML = "EDIT TASK";

        //set className of element
        taskCon.className = "task-con";
        oldTask.className = "old-task";
        taskHeading.className = "task-heading";
        deleteBtn.classList.add("delete-task");
        editBtn.classList.add("edit-task");

        //insert element
        taskList.append(taskCon);
        taskCon.append(oldTask);
        oldTask.append(taskHeading);
        oldTask.append(editBtn);
        oldTask.append(deleteBtn);
      });
    }
  }
}
showTask();


//add task in local storage

function addTasks(task) {
  let userTask = JSON.parse(localStorage.getItem("usertask"));
  userTask ? (taskArr = [...userTask]) : (taskArr = []);
  let matchUser = taskArr.filter((data) => {
    return data.user == username;
  });
  console.log(matchUser);
  if (matchUser.length > 0) {
    matchUser[0]["task"].push(task);
    let updatedArry = taskArr.filter((data) => {
      return data["user"] != username;
    });
    updatedArry.push(matchUser[0]);
    localStorage.setItem("usertask", JSON.stringify(updatedArry));
  } else {
    taskArr.push({
      user: username,
      task: [task],
    });
    localStorage.setItem("usertask", JSON.stringify(taskArr));
  }
}

//delete task from local storage

function deleteTasks(task) {
  let userTask = JSON.parse(localStorage.getItem("usertask"));
  taskArr = [...userTask];
  let matchUser = taskArr.filter((data) => {
    return data.user == username;
  });
  if (matchUser.length > 0) {
    let idx = matchUser[0]["task"].indexOf(task);
    matchUser[0]["task"].splice(idx, 1);
    let updatedArry = taskArr.filter((data) => {
      return data["user"] != username;
    });
    updatedArry.push(matchUser[0]);
    localStorage.setItem("usertask", JSON.stringify(updatedArry));
  }
}

//update task in local storage

function updateTasks(oldtask, newtask) {
  let userTask = JSON.parse(localStorage.getItem("usertask"));
  taskArr = [...userTask];
  let matchUser = taskArr.filter((data) => {
    return data.user == username;
  });
  if (matchUser.length > 0) {
    let idx = matchUser[0]["task"].indexOf(oldtask);
    matchUser[0]["task"].splice(idx, 1, newtask);
    let updatedArry = taskArr.filter((data) => {
      return data["user"] != username;
    });
    updatedArry.push(matchUser[0]);
    localStorage.setItem("usertask", JSON.stringify(updatedArry));
  }
}
let clickEditBtn = true;



// add task function

function handleAddTaskBtn() {
  let task = taskInput.value;
  if (task.trim().length > 0) {

    //call addTask function
    addTasks(taskInput.value);

    window.location.reload();

    taskInput.value = "";
  }
}

//edit task function

function handleEditTaskBtn(evt) {
  let target = evt.target;
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

      //create input ,edit and cancel btn and insert
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
  }
}

//edit content function

function handleEditcontentBtn(evt) {
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
      //call updateTask function(local storage)
      updateTasks(oldTask.value, editInput.value);
      clickEditBtn = true;
      newTask.remove();
    }
  }
}

//cancel button function

function handleCancelBtn(evt) {
  let targetBtn = evt.target;
  if (targetBtn.id == "cancel") {
    let newTask = targetBtn.parentElement;
    newTask.remove();
    clickEditBtn = true;
  }
}

//delete button function

function handleDeleteBtn(evt) {
  let target = evt.target;
  if (target.className == "delete-task") {
    if (clickEditBtn == true) {
      let parent = target.parentElement;
      let gparent = target.parentElement.parentElement;
      let task = parent.children[1].innerText;
      gparent.remove();
      //call deleteTask fn(local storage)
      deleteTasks(task);
      clickEditBtn = true;
    }
  }
}

//logging -out operation

logout.addEventListener("click", () => {
  let logged = JSON.parse(localStorage.getItem("logins"));
  if (logged != null) {
    let logArr = [...logged];
    let idx = logArr.indexOf(username);
    logArr.splice(idx, 1);
    localStorage.setItem("logins", JSON.stringify(logArr));
    console.log("log out");
    window.location.href = "../index.html";
  }
});

//add new task event
addBtn.addEventListener("click", handleAddTaskBtn);

//edit task event
taskList.addEventListener("click", handleEditTaskBtn);

//update content event

taskList.addEventListener("click", handleEditcontentBtn);

//cancel edit task

taskList.addEventListener("click", handleCancelBtn);

//delete task event

taskList.addEventListener("click", handleDeleteBtn);
