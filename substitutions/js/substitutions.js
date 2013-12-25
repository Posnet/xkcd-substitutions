// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
substitute = function(node) {
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
    ['Witness', 'This dude I know'],
    ['WITNESS', 'THIS DUDE I KNOW'],
    ['witness', 'this dude I know'],
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
    ['Smartphone', 'Pok\u00E9dex'],
    ['SMARTPHONE', 'POK\u00C9DEX'],
    ['smartphone', 'pok\u00E9dex'],
    ['iPhone', 'Pok\u00E9dex'],
    ['IPhone', 'Pok\u00E9dex'],
    ['IPHONE', 'POK\u00E9DEX'],
    ['iphone', 'pok\u00E9dex'],
    ['Samsung Galaxy S2', 'Pok\u00E9dex'],
    ['Samsung Galaxy S3', 'Pok\u00E9dex'],
    ['Samsung Galaxy S4', 'Pok\u00E9dex'],
    ['samsung galaxy S2', 'pok\u00E9dex'],
    ['samsung galaxy S3', 'pok\u00E9dex'],
    ['samsung galaxy S4', 'pok\u00E9dex'],
    ['SAMSUNG GALAXY S2', 'POK\u00E9DEX'],
    ['SAMSUNG GALAXY S3', 'POK\u00E9DEX'],
    ['SAMSUNG GALAXY S4', 'POK\u00E9DEX'],
    ['Nexus 4', 'Pok\u00E9dex'],
    ['Nexus 5', 'Pok\u00E9dex'],
    ['nexus 4', 'pok\u00E9dex'],
    ['nexus 5', 'pok\u00E9dex'],
    ['NEXUS 4', 'POK\u00E9DEX'],
    ['NEXUS 5', 'POK\u00E9DEX'],
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
    var ignore = { "STYLE":0, "SCRIPT":0, "NOSCRIPT":0, "IFRAME":0, "OBJECT":0, "INPUT":0, "FORM":0, "TEXTAREA":0 };
    if (node.tagName in ignore){
        return;
    }

    for (var i = replacements.length - 1; i >= 0; i--) {
        original = RegExp("\\b" + replacements[i][0] + "\\b", 'g');
        node.data = node.data.replace(original, replacements[i][1]);
    };
}

$(function() {
    var iter =  document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while(node = iter.nextNode()) {
        substitute(node);
    }
});


