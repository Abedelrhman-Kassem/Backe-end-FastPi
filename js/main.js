import { getScore } from "js/main-api.js";

async function fetchScore() {
  try {
    const auth_token = JSON.parse(localStorage.getItem("Authentication"));
    const score = await getScore(auth_token);

    console.log(score);

    if (
      typeof score.score !== "number" ||
      !localStorage.getItem("Authentication")
    ) {
      location.href = "view/login.html";
    }
  } catch (error) {
    console.error("Error fetching score:", error);
    // location.href = "/view/test.html";
  }
}
fetchScore();
