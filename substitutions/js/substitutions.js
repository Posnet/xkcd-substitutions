// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288

// taken from http://stackoverflow.com/questions/17264639/replace-text-but-keep-case
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

var substitute = (function() {
    "use strict";
    var replacements, ignore, i, replacementsObject, original;
    replacements = [
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

        if (node.tagName in ignore) {
            return;
        }
        for (i = replacementsObject.length - 1; i >= 0; i--) {
            node.nodeValue = node.nodeValue.replace(replacementsObject[i][0], function(match) {
                return matchCase(replacementsObject[i][1], match);
            });
        }
    };
})();

$(function() {
    "use strict";
    var node, iter;
    var iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    // var nodes = [];
    while ((node = iter.nextNode())) {
        substitute(node);

    }
});