import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const deleteBtn = document.querySelectorAll(".removeDateBtn");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    fetch(endpoints.conferenceSchedule + `/date/${this.dataset.targetdateid}`, { method: "delete" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return renderResponseAlert(res, "dateResponse");
        location.href = location.pathname;
      })
      .catch(console.log);
  });
});
