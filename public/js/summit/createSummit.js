import endpoints from "/js/modules/endpoints.js";

const form = document.querySelector("form");
const addBtn = document.getElementById("addBtn");
let fieldCounter = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();

  for (const elem of e.target) {
    if (elem.type != "submit") {
      // console.log(elem.name);
      formData.append(elem.name, elem.value);
    }
  }

  fetch(endpoints.summit, {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then(console.log);
});

addBtn.addEventListener("click", function () {
  let number = fieldCounter++;
  let name = `file_${number}`;

  let newFormGroup = document.createElement("div");
  newFormGroup.className = "form-group";

  const newField = `
  <label for="${name}">Background:</label>
  <input type="file" class="form-control" id="${name}" name="${name}">
  <button type="button" class="btn btn-sm btn-danger float-right mt-1" data-removeBtn="${name}_btn">Remove</button>
  `;
  newFormGroup.innerHTML = newField;
  form.insertBefore(newFormGroup, this);

  let btn = document.querySelector(`button[data-removeBtn="${name}_btn"]`);

  btn.addEventListener("click", function () {
    form.removeChild(newFormGroup);
  });
});
