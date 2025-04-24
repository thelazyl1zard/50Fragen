
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDFhcGY4PKea7S_-bU8K96tQanVZvNUvOQ",
  authDomain: "fragen-34667.firebaseapp.com",
  projectId: "fragen-34667",
  storageBucket: "fragen-34667.appspot.com",
  messagingSenderId: "282641191722",
  appId: "1:282641191722:web:43d7e8177bd64a24228453"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let isModerator = false;

function initGame(moderator) {
  isModerator = moderator;

  const buzzerDisplay = document.getElementById("buzzer-display");
  const scores = [0, 0, 0, 0];

  // Buzzer-Tasten
  document.addEventListener("keydown", function (e) {
    const keyMap = { a: 0, s: 1, d: 2, f: 3 };
    const key = e.key.toLowerCase();
    if (key in keyMap) {
      const player = keyMap[key];
      set(ref(db, "buzzer"), "Player " + (player + 1));
    }
  });

  // Frage laden
  if (isModerator) {
    document.getElementById("next-btn").addEventListener("click", () => {
      const q = questions[Math.floor(Math.random() * questions.length)];
      set(ref(db, "question"), q);
    });
  }

  // Realtime-Updaten
  onValue(ref(db, "scores"), (snapshot) => {
    const val = snapshot.val();
    if (val) {
      for (let i = 0; i < 4; i++) {
        document.querySelector(`#p{i + 1} span`).innerText = val[i];
      }
    }
  });

  onValue(ref(db, "buzzer"), (snapshot) => {
    const val = snapshot.val();
    if (buzzerDisplay) buzzerDisplay.innerText = val || "Niemand";
  });

  onValue(ref(db, "question"), (snapshot) => {
    const val = snapshot.val();
    const qBox = document.getElementById("question");
    if (qBox && val) qBox.innerText = val;
  });
}

function addPoint(playerNumber) {
  const scoreRef = ref(db, "scores");
  onValue(scoreRef, (snapshot) => {
    const scores = snapshot.val() || [0, 0, 0, 0];
    scores[playerNumber - 1]++;
    set(scoreRef, scores);
  }, { onlyOnce: true });
}

const questions = [
  "Was ist deine peinlichste Kindheitserinnerung?",
  "Welche Superkraft hättest du gerne?",
  "Was würdest du tun, wenn du einen Tag unsichtbar wärst?",
  "Peinlichster Moment in der Schule?",
  "Was ist dein irrationalster Angst?"
];

window.initGame = initGame;
window.addPoint = addPoint;
