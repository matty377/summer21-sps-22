chrome.runtime.onMessage.addListener((request) => {
  let walkthrough_data = request.walkthrough_data;

  const box = createWalkthroughContainer(walkthrough_data);

  document.querySelector("body").appendChild(box);
  console.log(box);
});

const createWalkthroughContainer = function () {
  const box = document.createElement("section");
  styleWalkthroughContainer(box);

  const text = `
    <div id="wt-card">
      <h2>Title of walthrough</h2>
      <p>The text of this walkthough</p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <button class="wt-btn" onclick=""> back </button>
      <button class="wt-btn" onclick=""> forward </button>
    </div>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

    // Walkthrough card CSS
    #wt-card {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    #wt-card>h2 {
      font-weight: 400;
    }

    #wt-card p {
      font-size: 14px;
    }

    .wt-btn {
      background-color: #06d6a0;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border: #06d6a0 1px solid;
      color: #1e1e1e;
      margin: 12px auto;
      padding: 10px 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    </style>
  `;

  box.innerHTML = text;
  return box;
};

const styleWalkthroughContainer = function (box) {
  box.id = "main-walkthrough-box";
  box.style.position = "absolute";
  box.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
  box.style.backgroundColor = "white";
  box.style.top = "0px";
  box.style.padding = "1%";
};
