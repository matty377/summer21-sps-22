document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#settings");

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();

    let formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const formJson = JSON.stringify(formObject);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let { hostname } = new URL(tabs[0].url);

      chrome.tabs.sendMessage(tabs[0].id, {
        url: hostname,
        form_data: formJson,
      });
    });
  });
});
