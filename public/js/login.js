import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

$("form").submit((e) => {
  e.preventDefault();
  fetch(endpoints.login, {
    method: "post",
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      renderResponseAlert(res, "response");
      if (!res.error) location.href = "/dashboard/summit";
    })
    .catch(console.log);
});
