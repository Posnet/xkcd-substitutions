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
      if (origChar != lowerChar) {
        hammingLower++;
      }
      if (origChar != upperChar) {
        hammingUpper++;
      }
      if (origChar != titleChar) {
        hammingTitle++;
      }
      // This is a heuristic to determine whether or not we're looking
      // at a punctuation character.  Essentially, this is just
      // checking to see if it's a non-letter.  It doesn't work
      // entirely correctly, such as in non-unicameral scripts, but
      // it's good enough for the purpose at hand.
      isTitlePosition = (upperChar === lowerChar);
    }
    // Determine which case best approximates the original.
    if (hammingLower <= hammingTitle && hammingLower <= hammingUpper) {
      // The original is mostly in lowercase.
      // We expect that the replacement string is also generally in
      // lowercase, with things like proper names already capitalized
      // for us.
      if (original[0] === upperOriginal[0]) {
        // The original's first character is capitalized, but it's
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
    // case.  Note that this path also is taken if there's a one-word
    // original that starts a sentence; we can't tell the difference
    // between that and a title, so we just assume it's a title and
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

  var substitute = (function() {
    "use strict";
    var replacements, ignore, i, replacementsObject, original;
    replacements = response;
    replacementsObject = [];
    for (i = replacements.length - 1; i >= 0; i--) {
      original = new RegExp("\\b" + replacements[i][0] + "\\b", "gi");
      replacementsObject.push([original, replacements[i][1]]);
    }
    return function(node) {
      var i;
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
      if (node.parentElement.tagName in ignore) {
        return;
      }
      for (i = replacementsObject.length - 1; i >= 0; i--) {
        node.nodeValue = node.nodeValue.replace(replacementsObject[i][0], function(match) {
          return matchCase(replacementsObject[i][1], match);
        });
      }
    };
  })();

  var node, iter;
  var iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
  while ((node = iter.nextNode())) {
    substitute(node);
  }
});
