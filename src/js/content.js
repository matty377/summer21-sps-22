chrome.runtime.onMessage.addListener((request) => {
    console.log(`Domain for the current Tab: ${request.url}`);
    alert(`Domain for the current Tab: ${request.url}`);
});
