// Load dashboard data and validate user session
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in. Redirecting to login page...");
        window.location.href = "login.html";
        return;
    }

    const fetchDashboardData = () => {
        return {
            courses: ["Math 101", "Science 102", "History 103"],
            progress: 75, // Example progress percentage
        };
    };

    const data = fetchDashboardData();

    document.getElementById("coursesList").innerHTML = data.courses
        .map((course) => `<li>${course}</li>`)
        .join("");

    document.getElementById("progressBar").style.width = `${data.progress}%`;
    document.getElementById("progressText").textContent = `${data.progress}% Completed`;
});
