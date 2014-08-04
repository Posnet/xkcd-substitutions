// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
<<<<<<< HEAD
substitute = function(node) {
=======
jQuery.fn.textWalk = function( fn ) {
    this.contents().each( jwalk );
    function jwalk() {
        var node = this.nodeName.toLowerCase();
        if( node === '#text' ) {
            fn.call( this );
        } else if( this.nodeType === 1 && this.childNodes && this.childNodes[0] && node !== 'script' && node !== 'textarea' ) {
            $(this).contents().each( jwalk );
        }
    }
    return this;
};

// taken from http://stackoverflow.com/questions/17264639/replace-text-but-keep-case
function matchCase(text, pattern) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}

$('body').textWalk(function(replacements2) {
    //Unfortunatly it can't handle dynamic content, but it shouldn't slow down any web pages.
>>>>>>> ca04ecef0fafd6075c919a172aa206a45f46b3ad
    replacements = [
    ['keyboard', 'leopard'],
    ['keyboards', 'leopards'],
    ['witnesses', 'these dudes I know'],
<<<<<<< HEAD
    ['Witness', 'This dude I know'],
    ['WITNESS', 'THIS DUDE I KNOW'],
    ['witness', 'this dude I know'],
    ['Allegedly', 'Kinda Probably'],
    ['ALLEGEDLY', 'KINDAPROBABLY'],
=======
>>>>>>> ca04ecef0fafd6075c919a172aa206a45f46b3ad
    ['allegedly', 'kinda probably'],
    ['new study', 'tumblr post'],
    ['rebuild', 'avenge'],
    ['space', 'spaaaaaace'],
    ['google glass', 'virtual boy'],
<<<<<<< HEAD
    ['Smartphone', 'Pok\u00E9dex'],
    ['SMARTPHONE', 'POK\u00C9DEX'],
    ['smartphone', 'pok\u00E9dex'],
    ['Electric', 'Atomic'],
    ['ELECTRIC', 'ATOMIC'],
=======
    ['smartphone', 'pokedex'],
>>>>>>> ca04ecef0fafd6075c919a172aa206a45f46b3ad
    ['electric', 'atomic'],
    ['senator', 'elf-lord'],
    ['senators', 'elf-lords'],
    ['car', 'cat'],
    ['cars', 'cats'],
    ['election', 'eating contest'],
    ['elections', 'eating contests'],
    ['congressional leaders', 'river spirits'],
    ['homeland security', 'homestar runner'],
    ['could not be reached for comment', 'is guilty and everyone knows it']];
    var ignore = { "STYLE":0, "SCRIPT":0, "NOSCRIPT":0, "IFRAME":0, "OBJECT":0 };
    if (node.tagName in ignore){
        return;
    }

    for (var i = replacements.length - 1; i >= 0; i--) {
<<<<<<< HEAD
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'g');
        node.data = node.data.replace(original, replacements[i][1]);
    };
}

$(function() {
    var iter =  document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while(node = iter.nextNode()) {
        substitute(node);
=======
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'gi');
        this.data = this.data.replace(original, function(match) {
            return matchCase(replacements[i][1], match);
        });
>>>>>>> ca04ecef0fafd6075c919a172aa206a45f46b3ad
    }
});


