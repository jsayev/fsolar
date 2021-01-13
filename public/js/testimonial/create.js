import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
let didSuccess = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { speaker, impression, videoLink } = e.target;

  fetch(endpoints.testimonial, {
    method: "post",
    body: JSON.stringify({ impression: impression.value, speaker: speaker.value, videoLink: videoLink.value }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) didSuccess = true;
      renderResponseAlert(res, "response", form);
    })
    .catch(console.log);
});

$("#testimonialModal").on("hidden.bs.modal", function () {
  if (didSuccess) location.href = location.pathname;
});
