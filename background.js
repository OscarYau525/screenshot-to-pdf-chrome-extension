let counter = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender);
    chrome.tabs.captureVisibleTab(sender.tab.windowId, {}, function (dataUrl) {
      sendResponse({
        imgSrc: dataUrl,
      });
    });
  
    return true;
  });