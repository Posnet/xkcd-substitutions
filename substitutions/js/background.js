//Default replacements
var replacements = [
    ['keyboard', 'leopard'],
    ['keyboards', 'leopards'],
    ['force', 'horse'],
    ['forces', 'horses'],
    ['witness', 'this dude I know'],
    ['witnesses', 'these dudes I know'],
    ['allegedly', 'kinda probably'],
    ['new study', 'tumblr post'],
    ['rebuild', 'avenge'],
    ['space', 'spaaaaaace'],
    ['google glass', 'virtual boy'],
    ['smartphone', 'pok\u00E9dex'],
    ['senator', 'elf-lord'],
    ['senators', 'elf-lords'],
    ['electric', 'atomic'],
    ['car', 'cat'],
    ['cars', 'cats'],
    ['election', 'eating contest'],
    ['elections', 'eating contests'],
    ['congressional leaders', 'river spirits'],
    ['homeland security', 'homestar runner'],
    ['could not be reached for comment', 'is guilty and everyone knows it'],
    ['force', 'horse'],
];
//Default Blacklist
var blacklisted_sites = ["docs.google.com",
    "gmail.com",
    "mail.gooogle.com",
    "mail.yahoo.com",
    "outlook.com"
]


chrome.tabs.onUpdated.addListener(function(tabId, info) {
        status = chrome.storage.sync.get(null, function(result) {
            if (result["status"] === "enabled") {
                chrome.tabs.executeScript(tabId, {
                    file: "js/substitutions.js",
                    runAt: "document_end"
                });
            }
        });
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
                "title": "click to enable xkcd substitutions"
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
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "config") sendResponse(replacements);
});