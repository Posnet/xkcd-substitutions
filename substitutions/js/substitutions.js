// obtained from http://stackoverflow.com/questions/6012163/whats-a-good-alternative-to-html-rewriting/6012345#6012345
// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
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
    replacements = [
    ['keyboard', 'leopard'],
    ['keyboards', 'leopards'],
    ['witnesses', 'these dudes I know'],
    ['allegedly', 'kinda probably'],
    ['new study', 'tumblr post'],
    ['rebuild', 'avenge'],
    ['space', 'spaaaaaace'],
    ['google glass', 'virtual boy'],
    ['smartphone', 'pokedex'],
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
    for (var i = replacements.length - 1; i >= 0; i--) {
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'gi');
        this.data = this.data.replace(original, function(match) {
            return matchCase(replacements[i][1], match);
        });
    }
});
