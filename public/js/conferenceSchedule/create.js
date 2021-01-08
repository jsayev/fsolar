import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

const addBtn = document.getElementById("addBtn");

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
