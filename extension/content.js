// Listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RUN_DETECTION') {
    runDetection();
  }
});

// Simple detection stub: highlight all text
function runDetection() {
  const bodyText = document.body.innerText || '';
  if (bodyText.length === 0) return;

  // Remove existing highlights if any
  document.querySelectorAll('.ai-highlight').forEach(el => {
    el.classList.remove('ai-highlight');
  });

  // Highlight paragraphs: simple demonstration
  const paragraphs = document.body.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.classList.add('ai-highlight');
  });
}
