import { getScore } from "/Frontend/js/main-api.js";

async function fetchScore() {
  try {
    const auth_token = JSON.parse(localStorage.getItem("Authentication"));
    const score = await getScore(auth_token);

    console.log(score);

    if (
      typeof score.score !== "number" ||
      !localStorage.getItem("Authentication")
    ) {
      location.href = "/Frontend/view/login.html";
    }
  } catch (error) {
    console.error("Error fetching score:", error);
    // location.href = "/Frontend/view/test.html";
  }
}
fetchScore();
