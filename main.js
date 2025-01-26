// Video progress tracking
function trackVideoProgress(videoPlayer, progressBar, progressText, progressKey) {
    videoPlayer.addEventListener("timeupdate", function () {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
        saveProgress(progress, progressKey);
    });
}

function saveProgress(progress, key) {
    localStorage.setItem(key, JSON.stringify({ progress }));
}

function loadProgress(progressKey, progressBar, progressText) {
    const savedProgress = JSON.parse(localStorage.getItem(progressKey));
    if (savedProgress && savedProgress.progress) {
        progressBar.value = savedProgress.progress;
        progressText.textContent = `${Math.round(savedProgress.progress)}%`;
    }
}

// Handle quiz answers
let quizCompleted = [false, false, false];

function submitAnswer(quizNumber, option) {
    if (quizCompleted[quizNumber - 1]) {
        alert("You have already completed this quiz!");
        return;
    }

    if (quizNumber === 1 && option === 'A') {
        alert("Correct! HTML defines the structure of web pages.");
    } else if (quizNumber === 2 && option === 'A') {
        alert("Correct! CSS stands for Cascading Style Sheets.");
    } else if (quizNumber === 3 && option === 'C') {
        alert("Correct! 'All of the above' is the right answer.");
    } else {
        alert("Incorrect. Try again!");
    }

    // Mark quiz as completed
    quizCompleted[quizNumber - 1] = true;
    document.getElementById(`quizStatus${quizNumber}`).textContent = "Completed";
    localStorage.setItem(`quizCompleted${quizNumber}`, 'true');
}

// Load video and quiz progress
window.onload = function () {
    loadProgress('videoProgress1', document.getElementById("videoProgress1"), document.getElementById("videoProgressText1"));
    loadProgress('videoProgress2', document.getElementById("videoProgress2"), document.getElementById("videoProgressText2"));
    loadProgress('videoProgress3', document.getElementById("videoProgress3"), document.getElementById("videoProgressText3"));
};
