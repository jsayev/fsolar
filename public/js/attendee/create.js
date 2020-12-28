import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("title", e.target.title.value);
  formData.append("attendeeLogo", e.target.logo.files[0]);

  fetch(endpoints.attendee, {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      renderResponseAlert(res, "response", form);
    })
    .catch(console.log);
});

$("#attendeeModal").on("hidden.bs.modal", function () {
  location.href = "/dashboard/attendees";
});
