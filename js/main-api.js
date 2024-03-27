export async function getScore(auth_token) {
  try {
    const response = await fetch(
      `https://backe-end-fastpi.onrender.com/get-score?auth_token=${auth_token}`
    );

    if (!response.ok) {
      const res = await response.text();
      const errorMessage = JSON.parse(res).detail;
      localStorage.clear();
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error.message);
    location.href = "view/login.html";
  }
}
