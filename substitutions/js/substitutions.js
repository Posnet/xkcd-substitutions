// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
chrome.runtime.sendMessage("config", function(response) {
  "use strict";

  function matchCase(replacement, original) {
    // Compute the Hamming distance between the original text and its
    // lowercase, titlecase, and uppercase equivalents.
    var lowerOriginal = original.toLocaleLowerCase();
    var upperOriginal = original.toLocaleUpperCase();
    var hammingLower = 0;
    var hammingTitle = 0;
    var hammingUpper = 0;
    var isTitlePosition = true;
    for (var i = 0; i < original.length; i++) {
      var origChar = original[i];
      var lowerChar = lowerOriginal[i];
      var upperChar = upperOriginal[i];
      var titleChar = isTitlePosition ? upperChar : lowerChar;
      if (origChar !== lowerChar) {
        hammingLower++;
      }
      if (origChar !== upperChar) {
        hammingUpper++;
      }
      if (origChar !== titleChar) {
        hammingTitle++;
      }
      // This is a heuristic to determine whether or not we're looking
      // at a punctuation character.  Essentially, this is just
      // checking to see if it’s a non-letter.  It doesn’t work
      // entirely correctly, such as in non-unicameral scripts, but
      // it’s good enough for the purpose at hand.
      isTitlePosition = (upperChar === lowerChar);
    }
    // Determine which case best approximates the original.
    if (hammingLower <= hammingTitle && hammingLower <= hammingUpper) {
      // The original is mostly in lowercase.
      // We expect that the replacement string is also generally in
      // lowercase, with things like proper names already capitalized
      // for us.
      if (original[0] === upperOriginal[0]) {
        // The original’s first character is capitalized, but it’s
        // mostly in lower case.  We're probably starting a sentence
        // or something.
        return (replacement[0].toLocaleUpperCase() +
                replacement.substr(1));
      } else {
        return replacement;
      }
    }
    if (hammingUpper <= hammingLower && hammingUpper <= hammingTitle) {
      // The original is mostly in uppercase.
      return replacement.toLocaleUpperCase();
    }

    // The original is mostly in titlecase.  Build a result in title
    // case.  Note that this path also is taken if there’s a one-word
    // original that starts a sentence; we can’t tell the difference
    // between that and a title, so we just assume it’s a title and
    // move on.  (Multi-word originals are distinguished when computing
    // the Hamming distance by looking at subsequent words.)
    var resultArray = new Array(replacement.length);
    var replacementLower = replacement.toLocaleLowerCase();
    var replacementUpper = replacement.toLocaleUpperCase();
    isTitlePosition = true;
    for (var i = 0; i < replacement.length; i++) {
      var charAtPos = replacement[i];
      if (isTitlePosition) {
        resultArray.push(replacementUpper[i]);
      } else {
        resultArray.push(charAtPos);
      }
      isTitlePosition = (replacementLower[i] === replacementUpper[i]);
    }
    return resultArray.join('');
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
      '  font-variant: small-caps;' +
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

  // Set up the functions we'll need to perform the iteration.
  var node;
  var iter;
  var substCount = 0;

  var filter = {
      acceptNode: function(node) {
          if (node.nodeType === Node.TEXT_NODE) {
              // This is a text node that we should show to the
              // filter.
              return NodeFilter.FILTER_ACCEPT;
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
              // Fold to upper case before checking the tag name,
              // since this may be XHTML etc.
              if (node.tagName.toUpperCase() in ignore) {
                  // Ignore this element, and all its children.
                  return NodeFilter.FILTER_REJECT;
              }
              if (node.classList.contains("xkcdSubstitutionsExtensionSubbed")) {
                  // We've already changed this text.  Note that some
                  // other extension or the page's own scripts may
                  // have made more changes to what we did, so don't
                  // fight back and forth, constantly changing the
                  // DOM.  Instead, just increment our substitution
                  // count and skip this subtree entirely.
                  substCount++;
                  return NodeFilter.FILTER_REJECT;
              }
          }
          // This is not a node we're interested in.  Skip this node,
          // but process its children.
          return NodeFilter.FILTER_SKIP;
      }
  };

  function substitute(node) {
    var replacementIdx;
    var splitIdx;

    // Before starting, make sure there's something to substitute.
    // Otherwise, we end up doing a lot of expensive tree modification
    // for no reason.
    if (!node.nodeValue.match(originalsRegexp)) {
      return;
    }

    // Prepare a document fragment to hold the result.
    var docFrag = document.createDocumentFragment();

    // Split the string into substring, where each substring either contains
    // something we'll substitute, or something that we won't.  We do this
    // by using the capturing parentheses in originalsRegexp.
    var splits = node.nodeValue.split(originalsRegexp);
    for (splitIdx = 0; splitIdx < splits.length; splitIdx++) {
      var splitString = splits[splitIdx];
      var splitStringLower = splitString.toLowerCase();
      var newNode;
      if (splitStringLower in replacementsMap) {
        // This is something that needs to be changed.
        substCount++;
        newNode = document.createElement("span");
        newNode.setAttribute("class", "xkcdSubstitutionsExtensionSubbed");
        newNode.setAttribute("title", splitString);
        newNode.textContent = matchCase(replacementsMap[splitStringLower],
                                        splitString);
      } else {
        // This is a stretch between stuff that needs changing.
        newNode = document.createTextNode(splitString);
      }
      docFrag.appendChild(newNode);
    }

    // Let the tree walker know that its place has changed: the old
    // node it sent us is gone, and so we'll update its current place
    // to refer to the last node we've processed.
    iter.currentNode = docFrag.lastChild;
    // Make the changes.
    node.parentNode.replaceChild(docFrag, node);
  }

  iter = document.createTreeWalker(document.body,
                                   NodeFilter.SHOW_ELEMENT |
                                   NodeFilter.SHOW_TEXT,
                                   filter);
  while ((node = iter.nextNode())) {
    substitute(node);
  }

  chrome.runtime.sendMessage({"substCount": substCount});
});
