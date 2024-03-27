const baseUrl = "https://backe-end-fastpi.onrender.com/";
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

if (localStorage.getItem("Authentication")) {
  location.href = "./test.html";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!checkInputValue(usernameInput, "user-validation")) return;

  if (!checkInputValue(passwordInput, "pass-validation")) return;

  const data = {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  if (document.title.toLowerCase() === "login")
    sendUsernameAndPassword(baseUrl, data, "check-user");
  else sendUsernameAndPassword(baseUrl, data, "register");
});

async function sendUsernameAndPassword(url, data, endPoint) {
  try {
    const response = await fetch(`${url}${endPoint}`, {
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

    localStorage.setItem(
      "Authentication",
      JSON.stringify(responseData.Authentication)
    );

    location.href = "./test.html";

    // catch error
  } catch (error) {
    const apiValidationDiv = document.getElementById("api-validation");
    apiValidationDiv.innerText = error.message;
    console.log(error.message);
  }
}

function checkInputValue(input, validationDiv) {
  if (input.value.trim() === "") {
    document.getElementById(validationDiv).classList.remove("d-none");
    return false;
  } else {
    document.getElementById(validationDiv).classList.add("d-none");
    return true;
  }
}
