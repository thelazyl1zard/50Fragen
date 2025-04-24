
const questions = [
  "Was ist deine peinlichste Kindheitserinnerung?",
  "Welche Superkraft hättest du gerne?",
  "Was würdest du tun, wenn du einen Tag unsichtbar wärst?",
  "Peinlichster Moment in der Schule?",
  "Was ist dein irrationalster Angst?"
];

let current = 0;
let scores = [0, 0, 0, 0];
let isModerator = false;

function initGame(moderator) {
  isModerator = moderator;

  document.addEventListener("keydown", function (e) {
    let buzzerText = document.getElementById("buzzer-display");
    switch (e.key.toLowerCase()) {
      case "a":
        buzzerText.innerText = "Player 1!";
        break;
      case "s":
        buzzerText.innerText = "Player 2!";
        break;
      case "d":
        buzzerText.innerText = "Player 3!";
        break;
      case "f":
        buzzerText.innerText = "Player 4!";
        break;
    }
  });

  updateScores();
}

function nextQuestion() {
  if (!isModerator) return;

  if (current < questions.length) {
    document.getElementById("question").innerText = questions[current];
    current++;
  } else {
    document.getElementById("question").innerText = "Das waren alle Fragen!";
  }
}

function addPoint(playerNumber) {
  if (!isModerator) return;

  scores[playerNumber - 1]++;
  updateScores();
}

function updateScores() {
  for (let i = 1; i <= 4; i++) {
    const playerEl = document.querySelector(`#p${i} span`);
    if (playerEl) {
      playerEl.innerText = scores[i - 1];
    }
  }
}
