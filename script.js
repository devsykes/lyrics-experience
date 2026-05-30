const introOverlay = document.getElementById("intro-overlay");
const startBtn = document.getElementById("start-btn");
const audioPlayer = document.getElementById("audio-player");
const mainPlayPauseBtn = document.getElementById("main-play-pause");
const playPauseIcon = mainPlayPauseBtn.querySelector("i");
const lyricsContainer = document.getElementById("lyrics-container");
const progressBar = document.getElementById("progress-bar");

// Keep track of the currently displayed lyric line to prevent flickering
let currentActiveLine = null;

// Timestamps and lyrics data layout
const lyrics = [
  { time: 0.0, text: "♪" },
  { time: 7.6, text: "I got my sanity" },
  { time: 9.4, text: "It's only me and nobody" },
  { time: 11.5, text: "I know you're mad at me" },
  { time: 13.4, text: "I don't know what to say" },
  { time: 15.3, text: "I got my sanity" },
  { time: 17.0, text: "It's only me and nobody" },
  { time: 19.0, text: "I got my sanity" },
  { time: 21.0, text: "♪" },
  { time: 36.9, text: "Guess I've been numbing myself" },
  { time: 39.8, text: "A little too much" },
  { time: 42.0, text: "And thinking it helps" },
  { time: 43.8, text: "But now that my mind is finally clear" },
  { time: 47.4, text: "I'm letting you slide" },
  { time: 52.3, text: "No distortion now" },
  { time: 56.3, text: "(I know you're not listenin', so)" },
  { time: 59.7, text: "I keep talking to myself, to myself, to myself" },
  { time: 67.5, text: "I got my sanity" },
  { time: 69.2, text: "It's only me and nobody" },
  { time: 71.2, text: "I know you're mad at me" },
  { time: 72.9, text: "I don't know what to say" },
  { time: 75.0, text: "I got my sanity" },
  { time: 76.8, text: "It's only me and nobody" },
  { time: 78.6, text: "If you're not listening" },
  { time: 80.5, text: "Then I keep talking" },
  { time: 81.5, text: "To myself, to myself, to myself" },
  { time: 85.9, text: "I got my sanity" },
  { time: 87.8, text: "My sanity" },
  { time: 88.9, text: "To myself, to myself, to myself" },
  { time: 93.5, text: "I got my sanity" },
  { time: 95.3, text: "My sanity" },
  { time: 96.9, text: "Finally sane" },
  { time: 99.5, text: "now I got myself out the way" },
  { time: 103.1, text: "Even what is left of my brain" },
  { time: 106.9, text: "time I got is mine" },
  { time: 111.8, text: "No distortion now" },
  { time: 115.7, text: "(I know you're not listenin', so)" },
  { time: 119.3, text: "I keep talking to myself, to myself, to myself" },
  { time: 127.0, text: "I got my sanity" },
  { time: 128.7, text: "It's only me and nobody" },
  { time: 130.6, text: "I know you're mad at me" },
  { time: 132.4, text: "I don't know what to say" },
  { time: 134.4, text: "I got my sanity" },
  { time: 136.1, text: "It's only me and nobody" },
  { time: 138.0, text: "If you're not listening" },
  { time: 140.0, text: "Then I keep talking" },
  { time: 141.1, text: "To myself, to myself, to myself" },
  { time: 145.4, text: "I got my sanity" },
  { time: 146.9, text: "My sanity" },
  { time: 148.4, text: "To myself, to myself, to myself" },
  { time: 152.8, text: "I got my sanity" },
  { time: 154.8, text: "" },
];

startBtn.addEventListener("click", () => {
  startExperience();
});

mainPlayPauseBtn.addEventListener("click", () => {
  togglePlayPause();
});

// Update slider and lyrics as audio plays
audioPlayer.addEventListener("timeupdate", () => {
  updateProgress();
  updateLyrics();
});

// Sync audio track metadata to set slider max limit
audioPlayer.addEventListener("loadedmetadata", () => {
  progressBar.max = audioPlayer.duration;
});

// Seek audio when user moves the slider
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

// Track finished event updates the button to a replay icon
audioPlayer.addEventListener("ended", () => {
  playPauseIcon.className = "fa-solid fa-rotate-right";
});

function startExperience() {
  audioPlayer.play().catch((error) => {
    console.log("Audio playback failed or was blocked: ", error);
  });
  introOverlay.classList.add("hidden");
}

function togglePlayPause() {
  if (
    audioPlayer.currentTime === audioPlayer.duration ||
    playPauseIcon.classList.contains("fa-rotate-right")
  ) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    playPauseIcon.className = "fa-solid fa-pause";
    return;
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseIcon.className = "fa-solid fa-pause";
  } else {
    audioPlayer.pause();
    playPauseIcon.className = "fa-solid fa-play";
    // 🛠️ TEMPORAL DEV TRICK: Prints the exact second when you hit pause
    console.log("Paused at second:", audioPlayer.currentTime.toFixed(1));
  }
}

function updateProgress() {
  progressBar.value = audioPlayer.currentTime;
}

function updateLyrics() {
  const currentTime = audioPlayer.currentTime;

  const currentLine = lyrics.find((line, index) => {
    const nextLine = lyrics[index + 1];
    return (
      currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
    );
  });

  // CRITICAL: Only update DOM if the active lyric line has actually changed to prevent flickering
  if (currentLine) {
    if (currentActiveLine !== currentLine) {
      currentActiveLine = currentLine;
      lyricsContainer.innerHTML = `<p class="active-lyric">${currentLine.text}</p>`;
    }
  } else {
    currentActiveLine = null;
    lyricsContainer.innerHTML = "";
  }
}
