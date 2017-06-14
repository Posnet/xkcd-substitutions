//Default replacements
var default_replacements = [
  //https://xkcd.com/1288/
  ['witnesses', 'these dudes I know'],
  ['witness', 'this dude I know'],
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

  // https://xkcd.com/1625/
  ['debate', 'dance-off'],
  ['debates', 'dance-offs'],
  ['self driving', 'uncontrollably swerving'],
  ['self-driving', 'uncontrollably swerving'],
  ['selfdriving', 'uncontrollably swerving'],
  ['poll', 'psychic reading'],
  ['polls', 'psychic readings'],
  ['candidate', 'airbender'],
  ['candidates', 'airbenders'],
  ['drone', 'dog'],
  ['drones', 'dogs'],
  ['vows to', 'probably won\'t'],
  ['vow to', 'probably won\'t'],
  ['at large', 'very large'],
  ['successfully', 'suddenly'],
  ['expands', 'physically expands'],
  ['expand', 'physically expand'],
  ['first-degree', 'friggin\' awful'],
  ['second-degree', 'friggin\' awful'],
  ['third-degree', 'friggin\' awful'],
  ['first degree', 'friggin\' awful'],
  ['second degree', 'friggin\' awful'],
  ['third degree', 'friggin\' awful'],
  ['an unknown number', 'like hundreds'],
  ['unknown numbers', 'like hundreds'],
  ['front runner', 'blade runner'],
  ['front runners', 'blade runners'],
  ['global', 'spherical'],
  ['years', 'minutes'],
  ['year', 'minute'],
  ['minutes', 'years'],
  ['minute', 'year'],
  ['no indication', 'lots of signs'],
  ['no indications', 'lots of signs'],
  ['urged restraint by', 'drunkenly egged on'],
  ['horsepower', 'tons of horsemeat'],

  // https://xkcd.com/1679/
  ['gaffe', 'magic spell'],
  ['gaffes', 'magic spells'],
  ['ancient', 'haunted'],
  ['star-studded', 'blood-soaked'],
  ['remains to be seen', 'will never be known'],
  ['silver bullet', 'way to kill werewolves'],
  ['silver bullets', 'ways to kill werewolves'],
  ['subway system', 'tunnels I found'],
  ['subway systems', 'tunnels I found'],
  ['surprising', 'surprising (but not to me)'],
  ['war of words', 'interplanetary war'],
  ['wars of words', 'interplanetary wars'],
  ['tension', 'sexual tension'],
  ['tensions', 'sexual tensions'],
  ['cautiously optimistic', 'delusional'],
  ['doctor who', 'the big bang theory'],
  ['win votes', 'find pok\u00E9mon'],
  ['behind the headlines', 'beyond the grave'],
  ['email', 'poem'],
  ['emails', 'poems'],
  ['facebook post', 'poem'],
  ['facebook posts', 'poems'],
  ['tweet', 'poem'],
  ['tweets', 'poems'],
  ['facebook ceo', 'this guy'],
  ['latest', 'final'],
  ['disrupt', 'destroy'],
  ['meeting', 'm\u00E9nage \u00E0 trois'],
  ['meetings', 'm\u00E9nages \u00E0 trois'],
  ['scientists', 'Channing Tatum and his friends'],
  ['scientist', 'Channing Tatum'],
  ['you won\'t believe', 'I\'m really sad about'],
  
  //https://xkcd.com/1031/
  ['keyboard', 'leopard'],
  ['keyboards', 'leopards'],

  //https://xkcd.com/1418/
  ['force', 'horse'],
  ['forces', 'horses'],
  ['forcing', 'horsing'],

  //https://xkcd.com/1004/
  ['batman', 'a man dressed like a bat'],
  
  //https://xkcd.com/1689/
  ['my cat', 'my friend Catherine'],
  ['his cat', 'his friend Catherine'],
  ['her cat', 'her friend Catherine'],
  ['their cat', 'their friend Catherine'],
  ['your cat', 'your friend Catherine'],
  
  //https://xkcd.com/1704/
  ['no man', 'Gnome Ann']
];
//Default Blacklist
var default_blacklisted_sites = [
  "docs.google.com",
  "gmail.com",
  "mail.google.com",
  "inbox.google.com",
  "mail.yahoo.com",
  "outlook.com",
  "xkcd.com",
  "github.com"
];
var default_use_font = true;

var debug = false;

function checkBlackList(url, blacklist) {
  url = url.toLowerCase() || "";
  blacklist = blacklist || [];
  for (var i = blacklist.length - 1; i >= 0; i--) {
    if (url.indexOf(blacklist[i]) > -1) {
      return false;
    }
  }
  return true;
}

function injectionScript(tabId, info, tab) {
  if (debug) {console.log("injection fire");}
  chrome.storage.sync.get(null, function (result) {
    if (result
        && result["status"] === "enabled"
        && checkBlackList(tab.url, result['blacklist'])) {
      chrome.tabs.executeScript(tabId, {
        file: "js/substitutions.js",
        runAt: "document_end"
      }, function (){
        if (debug){console.log('Script Executed');}
      });
    }
  });
}

function addMessage(request, sender, sendResponse) {
  if (debug) { console.log("message fire"); }
  chrome.storage.sync.get(null, function(result) {
    if (request === "config" && result["replacements"]) {
      sendResponse({"replacements": result["replacements"],
                    "useFont": result["useFont"],
                    "fontUrl": chrome.extension.getURL("fonts/xkcd.otf")});
    }
  });
  return true;
}

function fixDataCorruption() {
  if (debug) { console.log("updateStore"); }
  chrome.storage.sync.get(null, function(result) {
    if (!result["status"]) {
      chrome.storage.sync.set({
        "status": "enabled"
      });
    }
    if (!result["replacements"]) {
      chrome.storage.sync.set({
        "replacements": default_replacements
      });
    }
    if (!result["blacklist"]) {
      chrome.storage.sync.set({
        "blacklist": default_blacklisted_sites
      });
    }
    if (!result["useFont"]) {
      chrome.storage.sync.set({
        "useFont": default_use_font
      });
    }
  });
}

function toggleActive() {
  if (debug) { console.log("clickfire"); }
  chrome.storage.sync.get("status", function(result) {
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
}

chrome.browserAction.onClicked.addListener(toggleActive);
chrome.runtime.onMessage.addListener(addMessage);
chrome.tabs.onUpdated.addListener(injectionScript);
chrome.runtime.onInstalled.addListener(fixDataCorruption);
chrome.runtime.onStartup.addListener(fixDataCorruption);
