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

substitute = function(node) {
    //Unfortunatly it can't handle dynamic content, but it shouldn't slow down any web pages.
    replacements = [
        ['keyboard', 'leopard'],
        ['keyboards', 'leopards'],
        ['witnesses', 'these dudes I know'],
        ['Witness', 'This dude I know'],
        ['WITNESS', 'THIS DUDE I KNOW'],
        ['witness', 'this dude I know'],
        ['Allegedly', 'Kinda Probably'],
        ['ALLEGEDLY', 'KINDAPROBABLY'],
        ['allegedly', 'kinda probably'],
        ['new study', 'tumblr post'],
        ['rebuild', 'avenge'],
        ['space', 'spaaaaaace'],
        ['google glass', 'virtual boy'],
        ['Smartphone', 'Pok\u00E9dex'],
        ['SMARTPHONE', 'POK\u00C9DEX'],
        ['smartphone', 'pok\u00E9dex'],
        ['Electric', 'Atomic'],
        ['ELECTRIC', 'ATOMIC'],
        ['smartphone', 'pokedex'],
        ['electric', 'atomic'],
        ['senator', 'elf-lord'],
        ['senators', 'elf-lords'],
        ['car', 'cat'],
        ['cars', 'cats'],
        ['election', 'eating contest'],
        ['elections', 'eating contests'],
        ['Congressional Leaders', 'River Spirits'],
        ['CONGRESSIONAL LEADERS', 'RIVER SPIRITS'],
        ['congressional leaders', 'river spirits'],
        ['homeland security', 'homestar runner'],
        ['Homeland security', 'Homestar runner']
        ['Could not be reached for comment', 'Is guilty and everyone knows it'],
        ['COULD NOT BE REACHED FOR COMMENT', 'IS GUILTY AND EVERYONE KNOWS IT'],
        ['Could Not Be Reached For Comment', 'Is Guilty And Everyone Knows It'],
        ['could not be reached for comment', 'is guilty and everyone knows it'],
        ['Force', 'Horse'],
        ['force', 'horse'],
    ];

    for (var i = replacements.length - 1; i >= 0; i--) {
        console.log(this.data);
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'gi');
        node.data = node.data.replace(original, function(match) {
            return matchCase(replacements[i][1], match);
        });
    };
}

$(function() {
    var iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, function (node) {
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
        return NodeFilter.FILTER_REJECT;
    }
    return NodeFilter.FILTER_ACCEPT;
    });
    var nodes = [];
    while (node = iter.nextNode()) {
        console.log(node);
        substitute(node);

    }
});