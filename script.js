let timer;
let timeLimit = 50;
let currentScore = 0;
let questionCounter = 0;
const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
const scoreCard = JSON.parse(localStorage.getItem("score")) || [];
const cardList = ["rule-card", "quiz-card", "highscore-card", "quizend-card"];

const quizTimer = document.querySelector(".timer");
const quizQuestion = document.querySelector(".quiz-question");
const optionWrapper = document.querySelector(".option-wrapper");
const answerStatus = document.querySelector(".answer-status");
const finalScore = document.querySelector(".final-score");
let initials = document.querySelector("#name-input");
const leaderboardTable = document.querySelector(".leaderboard-table");

document.querySelector(".btn-startQuiz").addEventListener("click", () => {
  toggleCardVisiblity("quiz-card");
  setQuiz();
  timer = setInterval(() => {
    timeLimit--;
    if (timeLimit == 0) endQuiz();
    document.querySelector(".timer").innerHTML = `${timeLimit}s`;
  }, 1000);
});

function setQuiz() {
  if (questionCounter < questions.length) {
    // set quiz question
    quizQuestion.innerHTML = questions[questionCounter].questionText;
    // set quiz answer options
    let option = questions[questionCounter].options
      .map(
        (item) =>
          `<p class="option" onclick="checkAnswer('${item}')">${item}</p>`
      )
      .join("");
    optionWrapper.innerHTML = option;
  } else {
    endQuiz();
  }
}

function checkAnswer(answer) {
  // selecting the answer status
  if (questions[questionCounter].answer === answer) {
    answerStatus.innerHTML = "Correct";
    answerStatus.classList.remove("hide");
    currentScore += 5;
    setTimeout(() => {
      answerStatus.classList.add("hide");
      questionCounter++;
      setQuiz();
    }, 700);
  } else {
    answerStatus.innerHTML = "Incorrect";
    answerStatus.classList.remove("hide");
    timeLimit -= 10;
    setTimeout(() => {
      answerStatus.classList.add("hide");
      questionCounter++;
      setQuiz();
    }, 700);
  }
}

function endQuiz() {
  toggleCardVisiblity("quizend-card");
  finalScore.innerHTML = `Your final score is ${currentScore}`;
  clearInterval(timer);
  quizTimer.innerHTML = "00s";
}

function setScore() {
  scoreCard.push({ initials: initials.value, score: currentScore });
  localStorage.setItem("score", JSON.stringify(scoreCard));
  showHighscoreTable();
}

function showHighscoreTable() {
  toggleCardVisiblity("highscore-card");
  const leaderboard = JSON.parse(localStorage.getItem("score"));
  const scoreHTML = leaderboard
    .map((item) => `<li>${item.initials} - ${item.score}</li>`)
    .join("");
  leaderboardTable.innerHTML = scoreHTML;
}

function toggleCardVisiblity(cardId) {
  cardList.forEach((card) => {
    if (card === cardId)
      document.querySelector(`.${cardId}`).classList.remove("hide");
    else document.querySelector(`.${card}`).classList.add("hide");
  });
}
