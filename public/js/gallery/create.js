import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  const { day, picture } = e.target;

  formData.append("day", day.value);
  formData.append("galleryPicture", picture.files[0]);

  fetch(endpoints.gallery, {
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

$("#galleryModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
