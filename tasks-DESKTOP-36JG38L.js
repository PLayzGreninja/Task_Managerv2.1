// Function for adding tasks, marking tasks as completed, showing all tasks, showing incomplete tasks, showing completed tasks, removing completed tasks, and logout button
function showAllTasks() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let taskList = document.getElementById("taskList");
    let userTasks = tasks[user.fullName] || [];
    taskList.innerHTML = "";
    for (let i = 0; i < userTasks.length; i++) {
        let tr = document.createElement("tr");

        let taskTd = document.createElement("td");
        taskTd.textContent = userTasks[i].task;
        tr.appendChild(taskTd);

        let timestampTd = document.createElement("td");
        timestampTd.textContent = userTasks[i].timestamp;
        tr.appendChild(timestampTd);

        let completedTd = document.createElement("td");
        let button = document.createElement("button");
        button.textContent = userTasks[i].completed ? "Completed" : "Not Completed";
        button.addEventListener("click", function(event) {
            markTask(event);
        });
        completedTd.appendChild(button);
        tr.appendChild(completedTd);

        taskList.appendChild(tr);
    }
}

window.onload = function () {
    // let tasks = JSON.parse(localStorage.getItem("tasks"));
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    if (user && user.fullName) {
        document.getElementById("userName").textContent = user.fullName;
    } else {
        document.getElementById("userName").textContent = "Guest";
    }
    showAllTasks();
}

function addTask() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value;
    if (task !== "") {
        let timestamp = new Date().toLocaleString();
        if (tasks[user.fullName] === undefined) {
            tasks[user.fullName] = [];
        }
        tasks[user.fullName].push({ task: task, timestamp: timestamp, completed: false });
        taskInput.value = "";
        showAllTasks();
        localStorage.setItem("All Tasks", JSON.stringify(tasks)); // add user to save to local storage
    }
}

function markTask(event) {
    let taskRow = event.target.closest("tr");
    if (taskRow) {
        taskRow.classList.toggle("completed");
        let taskIndex = Array.from(taskRow.parentNode.children).indexOf(taskRow);
        let user = JSON.parse(localStorage.getItem("Logged In User"));
        let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
        let userTasks = tasks[user.fullName] || [];
        userTasks[taskIndex].completed = !userTasks[taskIndex].completed;
        tasks[user.fullName] = userTasks;
        localStorage.setItem("All Tasks", JSON.stringify(tasks));
    }
}

function showIncompleteTasks() {
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let userTasks = tasks[user.fullName] || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    userTasks.forEach(task => {
        if (!task.completed) {
            let tr = document.createElement("tr");
            let taskTd = document.createElement("td");
            taskTd.textContent = task.task;
            tr.appendChild(taskTd);
            let timestampTd = document.createElement("td");
            timestampTd.textContent = task.timestamp;
            tr.appendChild(timestampTd);
            let completedTd = document.createElement("td");
            let button = document.createElement("button");
            button.textContent = "Not Completed";
            button.addEventListener("click", function(event) {
                markTask(event);
            });
            completedTd.appendChild(button);
            tr.appendChild(completedTd);
            taskList.appendChild(tr);
        }
    });
    let tr = taskList.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        if (tr[i].classList.contains("Not Completed")) {
            tr[i].style.display = "none";
        } else {
            tr[i].style.display = "";
        }   
    }
}

function showCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("All Tasks"));
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let userTasks = tasks[user.fullName] || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    userTasks.forEach(task => {
        if (task.completed) {
            let tr = document.createElement("tr");
            let taskTd = document.createElement("td");
            taskTd.textContent = task.task;
            tr.appendChild(taskTd);
            let timestampTd = document.createElement("td");
            timestampTd.textContent = task.timestamp;
            tr.appendChild(timestampTd);
            let completedTd = document.createElement("td");
            let button = document.createElement("button");
            button.textContent = "Completed";
            button.addEventListener("click", function(event) {
                markTask(event);
            });
            completedTd.appendChild(button);
            tr.appendChild(completedTd);
            taskList.appendChild(tr);
        }
    })

    let tr = taskList.getElementsByTagName("tr");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")) {
            tasks[i].style.display = "";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

function removeCompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let userTasks = tasks[user.fullName] || [];
    let incompleteTasks = userTasks.filter(task => !task.completed);
    tasks[user.fullName] = incompleteTasks;
    localStorage.setItem("All Tasks", JSON.stringify(tasks));
    showAllTasks();
}


// Function to logout and redirect to index.html
function logoutButton() {
    window.location.href = "index.html";
}

document.getElementById("logoutButton").addEventListener("click", logoutButton);
document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("incompleteTaskButton").addEventListener("click", showIncompleteTasks);
document.getElementById("removeTaskButton").addEventListener("click", removeCompletedTasks);
document.getElementById("allTaskButton").addEventListener("click", showAllTasks);
document.getElementById("completedTaskButton").addEventListener("click", showCompletedTasks);