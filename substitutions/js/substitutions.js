// obtained from http://stackoverflow.com/questions/6012163/whats-a-good-alternative-to-html-rewriting/6012345#6012345
// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
/*
I added more plural and non-plural forms, and a bunch more flexibility to the 'Allegedly' category, adding alleged and allegation in their multiple forms. Also, many of my changes resulted in 'a'/'an' confusion so I had to clear that up. I am a little hesitant toward adding "android" to the list of pokedex substitution list, however iPhone works well in that regard. Keep, remove, and edit what you wish. I was thinking of making a completely new extension, but I wouldn't want to end up with an xkcd.com/927/ type problem. I honestly don't care if you give me credit. I wanted a more flexible extension and if I get that I'll be happy.
*/
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
    //The repetition seems unnecessary, but getting regex to work correctly with mixed case
    //was beyond my abilities.
    //Unfortunately it can't handle dynamic content, but it shouldn't slow down any web pages.
    replacements = [
    ['Keyboard', 'Leopard'],
    ['KEYBOARD', 'LEOPARD'],
    ['keyboard', 'leopard'],
    ['Keyboards', 'Leopards'],
    ['KEYBOARDS', 'LEOPARDS'],
    ['keyboards', 'leopards'],
	['Witness', 'dude I know'],
    ['WITNESS', 'DUDE I KNOW'],
    ['witness', 'dude I know'],
    ['Witnesses', 'These dudes I know'],
    ['WITNESSES', 'THESE DUDES I KNOW'],
    ['witnesses', 'these dudes I know'],
    ['Allegedly', 'Kinda Probably'],
    ['ALLEGEDLY', 'KINDAPROBABLY'],
    ['allegedly', 'kinda probably'],
    ['an Alleged', 'a Kinda Probable'],
    ['An Alleged', 'A Kinda Probable'],
    ['AN ALLEGED', 'A KINDAPROBABLE'],
    ['an alleged', 'a kinda probable'],
    ['Alleged', 'Kinda Probable'],
    ['ALLEGED', 'KINDA PROBABLE'],
    ['alleged', 'kinda probable'],
	['an Allegation', 'a Kinda Probable Claim'],
	['An Allegation', 'A Kinda Probable Claim'],
	['AN ALLEGATION', 'a kinda probable claim'],
	['an allegation', 'a kinda probable claim'],
	['Allegation', 'Kinda Probable Claim'],
	['ALLEGATION', 'kinda probable claim'],
	['allegation', 'kinda probable claim'],
	['Allegations', 'Kinda Probable Claims'],
	['ALLEGATIONS', 'kinda probable claims'],
	['allegations', 'kinda probable claims'],
    ['New Study', 'Tumblr Post'],
    ['NEW STUDY', 'TUMBLR POST'],
    ['new study', 'tumblr post'],
    ['New Studies', 'Tumblr Posts'],
    ['NEW STUDIES', 'TUMBLR POSTS'],
    ['new studies', 'tumblr posts'],
    ['Rebuild', 'Avenge'],
    ['REBUILD', 'AVENGE'],
    ['rebuild', 'avenge'],
    ['Space', 'Spaaaaaace'],
    ['SPACE', 'SPAAAAAACE'],
    ['space', 'spaaaaaace'],
    ['Google Glass', 'Virtual Boy'],
    ['GOOGLE GLASS', 'VIRTUAL BOY'],
    ['google glass', 'virtual boy'],
    ['Google Glasses', 'Virtual Boys'],
    ['GOOGLE GLASSES', 'VIRTUAL BOYs'],
    ['google glasses', 'virtual boys'],
    ['Smartphone', 'Pokedex'],
    ['SMARTPHONE', 'POKEDEX'],
    ['smartphone', 'pokedex'],
	['Smartphones', 'Pokedexes'],
    ['SMARTPHONES', 'POKEDEXES'],
    ['smartphones', 'pokedexes'],
    ['an iPhone', 'a Pokedex'],
    ['An iPhone', 'A Pokedex'],
    ['AN IPHONE', 'A POKEDEX'],
    ['an iphone', 'a pokedex'],
    ['iPhone', 'Pokedex'],
    ['IPHONE', 'POKEDEX'],
    ['iphone', 'pokedex'],
	['iPhones', 'Pokedexes'],
    ['IPHONES', 'POKEDEXES'],
    ['iphones', 'pokedexes'],
	['an Android Phone', 'a Pokedex'],
	['An Android Phone', 'A Pokedex'],
	['an Android phone', 'a Pokedex'],
	['An Android phone', 'A Pokedex'],
	['AN ANDROID PHONE', 'A POKEDEX'],
	['an android phone', 'a pokedex'],
	['an Android', 'a Pokedex'],
	['An Android', 'A Pokedex'],
	['AN ANDROID', 'A POKEDEX'],
	['an android', 'a pokedex'],
	['Android', 'Pokedex'],
	['ANDROID', 'POKEDEX'],
	['android', 'pokedex'],
    ['Electric', 'Atomic'],
    ['ELECTRIC', 'ATOMIC'],
    ['electric', 'atomic'],
    ['a Senator', 'an Elf-Lord'],
    ['A Senator', 'An Elf-Lord'],
    ['A SENATOR', 'AN ELF-LORD'],
    ['a senator', 'an elf-lord'],
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
	['Congressman', 'River Spirit'],
	['CONGRESSMAN', 'RIVER SPIRIT'],
	['congressman', 'river spirit'],
	['Congressmen', 'River Spirits'],
	['CONGRESSMEN', 'RIVER SPIRITS'],
	['congressmen', 'river spirits'],
    ['Congressional Leaders', 'River Spirits'],
    ['CONGRESSIONAL LEADERS', 'RIVER SPIRITS'],
    ['congressional leaders', 'river spirits'],
    ['Congressional Leader', 'River Spirit'],
    ['CONGRESSIONAL LEADER', 'RIVER SPIRIT'],
    ['congressional leader', 'river spirit'],
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
