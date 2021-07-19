chrome.runtime.onMessage.addListener((request) => {
  let walkthrough_data = request.walkthrough_data;
  console.log(walkthrough_data);

  const box = createWalkthroughContainer(walkthrough_data.google);
  document.querySelector("body").appendChild(box);
  console.log(box);

  const updatePopup = function(title, content) {
    let heading = document.querySelector(".wt-title")
    let body = document.querySelector(".wt-body");


    heading.innerText = title;
    body.innerText = content;
  }


  const forwardBtn = document.querySelector(".forward")
  let currentStep = 0;
  let contentStep = 0;
  let data = walkthrough_data.google.steps[currentStep];
  forwardBtn.addEventListener("click", function() {
  
    // check if we have any tutorial steps
    if(!data) {   
      console.log("End of tutorial");
      updatePopup("End of tutorial", "Have a nice day!")
    } else {
      
      // if only 1 substep exists, display the data and move on to the next tutorial step on button click
      // otherwise, traverse through substeps on button click
      if(data.content.length === 1) {
        updatePopup(data.title, data.content[0].text);
        contentStep = 0;
        currentStep++;
      } else if(data.content.length > 1 && data.content[contentStep]) {  
        updatePopup(data.title, data.content[contentStep].text);
        contentStep++;
      }

      // if at the end of the substeps, on button click move on to the next tutorial step.
      if(!data.content[contentStep]) {
        contentStep = 0;
        currentStep++;
      }

      // update our data
      data = walkthrough_data.google.steps[currentStep];

    } 
  })
});

const createWalkthroughContainer = function (data) {
  const box = document.createElement("section");
  styleWalkthroughContainer(box);

  const text = `
    <div id="wt-card">
      <h2 class="wt-title">${data.title}</h2>
      <p class="wt-body">${data.description}</p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <button class="wt-btn" onclick=""> back </button>
      <button class="wt-btn forward" onclick=""> forward </button>
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
  box.style.minWidth = "350px";
  box.style.maxWidth = "350px";
};
