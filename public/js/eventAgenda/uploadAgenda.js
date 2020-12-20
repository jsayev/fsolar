import endpoints from "/js/modules/endpoints.js";

const form = document.querySelector("form");
const input = document.querySelector('input[name="eagenda"]');
const label = document.querySelector(`label[for="agendaFile"]`);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.files[0]) {
    let data = new FormData();
    data.append("eagenda", input.files[0]);

    fetch(endpoints.agenda, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        location.href = "/dashboard/eventagenda";
      })
      .catch(console.log);
  }
});

input.addEventListener("change", function () {
  label.innerHTML = this.files[0].name;
});
