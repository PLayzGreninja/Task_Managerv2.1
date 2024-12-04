// Purpose: To create a task list for the user to add, mark as completed, and remove tasks.
function showAllTasks() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let taskList = document.getElementById("taskList");
    let userTasks = tasks[user.userName];

    taskList.innerHTML = "";
    if (userTasks) {
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
  
}

window.onload = function() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    if (user && user.userName && user.fullName) {
        document.getElementById("userName").textContent = user.userName;
        document.getElementById("fullName").textContent = user.fullName;
    } else {
        document.getElementById("userName").textContent = "Guest";
        document.getElementById("fullName").textContent = "";
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
        if (tasks[user.userName] === undefined) {
            tasks[user.userName] = [];
        }
        tasks[user.userName].push({ task: task, timestamp: timestamp, completed: false });
        taskInput.value = "";
        showAllTasks();
    }
    localStorage.setItem("All Tasks", JSON.stringify(tasks));
}

function markTask(event) {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let userTasks = tasks[user.userName] || [];
    let taskRow = event.target.closest("tr");
    if (taskRow) {
        taskRow.classList.toggle("completed");
        let taskIndex = Array.from(taskRow.parentNode.children).indexOf(taskRow);
        if (userTasks[taskIndex]) {
            userTasks[taskIndex].completed = !userTasks[taskIndex].completed;
            tasks[user.userName] = userTasks;
            localStorage.setItem("All Tasks", JSON.stringify(tasks));
            showAllTasks();
        }
    }
}

function showIncompleteTasks() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks[user.userName].forEach(task => {   
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
    })
    Swal.fire ({
        icon: 'success',
        title: 'Tasks Shown',
        text: 'All incomplete tasks have been shown.',
        button: 'OK'
    })

}

function showCompletedTasks() {
   let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks[user.userName].forEach(task => {
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
    Swal.fire ({
        icon: 'success',
        title: 'Tasks Shown',
        text: 'All completed tasks have been shown.',
        button: 'OK'
    })
}

function removeCompletedTasks() {
    let user = JSON.parse(localStorage.getItem("Logged In User"));
    let tasks = JSON.parse(localStorage.getItem("All Tasks")) || {};
    tasks[user.userName] = tasks[user.userName].filter(task => !task.completed);
    localStorage.setItem("All Tasks", JSON.stringify(tasks));
    Swal.fire ({
        icon: 'success',
        title: 'Tasks Removed',
        text: 'All completed tasks have been removed.',
        button: 'OK'
    })
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