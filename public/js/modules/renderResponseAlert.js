export default function renderResponseAlert(fetchRes, targetContainerID, formItself) {
  if (fetchRes.error) {
    let message = [fetchRes.message].map((mess) => `<p class="m-0">${mess}</p>`).join("");
    let alert = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
          </button>
        </div>`;
    let alertContainer = document.getElementById(targetContainerID);
    return (alertContainer.innerHTML = alert);
  } else {
    let alert = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <p class="m-0">${fetchRes}</p>
          <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
          </button>
        </div>`;
    let alertContainer = document.getElementById(targetContainerID);
    alertContainer.innerHTML = alert;
  }

  if (formItself) formItself.reset();
}
