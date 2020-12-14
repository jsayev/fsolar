import endpoint from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

$("#register").submit(function (e) {
  e.preventDefault();
  fetch(endpoint.register, {
    method: "post",
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
      repassword: e.target.repassword.value,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      renderResponseAlert(res, "response", this);
    })
    .catch(console.log);
});
