import { getScore } from "/Frontend/js/main-api.js";

const asideLinks = document.querySelectorAll(".aside-button");
const asideSections = document.querySelectorAll(".aside-section");
const contentContainer = document.querySelector(".content");
const activitiesContainer = document.querySelector(".activities");

const summaryGuidance = document.querySelectorAll(".summary-guidance");
const detailedGuidance = document.querySelectorAll(".detailed-guidance");

async function fetchScore() {
  try {
    const auth_token = JSON.parse(localStorage.getItem("Authentication"));
    const score = await getScore(auth_token);

    if (score.score >= 12)
      summaryGuidance.forEach((div) => div.classList.remove("d-none"));
    else detailedGuidance.forEach((div) => div.classList.remove("d-none"));
  } catch (error) {
    console.error("Error fetching score:", error);
  }
}

fetchScore();

asideLinks.forEach((link) => {
  const dataLink = location.href.split("#")[1];

  if (dataLink) {
    if (dataLink.includes("activity")) {
      ShowContentOrAcitvity(
        activitiesContainer,
        contentContainer,
        "d-none",
        "d-none"
      );
    } else {
      ShowContentOrAcitvity(
        contentContainer,
        activitiesContainer,
        "d-none",
        "d-none"
      );
    }
  }

  const blockSection = document.querySelector(
    `section[data-link="${dataLink}"]`
  );

  if (blockSection) blockSection.classList.remove("d-none");
  else document.querySelector(".aside-section").classList.remove("d-none");

  link.addEventListener("click", function () {
    if (this.closest(".accordion-activities")) {
      ShowContentOrAcitvity(
        activitiesContainer,
        contentContainer,
        "d-none",
        "d-none"
      );
    } else {
      ShowContentOrAcitvity(
        contentContainer,
        activitiesContainer,
        "d-none",
        "d-none"
      );
    }

    asideSections.forEach((section) => {
      if (!section.classList.contains("d-none")) {
        section.classList.add("d-none");
      }
    });

    const dataLink = link.dataset.link;

    const blockSection = document.querySelector(
      `section[data-link="${dataLink}"]`
    );
    blockSection.classList.remove("d-none");
  });
});

function ShowContentOrAcitvity(showenDiv, hiddenDiv, addedClass, removedClass) {
  showenDiv.classList.remove(removedClass);
  hiddenDiv.classList.add(addedClass);
}

function checkRegex(sqlQueryInput, rightRegex) {
  sqlQueryInput.addEventListener("input", function () {
    const regex = rightRegex;

    if (regex.test(this.value.trim())) {
      ShowContentOrAcitvity(sqlQueryInput, sqlQueryInput, "right", "wrong");
    } else {
      ShowContentOrAcitvity(sqlQueryInput, sqlQueryInput, "wrong", "right");
    }
  });
}

const sqlQueryInput_1 = document.getElementById("sql-query-input-regex-1");
checkRegex(sqlQueryInput_1, /^select\s+\*\s+from\s+(users|`users`)\s*;?$/i);

const sqlQueryInput_2 = document.getElementById("sql-query-input-regex-2");
checkRegex(
  sqlQueryInput_2,
  /^select\s+((user_id|`user_id`)\s*,\s*(email|`email`)|\((user_id|`user_id`)\s*,\s+(email|`email`)\))\s+from\s+(users|`users`)\s*;?$/i
);

const sqlQueryInput_3 = document.getElementById("sql-query-input-regex-3");
checkRegex(
  sqlQueryInput_3,
  /^select\s+(user_id|`user_id`)\s+as\s+"user number"\s+from\s+(users|`users`)\s*;?$/i
);

const sqlQueryInput_4 = document.getElementById("sql-query-input-regex-4");
checkRegex(
  sqlQueryInput_4,
  /^select\s+(salary|`salary`)\s*\*\s*12\s+as\s+(sal|`sal`|"sal")\s+from\s+(emp|`emp`)\s*;?$/i
);

const sqlQueryInput_5 = document.getElementById("sql-query-input-regex-5");
checkRegex(
  sqlQueryInput_5,
  /^select\s+distinct\s+(name|`name`)\s+from\s+(users|`users`)\s*;?$/i
);
