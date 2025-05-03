// Get DOM elements
const countdownInput = document.getElementById("datetime-picker");
const startBtn = document.getElementById("start-btn");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const message = document.getElementById("message");

let countdownInterval; // to store interval ID

startBtn.addEventListener("click", () => {
  clearInterval(countdownInterval); // clear old countdown if any
  message.style.display = "none";   // hide message

  const targetDate = new Date(countdownInput.value);
  if (isNaN(targetDate.getTime())) {
    alert("⛔ Please select a valid date and time.");
    return;
  }

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate.getTime() - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      showCongrats();
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    daysEl.innerText = String(days).padStart(2, "0");
    hoursEl.innerText = String(hours).padStart(2, "0");
    minutesEl.innerText = String(minutes).padStart(2, "0");
    secondsEl.innerText = String(seconds).padStart(2, "0");
  }, 1000);
});

function showCongrats() {
  daysEl.innerText = "00";
  hoursEl.innerText = "00";
  minutesEl.innerText = "00";
  secondsEl.innerText = "00";

  message.style.display = "none";

  // Confetti effect 🎉
  confetti({
    particleCount: 1000,
    spread: 360,
    origin: { y: 0.6 },
  });
}
