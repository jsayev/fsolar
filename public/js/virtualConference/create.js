import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  const { title, description, date, time, picture } = e.target;

  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("date", date.value);
  formData.append("time", time.value);
  formData.append("virtualConferenceBg", picture.files[0]);

  fetch(endpoints.virtualConference, {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) didSuccess = true;
      renderResponseAlert(res, "response", form);
    })
    .catch(console.log);
});

$("#virtualConfModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
