import endpoints from "/js/modules/endpoints.js";
import renderResponseAlert from "/js/modules/renderResponseAlert.js";

let dateBtns = document.querySelectorAll(".dateBtn[data-targetdateid]");
const timesContainer = document.getElementById("scheduleTimes");
const addTimesBtnContainer = document.getElementById("addTimeBtnsContainer");

dateBtns.forEach((btn) => {
  btn.onclick = function () {
    this.classList.replace("btn-outline-primary", "btn-primary");

    dateBtns.forEach((btn) => {
      if (btn != this) {
        btn.classList.replace("btn-primary", "btn-outline-primary");
      }
    });

    // add time modals
    const addBreakTimeModal = `<button type="button" class="btn btn-success mt-3" data-toggle="modal" data-target="#addBreakModal">
    + new break
    </button>

    <div class="modal fade" id="addBreakModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New break time</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="breakResponse"></div>
            <form id="breakForm" data-targetdateid="${btn.dataset.targetdateid}">
                <div class="form-group">
                    <label for="breakTime"><span style="color:red">*</span>Time:</label>
                    <input type="time" class="form-control" id="breakTime" name="time" required>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="breakForm" class="btn btn-success">Add</button>
          </div>
        </div>
      </div>
    </div>`;

    const addPresentationModal = `<button type="button" class="btn btn-success mt-3" data-toggle="modal" data-target="#addPresentationModal">
    + new presentation
    </button>
  
    <div class="modal fade" id="addPresentationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New presentation time</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div id="presentationResponse"></div>
          <form id="presentationForm" data-targetdateid=${btn.dataset.targetdateid}>
            <div class="form-group">
              <label for="presentationTime"><span style="color:red">*</span>Time:</label>
              <input type="time" class="form-control" id="presentationTime" name="time" required>
            </div>
            <div class="form-group">
                <label for="title"><span style="color:red">*</span>Title:</label>
                <input type="text" class="form-control" id="title" name="title" required>
            </div>
            <div class="form-group">
              <label for="speakerIds"><span style="color:red">*</span>Speaker:</label>
              <select class="form-control" id="speakerIds" name="speaker">
                  <option value="{{id}}">{{name}}</option>
              </select>
            </div>
          </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="presentationForm" class="btn btn-success">Add</button>
          </div>
        </div>
      </div>
    </div>`;

    addTimesBtnContainer.innerHTML = `${addBreakTimeModal}${addPresentationModal}`;
    const breakForm = document.getElementById("breakForm");
    const presentationForm = document.getElementById("presentationForm");
    let didPresentationSucceed = false,
      didBreakSucceed = false;

    breakForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const { time } = e.target;

      fetch(`${endpoints.conferenceSchedule}/${this.dataset.targetdateid}/break`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ time: time.value }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            didBreakSucceed = true;
            return renderResponseAlert(res, "breakResponse", this);
          }
          renderResponseAlert(res, "breakResponse");
        })
        .catch(console.log);
    });

    presentationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const { time, title, speaker } = e.target;

      fetch(`${endpoints.conferenceSchedule}/${this.dataset.targetdateid}/presentation`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ time: time.value, title: title.value, speaker: speaker.value }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            didPresentationSucceed = true;
            return renderResponseAlert(res, "presentationResponse", this);
          }
          renderResponseAlert(res, "presentationResponse");
        })
        .catch(console.log);
    });

    const presentatinoBtn = document.querySelector(`button[data-target="#addPresentationModal"]`);

    presentatinoBtn.onclick = function () {
      console.log(`clicked`);
      // finish this fetch speakers id and fullnamesa and put in speakers sslect options

    };

    $("#addBreakModal").on("hidden.bs.modal", function () {
      // notworking dataset
      if (didBreakSucceed) getTimesAndRender(this.dataset.targetdateid);
      didBreakSucceed = false;
    });

    $("#addPresentationModal").on("hidden.bs.modal", function () {
      // notworking dataset
      if (didPresentationSucceed) getTimesAndRender(this.dataset.targetdateid);
      didPresentationSucceed = false;
    });
    // add time modals end

    getTimesAndRender(this.dataset.targetdateid);
  };
});

function getTimesAndRender(dateid) {
  fetch(`${endpoints.conferenceSchedule}/date/${dateid}`)
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

      timesContainer.innerHTML = `<h2 class="text-center my-3">Times</h2>${result}`;

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
}
