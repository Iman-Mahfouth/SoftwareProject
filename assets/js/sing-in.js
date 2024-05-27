// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Email and Password are required!');
        return;
    }

    // Basic validation: Check if email contains @ and password is at least 6 characters
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    alert('Form submitted successfully!');
    // Optionally, you can submit the form data to the server here
    // this.submit();
});
