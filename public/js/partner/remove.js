import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const deleteBtn = document.querySelectorAll(".delBtn");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    fetch(endpoints.partner + `/${this.dataset.targetid}`, { method: "delete" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return renderResponseAlert(res, "response");
        location.href = location.pathname;
      })
      .catch(console.log);
  });
});
