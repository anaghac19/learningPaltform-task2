// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("token"); // Clear the token

    // Redirect to login after a delay
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000); // 2-second delay
});
