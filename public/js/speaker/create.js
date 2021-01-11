import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  const { fullname, photo, about, position, company, companyLogo } = e.target;

  formData.append("fullname", fullname.value);
  formData.append("speakerPhoto", photo.files[0]);
  formData.append("about", about.value);
  formData.append("position", position.value);
  formData.append("company", company.value);
  formData.append("companyLogo", companyLogo.files[0]);

  fetch(endpoints.speaker, {
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

$("#speakerModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
