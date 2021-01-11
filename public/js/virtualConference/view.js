import endpoints from "/js/modules/endpoints.js";

const viewBtn = document.querySelectorAll(".viewBtn");

viewBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    fetch(endpoints.virtualConference + `/get/${this.dataset.targetid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return console.log(res);
        
        const modalHeader = document.querySelector("#viewModal .modal-title");
        const modalBody = document.querySelector("#viewModal .modal-body");

        modalHeader.innerHTML = `Title: ${res.title}`;
        modalBody.innerHTML = `
        <h6>Date: ${res.date}</h6>
        <h6>Time: ${res.time}</h6>
        <h6>Description:</h6>
        <p>${res.description}</p>
        <h6>Picture:</h6>
        <img style="width:100%" src="/uploads/virtualConference/${res.pictureFilename}"/>`;
      })
      .catch(console.log);
  });
});
