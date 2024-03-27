import { getScore } from "/Frontend/js/main-api.js";

const baseUrl = "http://127.0.0.1:8000/";
const auth_token = JSON.parse(localStorage.getItem("Authentication"));
let questionNum = 0;
let questionsCount;
let score = 0;

if (!localStorage.getItem("Authentication")) {
  location.href = "login.html";
}

async function fetchScore() {
  try {
    const score = await getScore(auth_token);
    console.log(score);
    if (typeof score.score === "number") {
      location.href = "/Frontend/";
    }
  } catch (error) {
    console.error("Error fetching score:", error);
  }
}
fetchScore();

const startQuizBtn = document.getElementById("start-quiz");
const submitBtn = document.getElementById("submit");

startQuizBtn.addEventListener("click", () => {
  document.querySelector(".introduction").classList.add("d-none");
  document.querySelector(".app").classList.remove("d-none");

  fetchOneQuestion(baseUrl, ++questionNum);
});

submitBtn.addEventListener("click", async () => {
  resetStyles();

  if (questionsCount > questionNum) {
    fetchOneQuestion(baseUrl, ++questionNum);
  } else {
    const data = { score, auth_token };

    await submitScore(baseUrl, data);
    localStorage.setItem("score", score);
    location.href = "/Frontend";
  }
});

async function fetchOneQuestion(url, questionId) {
  try {
    const response = await fetch(`${url}question/${questionId}`);

    if (!response.ok) {
      const res = await response.text();
      const errorMessage = JSON.parse(res).detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    putDataOnScreen(responseData);
  } catch (error) {
    console.log(error.message);
  }
}

function putDataOnScreen(data) {
  let answeredYet = false;

  submitBtn.classList.add("pointer-none");

  const questionDiv = document.getElementById("question");
  questionDiv.innerText = `${questionNum} - ${data[0].question}`;

  const optionDivs = document.querySelectorAll(".option");

  optionDivs.forEach((option, index) => {
    const answerOption = data[0].options[`option_${index + 1}`];
    option.innerText = answerOption;

    option.addEventListener("click", () => {
      if (answeredYet) {
        return;
      }

      const answer = data[0].answer;

      if (answer === answerOption) {
        option.classList.remove("bg-white");
        option.classList.add("bg-success");
        score++;
      } else {
        option.classList.remove("bg-white");
        option.classList.add("bg-danger");

        const correctAnswerOption = Array.from(optionDivs).find(
          (opt) => opt.innerText === answer
        );
        correctAnswerOption.classList.remove("bg-white");
        correctAnswerOption.classList.add("bg-success");
      }

      answeredYet = true;
      submitBtn.classList.remove("pointer-none");

      questionsCount = data[1].questions_count;
    });
  });
}

function resetStyles() {
  const lastRightAnswer = document.querySelector(".option.bg-success");
  if (lastRightAnswer) {
    lastRightAnswer.classList.add("bg-white");
    lastRightAnswer.classList.remove("bg-success");
  }

  const lastWrongAnswer = document.querySelector(".option.bg-danger");
  if (lastWrongAnswer) {
    lastWrongAnswer.classList.add("bg-white");
    lastWrongAnswer.classList.remove("bg-danger");
  }
}

async function submitScore(url, data) {
  try {
    const response = await fetch(`${url}score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.text();
      const errorMessage = JSON.parse(res).detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
}
