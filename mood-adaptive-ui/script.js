const moods = {
  happy: {
    gradient: "linear-gradient(135deg,#f6d365,#fda085)",
    message: "You're glowing today 🌞",
    sound: "happy"
  },
  sad: {
    gradient: "linear-gradient(135deg,#232526,#414345)",
    message: "Quiet moments heal 🌙",
    sound: "sad"
  },
  stressed: {
    gradient: "linear-gradient(135deg,#ff512f,#dd2476)",
    message: "Pause. Breathe 🔥",
    sound: "stressed"
  },
  focused: {
    gradient: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    message: "Deep focus 🎯",
    sound: "focused"
  }
};

let currentAudio = null;

function playSound(mood) {
  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(`sounds/${mood}.mp3`);
  currentAudio.loop = true;
  currentAudio.volume = 0.4;
  currentAudio.play();
}

function setMood(mood) {
  document.documentElement.style.setProperty(
    "--bg-gradient",
    moods[mood].gradient
  );
  document.getElementById("message").innerText = moods[mood].message;
  playSound(mood);
}

/* Auto mood by time */
(function autoMoodByTime() {
  const hour = new Date().getHours();
  if (hour < 12) setMood("happy");
  else if (hour < 18) setMood("focused");
  else setMood("sad");
})();

/* Typing speed detection */
let lastTime = 0;
let speeds = [];

document.getElementById("moodInput").addEventListener("keydown", () => {
  const now = Date.now();
  if (lastTime) speeds.push(now - lastTime);
  lastTime = now;

  if (speeds.length > 8) {
    const avg = speeds.reduce((a,b)=>a+b)/speeds.length;
    if (avg < 120) setMood("stressed");
    else if (avg < 250) setMood("happy");
    else setMood("sad");
    speeds = [];
  }
});
