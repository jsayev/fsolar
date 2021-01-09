import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

let dateBtns = document.querySelectorAll("button[data-targetSchedule]");
const timesContainer = document.getElementById("scheduleTimes");

dateBtns.forEach((btn) => {
  btn.onclick = function () {
    this.classList.replace("btn-outline-primary", "btn-primary");

    dateBtns.forEach((btn) => {
      if (btn != this) {
        btn.classList.replace("btn-primary", "btn-outline-primary");
      }
    });

    fetch(`${endpoints.conferenceSchedule}/${btn.dataset.targetschedule}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return renderResponseAlert(res, "dateResponse");
        }

        if (res.length === 0) return (timesContainer.innerHTML = `<p class="text-center">No conference times for this date yet.</p>`);

        let rows = res
          .map(
            (st, index) => `<tr>
            <th scope="row">${index + 1}</th>
            <td>${st.time}</td>
            <td>${st.presentationName ? st.presentationName : "-----"}</td>
            <td>${st.speakername ? st.speakername : "-----"}</td>
            <td>${st.isBreak ? "Yes" : "No"}</td>
            <td><button class="btn btn-danger" data-targetid=${st.id}>Delete</button></td>
            </tr>`
          )
          .join("");

        let result = `
        <table class="table table-hover">
        <thead class="bg-light">
            <tr>
                <th scope="col">No</th>
                <th scope="col">Time</th>
                <th scope="col">Presentation</th>
                <th scope="col">Speaker</th>
                <th scope="col">is Break time</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
        </table>`;

        timesContainer.innerHTML = `<h2 class="text-center mb-3">Times</h2>${result}`;

        let delBtns = document.querySelectorAll("button[data-targetid]");

        delBtns.forEach((btn) => {
          btn.onclick = function () {
            fetch(`${endpoints.conferenceSchedule}/time/${btn.dataset.targetid}`, { method: `delete` })
              .then((res) => res.json())
              .then((res) => {
                if (res.error) return renderResponseAlert(res, "timeResponse");
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
              })
              .catch(console.log);
          };
        });
      })
      .catch(console.log);
  };
});
