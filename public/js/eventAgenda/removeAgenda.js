import endpoints from "/js/modules/endpoints.js";

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function () {
  fetch(`${endpoints.agenda}/${this.dataset.targetagenda}`, {
    method: "delete",
  })
    .then((res) => {
      console.log(res);
      location.href = "/dashboard/eventagenda";
    })
    .catch(console.log);
});
