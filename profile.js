// Simulated data fetch from backend
const fetchProfileData = () => {
    return {
        name: "John Doe",
        email: "johndoe@example.com",
        role: "Student",
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const profileData = fetchProfileData();

    // Populate profile data
    document.getElementById("profileName").textContent = profileData.name;
    document.getElementById("profileEmail").textContent = profileData.email;
    document.getElementById("profileRole").textContent = profileData.role;

    // Add event listeners for profile actions
    document.getElementById("editProfile").addEventListener("click", () => {
        alert("Edit Profile functionality coming soon!");
    });

    document.getElementById("changePassword").addEventListener("click", () => {
        alert("Change Password functionality coming soon!");
    });
});
