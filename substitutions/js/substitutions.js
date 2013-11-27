// Tribute to  justin.giancola and the s/keyboard/leopard chrome extension.
// Icon and idea are from www.xkcd.com/1288
var substitute = (function() {
     "use strict";
     var replacements, ignore, i, replacementsObject, original;
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
          ['could not be reached for comment', 'is guilty and everyone knows it']
     ];

     replacementsObject = [];

     for (i = replacements.length - 1; i >= 0; i--) {
          original = RegExp("\\b" + replacements[i][0] + "\\b", 'g');
          replacementsObject.push([original, replacements[i][1]]);
     }
     ignore = {
          "STYLE": 0,
          "SCRIPT": 0,
          "NOSCRIPT": 0,
          "IFRAME": 0,
          "OBJECT": 0
     };

     return function(node) {
          var i;
          if (node.tagName in ignore) {
               return;
          }

          for (i = replacementsObject.length - 1; i >= 0; i--) {
               node.data = node.data.replace(replacements[i][0], replacements[i][1]);
          }
     };
})();

$(function() {
     "use strict";
     var node, iter; 
     iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
     while ((node = iter.nextNode())) {
          substitute(node);
     }
});
