// script.js
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('All fields are required!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    alert('Form submitted successfully!');
    // Optionally, you can submit the form data to the server here

    // Uncomment the line below to actually submit the form
    // this.submit();
});
