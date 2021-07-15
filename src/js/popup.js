const form = document.querySelector("#settings");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let { hostname } = new URL(tabs[0].url);

    console.log("In popup console: ", hostname);

    chrome.tabs.sendMessage(tabs[0].id, { url: hostname });
  });
});
