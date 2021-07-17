document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#settings");

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();

    let formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    let userOption = getCorrectJsonFile(formObject["tutorial-option"]);

    getWalkthroughJson(userOption).then((data) => {
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

const getCorrectJsonFile = function (formData) {
  let path = "../Content/";
  switch (formData) {
    case "introduction":
      return path.concat("googleTutorialContent.json");
    // ! Other options that are listed on the popup form but no File for them yet. These can change according to the url/which walkthroughs we have so far
    // case "commonkeys":
    //   return path + "googleTutorialCommonkeys.json";
    // case "searching":
    //   return path + "googleTutorialSearch.json";
    default:
      return path.concat("error.json");
  }
};
