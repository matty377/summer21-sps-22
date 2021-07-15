chrome.runtime.onMessage.addListener((request) => {
  let user_option = request.form_data;
  console.log(user_option);
  console.log(request.walkthrough);

  const box = document.createElement("section");
  box.id = "main-walkthrough-box";
  box.style.backgroundColor = "white";
  box.style.border = "black 2px solid";
  box.style.position = "absolute";
  box.style.top = "0px";
  box.style.padding = "2%";

  const text = `
    <h2>Title of walthrough</h2>
    <p>The text of this walkthough<p>
    <div style="display: flex; justify-content: space-between">
      <button style="border: black 2px solid; border-radius: 25px; with: 100%" onclick=""> back </button>
      <button style="border: black 2px solid; border-radius: 25px; with: 100%" onclick=""> forward </button>
    </div>
  `;

  box.innerHTML = text;

  document.querySelector("body").appendChild(box);
  console.log(box);
});
