import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function () {
  fetch(`${endpoints.agenda}/${this.dataset.targetagenda}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) return renderResponseAlert(res, "response");
      location.href = "/dashboard/eventagenda";
    })
    .catch(console.log);
});
