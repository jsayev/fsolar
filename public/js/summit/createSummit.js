import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const form = document.querySelector("form");
const addBtn = document.getElementById("addBtn");
let fieldCounter = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  for (const elem of e.target) {
    if (elem.name.includes("file") && elem.files[0]) {
      formData.append("summitBgFiles", elem.files[0]);
    } else if (elem.name) {
      formData.append(`${elem.name}`, elem.value);
    }
  }

  fetch(endpoints.summit, {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) return renderResponseAlert(res, "response");
      location.href = "/dashboard/summits";
    })
    .catch(console.log);
});

addBtn.addEventListener("click", function () {
  let number = fieldCounter++;
  let name = `file_${number}`;

  let newFormGroup = document.createElement("div");
  newFormGroup.className = "form-group";

  const newField = `
  <label for="${name}"><span style="color:red">*</span>Background:</label>
  <input type="file" class="form-control" id="${name}" name="${name}" required>
  <button type="button" class="btn btn-sm btn-danger float-right mt-1" data-removeBtn="${name}_btn">Remove</button>
  `;
  newFormGroup.innerHTML = newField;
  form.insertBefore(newFormGroup, this);

  let btn = document.querySelector(`button[data-removeBtn="${name}_btn"]`);

  btn.addEventListener("click", function () {
    form.removeChild(newFormGroup);
  });
});
