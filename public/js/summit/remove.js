import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function () {
  fetch(endpoints.summit, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) return renderResponseAlert(res, "actionResponse");
      location.href = "/dashboard/summit";
    })
    .catch(console.log);
});
