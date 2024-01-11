document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Send an AJAX request to your server to handle the login based on the role
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
            window.location.href = http://127.0.0.1:5501/services.html;
        } else {
            loginStatus.textContent = 'Login failed. Please check your credentials.';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        const loginStatus = document.getElementById('login-status');
        loginStatus.textContent = 'An error occurred during login. Please try again.';
    });
});
