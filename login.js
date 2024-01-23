function validateForm() {
    var eamil = document.getElementById('eamil').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    // Simple validation, checking if fields are not empty
    if (username.trim() === '' || password.trim() === '' || role.trim() === '') {
      alert('All fields must be filled out');
      return false; // Prevent form submission
    }

    // Additional validation logic can be added here

    return true; // Allow form submission
  }