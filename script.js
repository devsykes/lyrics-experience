// 1. DOM ELEMENTS

const introOverlay = document.getElementById("intro-overlay");
const startBtn = document.getElementById("start-btn");
const audioPlayer = document.getElementById("audio-player");

// 2. EVENT LISTENERS

startBtn.addEventListener("click", () => {
  startExperience();
});

// 3. FUNCTIONS

function startExperience() {
  // Music starts playing
  audioPlayer.play().catch((error) => {
    console.log("Audio playback failed or was blocked: ", error);
  });

  // B) fade-out
  introOverlay.classList.add("hidden");
}

// 4. FUTURE TASKS
// TODO: Create the logic to synchronize lyrics with audio timeline
// TODO: Setup the main play/pause button toggle functionality
