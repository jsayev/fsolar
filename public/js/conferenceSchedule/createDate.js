import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { date } = e.target;

  fetch(endpoints.conferenceSchedule, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ date: date.value }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) didSuccess = true;
      renderResponseAlert(res, "response", form);
    })
    .catch(console.log);
});

$("#confScheduleModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
