// Purpose: To handle the registration of a new user

// Saves user to local storage
document.getElementById("registerButton").addEventListener("click", function () {
    let fullName = document.getElementById("fullName").value;
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let existingUsers = JSON.parse(localStorage.getItem("All Users")) || [];

    if (existingUsers.find(user => user.userName === userName)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Username already exists',
            button: 'OK'
        });
        return;
    }

    if(!fullName || !userName || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Please fill in all fields',
            button: 'OK'
        });
        return;
    }

    if (password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Password must be at least 8 characters',
            button: 'OK'
        });
        return;
    }

    if (!/[A-Z]/.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Password must contain at least one uppercase letter',
            button: 'OK'
        });
        return;
    }

    if (!/[a-z]/.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Password must contain at least one lowercase letter',
            button: 'OK'
        });
        return;
    }

    if (!/[0-9]/.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Password must contain at least one number',
            button: 'OK'
        });
        return;
    }
    

    let user = {
        fullName: fullName,
        userName: userName,
        password: password
    };

    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now login',
        button: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html";
        }
    })

    existingUsers.push(user);
    localStorage.setItem("All Users", JSON.stringify(existingUsers));
    window.location.href = "index.html";
});

document.getElementById("cancelButton").addEventListener("click", function () {
    window.location.href = "index.html";
});
