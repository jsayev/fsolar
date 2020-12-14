// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let input = document.querySelector('input[name="eagenda"]');
//   if (input.files[0]) {
//     let data = new FormData();
//     data.append("eagenda", input.files[0]);
//     data.append("summitID", 1);

//     fetch("http://localhost/event-agenda", {
//       method: "post",
//       body: data,
//       headers: {
//         auth: "Astartes",
//       },
//     })
//       .then((res) => res.json())
//       .then(console.log)
//       .catch(console.log);
//   }
// });
