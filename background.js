chrome.commands.onCommand.addListener((command) => {
  if (command === "open-yt-history") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url: "https://www.youtube.com/feed/history" });
      }
    });
  }
});
