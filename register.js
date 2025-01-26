// Registration form validation and submission
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Simple validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Simulated API call
            const response = await fakeApiCall({
                fullName,
                email,
                password,
            });

            if (response.success) {
                alert("Registration successful! Redirecting to login...");
                window.location.href = "login.html"; // Redirect to login
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again later.");
        }
    });

    // Simulated API call
    const fakeApiCall = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Registered user data:", data);
                resolve({ success: true });
            }, 1000);
        });
    };
});
