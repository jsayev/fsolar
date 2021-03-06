import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("title", e.target.title.value);
  formData.append("type", e.target.type.value);
  formData.append("sponsorLogo", e.target.logo.files[0]);

  fetch(endpoints.sponsor, {
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

$("#sponsorModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
