import endpoints from "/js/modules/endpoints.js";

const viewBtn = document.querySelectorAll(".viewBtn");

viewBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    fetch(endpoints.testimonial + `/get/${this.dataset.targetid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return console.log(res);

        const modalHeader = document.querySelector("#viewModal .modal-title");
        const modalBody = document.querySelector("#viewModal .modal-body");

        modalHeader.innerHTML = `Speaker: ${res.fullname}`;
        modalBody.innerHTML = `<p style="word-break:break-all">${res.impression}</p><a class="d-block" href="${res.videoLink}" target="_blank">${res.videoLink}</a>`;
      })
      .catch(console.log);
  });
});
