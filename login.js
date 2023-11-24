// JavaScript for handling login functionality

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Send an AJAX request to your server to handle the login based on the role
    // You will need to implement server-side logic for authentication

    //Example AJAX request:
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password, role }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const loginStatus = document.getElementById('login-status');
        if (data.success) {
            loginStatus.textContent = 'Login successful. Redirecting...';
            // Redirect to the appropriate dashboard based on the role
            window.location.href = data.redirectURL;
        } else {
            loginStatus.textContent = 'Login failed. Please check your credentials.';
        }
    });
});
