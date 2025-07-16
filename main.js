
// login and go to tasks
function loginButton() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let allUsers = JSON.parse(localStorage.getItem("All Users"));
    let user = allUsers.find(user => user.userName === username && user.password === password);

    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password',
            button: 'OK'
        });
        return;
    }

    localStorage.setItem("Logged In User", JSON.stringify(user));
    window.location.href = "tasks.html";
}

// register and go to registration
function registerButton() {
    window.location.href = "registration.html";
}

document.getElementById("loginButton").addEventListener("click", loginButton);
document.getElementById("registerButton").addEventListener("click", registerButton);
