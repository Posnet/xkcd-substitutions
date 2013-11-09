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

$('body').textWalk(function(replacements2) {
    //The repetition seems unecessary, but getting regex to work correctly with mixed case
    //was beyond my abilities.
    //Unfortunatly it can't handle dynamic content, but it shouldn't slow down any web pages.
    replacements = [
    ['Keyboard', 'Leopard'],
    ['KEYBOARD', 'LEOPARD'],
    ['keyboard', 'leopard'],
    ['Keyboards', 'Leopards'],
    ['KEYBOARDS', 'LEOPARDS'],
    ['keyboards', 'leopards'],
    ['Witnesses', 'These dudes I know'],
    ['WITNESSES', 'THESE DUDES I KNOW'],
    ['witnesses', 'these dudes I know'],
    ['Allegedly', 'Kinda Probably'],
    ['ALLEGEDLY', 'KINDAPROBABLY'],
    ['allegedly', 'kinda probably'],
    ['New Study', 'Tumblr Post'],
    ['NEW STUDY', 'TUMBLR POST'],
    ['new study', 'tumblr post'],
    ['Rebuild', 'Avenge'],
    ['REBUILD', 'AVENGE'],
    ['rebuild', 'avenge'],
    ['Space', 'Spaaaaaace'],
    ['SPACE', 'SPAAAAAACE'],
    ['space', 'spaaaaaace'],
    ['Google Glass', 'Virtual Boy'],
    ['GOOGLE GLASS', 'VIRTUAL BOY'],
    ['google glass', 'virtual boy'],
    ['Smartphone', 'Pokedex'],
    ['SMARTPHONE', 'POKEDEX'],
    ['smartphone', 'pokedex'],
    ['Electric', 'Atomic'],
    ['ELECTRIC', 'ATOMIC'],
    ['electric', 'atomic'],
    ['Senator', 'Elf-Lord'],
    ['SENATOR', 'ELF-LORD'],
    ['senator', 'elf-lord'],
    ['Senators', 'Elf-Lords'],
    ['SENATORS', 'ELF-LORDS'],
    ['senators', 'elf-lords'],
    ['Car', 'Cat'],
    ['CAR', 'CAT'],
    ['car', 'cat'],
    ['Cars', 'Cats'],
    ['CARS', 'CATS'],
    ['cars', 'cats'],
    ['Election', 'Eating Contest'],
    ['ELECTION', 'EATING CONTEST'],
    ['election', 'eating contest'],
    ['Elections', 'Eating Contests'],
    ['ELECTIONS', 'EATING CONTESTS'],
    ['elections', 'eating contests'],
    ['Congressional Leaders', 'river spirits'],
    ['CONGRESSIONAL LEADERS', 'river spirits'],
    ['congressional leaders', 'river spirits'],
    ['Homeland Security', 'Homestar Runner'],
    ['HOMELAND SECURITY', 'HOMESTAR RUNNER'],
    ['homeland security', 'homestar runner'],
    ['Could not be reached for comment', 'Is guilty and everyone knows it'],
    ['COULD NOT BE REACHED FOR COMMENT', 'IS GUILTY AND EVERYONE KNOWS IT'],
    ['could not be reached for comment', 'is guilty and everyone knows it']];
    for (var i = replacements.length - 1; i >= 0; i--) {
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'g');
        this.data = this.data.replace(original, replacements[i][1]);
    };
});
