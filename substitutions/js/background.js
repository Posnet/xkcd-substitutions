chrome.tabs.onUpdated.addListener(function(tabId, info) {
     if (info.status === "complete") {
          status = chrome.storage.sync.get(null, function(result) {
               if (result["status"] === "enabled") {
                    chrome.tabs.executeScript(null, {
                         file: "js/substitutions.js"
                    });
               }
          });
     }
});

chrome.runtime.onStartup.addListener(function() {
     chrome.storage.sync.get("status", function(result) {
          if (result["status"] === null) {
               chrome.storage.sync.set({
                    "status": "enabled"
               });
          }
     });
});

chrome.runtime.onInstalled.addListener(function() {
     chrome.storage.sync.set({
          "status": "enabled"
     });
});

chrome.browserAction.onClicked.addListener(function() {
     status = chrome.storage.sync.get("status", function(result) {
          if (result["status"] === null) {
               status = "enabled";
          } else {
               status = result["status"];
          }
          if (status === "enabled") {
               icon = {
                    "path": "images/disabled.png"
               };
               message = {
                    "title": "click to enabled xkcd substitutions"
               };
               status = "disabled";
          } else if (status === "disabled") {
               icon = {
                    "path": "images/enabled.png"
               };
               message = {
                    "title": "click to disabled xkcd substitutions"
               };
               status = "enabled";
          }
          chrome.browserAction.setIcon(icon);
          chrome.browserAction.setTitle(message);
          chrome.storage.sync.set({
               "status": status
          });
     });
});
