import endpoint from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

$("#changePasswordForm").submit(function (e) {
  e.preventDefault();
  fetch(endpoint.password, {
    method: "put",
    body: JSON.stringify({
      password: e.target.password.value.trim(),
      repassword: e.target.repassword.value.trim(),
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      renderResponseAlert(res, "changePasswordResponse", this);
    })
    .catch(console.log);
});
