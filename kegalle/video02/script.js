// 🔐 One-time password system
const oneTimePasswords = ["123456", "23456","photon123"]; // Add your custom passwords here
const usedKeyPrefix = "usedOTP_";
const redirectURL = "https://example.com"; // Change to your redirect URL

const video = document.getElementById("secureVideo");
const videoContainer = document.getElementById("videoContainer");
const passwordPrompt = document.getElementById("passwordPrompt");
const playPauseBtn = document.getElementById("playPause");
const progressFill = document.getElementById("progressFill");
const currentTimeDisplay = document.getElementById("currentTime");
const progressBar = document.getElementById("progressBar");

// ⛔ Block reused passwords
oneTimePasswords.forEach(p => {
    if (localStorage.getItem(usedKeyPrefix + p)) {
        document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:20%'>This code has already been used.</h2>";
        throw new Error("Access denied.");
    }
});

// ✅ Verify password
function verifyPassword() {
    const entered = document.getElementById("password").value;
    if (oneTimePasswords.includes(entered)) {
        localStorage.setItem(usedKeyPrefix + entered, "true");
        openFullscreen().then(() => {
            passwordPrompt.style.display = "none";
            videoContainer.style.display = "block";
            video.muted = false;
            video.play();
        });
    } else {
        alert("Incorrect password.");
    }
}

// 🖥 Fullscreen
function openFullscreen() {
    if (videoContainer.requestFullscreen) {
        return videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        return videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        return videoContainer.msRequestFullscreen();
    }
}

// 🕵️ Hide video if not in fullscreen
function checkFullScreenVisibility() {
    if (!document.fullscreenElement) {
        video.pause();
        videoContainer.style.display = "none";
    } else {
        videoContainer.style.display = "block";
        video.play();
    }
}

document.addEventListener("fullscreenchange", checkFullScreenVisibility);
document.addEventListener("webkitfullscreenchange", checkFullScreenVisibility);
document.addEventListener("mozfullscreenchange", checkFullScreenVisibility);

// 🔚 Redirect after end
function exitHandler() {
    document.exitFullscreen?.();
    window.location.href = redirectURL;
}

// 🕵️‍♂️ DevTools detection
let devtoolsOpen = false;
const element = new Image();
Object.defineProperty(element, 'id', {
    get: function () {
        devtoolsOpen = true;
        throw new Error("DevTools detected");
    }
});

function detectDevToolsLoop() {
    setInterval(() => {
        devtoolsOpen = false;
        console.dir(element);
        if (devtoolsOpen || isDevToolsOpen()) {
            window.location.replace(redirectURL);
        }
    }, 1000);
}

function isDevToolsOpen() {
    const threshold = 160;
    return window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
}

detectDevToolsLoop();

// ⛔ Dev shortcuts block
document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        window.location.href = redirectURL;
    }
});

// 🎮 Play/pause toggle
playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "Pause";
    } else {
        video.pause();
        playPauseBtn.textContent = "Play";
    }
});

// ⏳ Live progress + current time
video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFill.style.width = percent + "%";

    const mins = Math.floor(video.currentTime / 60);
    const secs = Math.floor(video.currentTime % 60).toString().padStart(2, "0");
    currentTimeDisplay.textContent = `${mins}:${secs}`;
});

// 🟢 Enable seek on progress bar
progressBar.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / rect.width;
    video.currentTime = percent * video.duration;
});

// Dynamically adding video source after password verification
const videoSource = "https://tglinkxxx.anshuman.eu.org/4621/2025+AL+Vapour+%26+Hydrometry+I+04+-+04.mkv?hash=231dae"; // Replace with your secure video URL
video.innerHTML = `<source src="${videoSource}" type="video/mp4">`;

