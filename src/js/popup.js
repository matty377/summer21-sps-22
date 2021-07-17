document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#settings");

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();

    let formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    getWalkthroughJson("../Content/googleTutorialContent.json").then((data) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let { hostname } = new URL(tabs[0].url);

        chrome.tabs.sendMessage(tabs[0].id, {
          url: hostname,
          walkthrough_data: data,
        });
      });
    });
  });
});

const getWalkthroughJson = async function (path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (err) {
    const response = await fetch("../Content/error.json");
    const data = await response.json();
    return data;
  }
};
