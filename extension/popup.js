// Basic communication between popup and content script

document.getElementById('analyze').onclick = function() {
  // Send a message to the active tab
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {type: 'RUN_DETECTION'});
  });
};
