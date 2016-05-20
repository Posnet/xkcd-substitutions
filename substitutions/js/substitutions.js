// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
chrome.runtime.sendMessage("config", function(response) {
  "use strict";

  // Taken from http://stackoverflow.com/questions/17264639/replace-text-but-keep-case
  function matchCase(text, pattern) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      var p = pattern.charCodeAt(i);
      if (p >= 65 && p < 65 + 26) {
        result += c.toUpperCase();
      } else {
        result += c.toLowerCase();
      }
    }
    return result;
  }

  // Taken from Google's Closure library, goog.string.regExpEscape
  function regExpEscape(s) {
    return String(s)
        .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1')
        .replace(/\x08/g, '\\x08');
  }

  // Inject the stylesheet.
  if (response.useFont) {
    var stylesheet = document.createElement('style');
    stylesheet.setAttribute('type', 'text/css');
    stylesheet.textContent =
      '@font-face {' +
      '  font-family: xkcdSubstitutionsFont;' +
      '  src: url("' + response.fontUrl + '") format("opentype");' +
      '}' +
      '.xkcdSubstitutionsExtensionSubbed {' +
      '  font-family: xkcdSubstitutionsFont !important;' +
      '}';
    document.head.appendChild(stylesheet);
  }

  // Compute the objects we'll need for each node.
  var replacements = response.replacements;
  var originalsRegexpSegments = replacements.map(function (replacement) {
    return regExpEscape(replacement[0]);
  });
  var originalsRegexp = new RegExp("\\b(" +
                                   originalsRegexpSegments.join("|") +
                                   ")\\b", "gi");
  var replacementsMap = {};
  for (var i = replacements.length - 1; i >= 0; i--) {
    replacementsMap[replacements[i][0].toLowerCase()] = replacements[i][1];
  }
  var ignore = {
    "STYLE": 0,
    "SCRIPT": 0,
    "NOSCRIPT": 0,
    "IFRAME": 0,
    "OBJECT": 0,
    "INPUT": 0,
    "FORM": 0,
    "TEXTAREA": 0
  };

  function substitute(node) {
    "use strict";
    var replacementIdx;
    var splitIdx;
    var parent = node.parentElement;
    if (parent) {
      if (parent.tagName in ignore) {
        return;
      }
      var cls = parent.getAttribute("class");
      if (cls && cls.indexOf("xkcdSubstitutionsExtensionSubbed") != -1) {
        return;
      }
    }
    if (!node.nodeValue.match(originalsRegexp)) {
      return;
    }
    var splits = node.nodeValue.split(originalsRegexp);
    var docFrag = document.createDocumentFragment();
    for (splitIdx = 0; splitIdx < splits.length; splitIdx++) {
      var splitString = splits[splitIdx];
      var splitStringLower = splitString.toLowerCase();
      var newNode;
      if (splitStringLower in replacementsMap) {
        newNode = document.createElement("span");
        newNode.setAttribute("class", "xkcdSubstitutionsExtensionSubbed");
        newNode.setAttribute("title", splitString);
        newNode.textContent = matchCase(replacementsMap[splitStringLower],
                                        splitString);
      } else {
        newNode = document.createTextNode(splitString);
      }
      docFrag.appendChild(newNode);
    }
    node.parentNode.replaceChild(docFrag, node);
  }

  var node, iter;
  var iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
  while ((node = iter.nextNode())) {
    substitute(node);
  }
});
