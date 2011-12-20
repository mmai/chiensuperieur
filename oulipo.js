var helpers = require('./helpers');

var Oulipo = {};
Oulipo.ALPHABET = Array("a", "b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");


//Remplace chaque lettre de str par la lettre se trouvant à la nieme position derrière elle dans l'alphabet
Oulipo.nplus = function (n, str) {
  var res = "";
  for (var i=0, len = str.length;i < str.length; i++) {
    var ascii = str.charCodeAt(i);
    if (ascii > 64 && ascii < 91){//Majuscule
      ascii = 64 + (ascii - 64 + n) % 26; 
    }
    else if (ascii > 96 && ascii < 123){//Minuscule
      ascii = 96 + (ascii - 96 + n) % 26; 
    }
    res += String.fromCharCode(ascii);

  }
  return res;
};
//console.log(nplus(5,"aBc"));


Oulipo.getMots = function(txt){
  var reg = new RegExp("[^a-z]", "g");
  txt = txt.replace(reg, " ");
  var mots = txt.split(" ").filter(function(elem){return elem!=="";});
  return mots;
};

//Retourne la chaine str allégée des lettres a_supprimer
Oulipo.allege = function (a_supprimer, str){
  str = helpers.accentsTidy(str); 
  for (var i=0, len = a_supprimer.length;i<len;i++){
    var reg=new RegExp(a_supprimer[i], "g");
    str = str.replace(reg, "");
  }
  return str;
};

//Retourne la traduction de str en "chien ordinaire", ie on ne conserver que les lettres du mot ulcerations
Oulipo.chienOrdinaire = function (str){
  return Oulipo.allege(["b","d","f","g","h","j","k","m","p","q","v","w","x","y","z"], str);
};

/*
 * Retourne le nombre d'occurences des lettres du mot
 * ex : remarquable => 11111222
 */
Oulipo.compteLettres= function(mot){
  var signature = Array();
  var tab = mot.split("");
  var len=tab.length;
  tab.sort();
  if (len > 0){
    var count = 1;
    var curletter = tab[0];
    for (var i=1;i<len;i++){
      if (tab[i] != curletter){
        signature.push(count);
        curletter = tab[i];
        count = 1;
      }
      else {
        count++;
      }
    }
    signature.push(count);
  }
  signature.sort();
  return signature.join("");
};

//retourne une meme signature pour tous les mots issus d'un même mot par décalage (ie chiffre de César) : balle = cbmmf = dcnng
Oulipo.signatureDecalage= function(mot){
  var signature = "";
  var charbase = mot.charCodeAt(0);
  for (var i=0, len=mot.length;i<len;i++){
    //signature += String.fromCharCode((mot.charCodeAt(i) - charbase) % 26 + 97);
    signature += String.fromCharCode((mot.charCodeAt(i) + 26 - charbase) % 26 + 97);
  }
  return signature;
};


//Retourne les fréquences de chaque lettre de str
Oulipo.frequence = function(str){
  str = helpers.accentsTidy(str);
  var caracteres = {"a":0,"b":0,"c":0,"d":0,"e":0,"f":0,"g":0,"h":0,"i":0,"j":0,"k":0,"l":0,"m":0,"n":0,"o":0,"p":0,"q":0,"r":0,"s":0,"t":0,"u":0,"v":0,"w":0,"x":0,"y":0,"z":0};
  for (var i=0, len = str.length;i < str.length; i++){
    car = str.charAt(i);
    caracteres[car] += 1;
  }
  return caracteres;
};

//Retourne un tableau contenant toutes les lettres n'apparaissant pas dans le texte
Oulipo.lipogramme = function(txt){
  txt = txt.toLowerCase();
  var lipos = Array();
  for (var i=0,len=Oulipo.ALPHABET.length;i<len;i++){
    var lettre = Oulipo.ALPHABET[i];
    if (txt.indexOf(lettre) == -1){
      lipos.push(lettre);
    }
  }
  return lipos;
};

//Pangramme : texte contenant toutes les lettres de l'alphabet
Oulipo.pangramme = function(txt){
  return (Oulipo.lipogramme(txt).length === 0);
};

//Belle absente : texte contenant toutes les lettres sauf une
//(En fait un poeme composé de vers vérifiant cette contrainte, et dont les belles absente forme le nom de la personne à qui est dédié le poeme)
Oulipo.belleAbsente = function(txt){
  txt = txt.toLowerCase();
  lipo = Oulipo.lipogramme(txt);
  if (lipo.length === 1) {
    return lipo[0];
  }
  else {
    //Alphabet simplifié
    //var toremove = ['k','w','x','y','z'];
    var toremove = 'kwxyz';
    lipo = lipo.filter(
      function (el){ return (toremove.indexOf(el) === -1);}
    );
    if (lipo.length === 1) {
      return lipo[0];
    }
  }
  return false;
};

/*** CONTRAINTES
//Roubaud
mongine
josephine

A
Abécédaire;
Acronyme
Acrostiche brivadois
Acrostiche universel
Alexandrin greffé
Alexandrin jouetien
Alexandrin oral
Algorithme de Mathews : "http://www.oulipo.net/contraintes/docs/algorithme_de_Mathews"
Alva
Anaérobie
Anagramme
Antérime
Antirime
Aphorime
Aphorisme
Arbre à théâtre
Arbres et arborescence
Avalanche
Avion
B
Baobab
Beau présent
Belle absente
Bibliothèques virtuelles
Bord de poème
Boule de neige
Bris de mots
Bubu l'Urubu
C
Caradec
Carré lescurien
Chicago
Chimère
Chronopoème
Citations
CMMP
Conte à votre façon
Contrainte de Delmas
Contrainte de Lloyd
Contrainte de Pascal
Contrainte de Turing
Contrainte du prisonnier
Cornichon
Cylindre
D
Désarguesienne
Deunglitsch
E
Echelle
Eclipse
Emir
Eodermdrome
Epithalame oulipien
Erim
Etreinte
Exercice de style
Explorations à la limite
F
Filigrane
Formes fixes
H
Haï-kaïsation
Hétérogrammes
Homomorphisme
Homophonies
Homosyntaxisme
Homovocalisme
Hypertropes
I
Immorale élémentaire
Intérieur de poème
Inventaire
J
Joséphine
L
Leiris
Lipogramme
Liponymie
Lipossible
Littérature définitionnelle
Littérature en graphe
Locurime
Locutions introuvables
Logo-rallye
LSD
L’égal franglais
M
Minisextine (minisestina)
Mongine
Monkine
Monovocalisme
Morale élémentaire
N
N-ine
O
Oblique
Ouliporime
P
Palindrome
Parcours obligé (ou logo-rallye)
Perverbe
Petite boîte
Poème carré ou carré lescurien
Poème de métro
Poème fondu
Poème pour bègue
Q
QSSD
Quenoum
R
Redonde
Rime berrichonne
Rime bisexuelle
S
S+7
Sardinosaure
Sollicitude
Sonnet à la limite
Sonnet irrationnel
Surdéfinitions
T
Terine
Terine aux trois voyelles
Terine syllabique
Textes à démarreur
Théâtre booléen
Tireur à la ligne
Traduction antonymique : "Dans un énoncé donné, remplacer chacun des mots importants (substantif, verbe, adjectif, adverbe) par un de ses antonymes possibles. Par exemple, la traduction, par Georges Perec, de la première phrase d’ À la recherche du temps perdu, “Longtemps je me suis couché de bonne heure” donne ; "Une fois, l’autre fit la grasse matinée"."
Traduction homophonique : "“ Un singe débotté est une joie pour l’hiver ” (François Le Lionnais), est une traduction homophonique du vers fameux de John Keats : A thing of beauty is a joy for ever."
Transduction
Trident
Ulcérations : "Les onze lettres les plus fréquentes dans un texte en langue française un peu étendu sont celles qui figurent dans le mot ulcérations. Un poème en ‘ ulcérations’ se compose de vers de onze lettres qui sont tous des anagrammes du mot. 
Au lieu de la lettre ‘c’ qui est la moins fréquente des onze lettres d’’ulcérations’, on peut utiliser une autre des quinze lettres restantes de l’alphabet. On a ainsi des hétérogrammes en ‘ton de b, de f, de g,’ …."
Villanelle
'Vocabulaires raisonnés' : "Un lexique peut-être ordonné suivant des principes nouveaux et rationnels. Ainsi la définition des lettres de vent (N=nord, E=est, O=ouest, S=sud) permet de classer les mots en calmes et agités, de définir le ‘beaufort d’un mot’ etc. On considère aussi les notions  d’altitude et de profondeur…";
'X prend Y pour Z' : "On représente cette relation ternaire comme une multiplication, xy=z, dont on se donne la table. Une table de multiplication étant donnée a priori, on peut utiliser d’autres prédicats : x complote avec y contre z, par exemple. Les propriétés algébriques de la multiplication choisie s’interprètent en événements d’un récit.";
***/

//console.log(frequence("aa b cqsdf cc abb");frequences);

/*
var perec = "Champ défait jusqu'à la ligne brève,\n" +
"J'ai désiré vingt-cinq flèches de plomb\n" +
"Jusqu'au front borné de ma page chétive.\n" +
"Je ne demande qu'au hasard cette fable en prose vague,\n" +
"Vestige du charme déjà bien flou qui\n" +
"défit ce champ jusqu'à la ligne brève.";

var rossel = "Arrivons de Belgique - Fait temps chaud" + "\n" +
"Poursuivants quasi hagards - Joli coup fumant là-bas" + "\n" +
"J'attendrai beaucoup - Il manque un vif garçon honnête" + "\n" +
"Le coq chantant, je vais défier et bien tromper ce gars" + "\n" +
"Chargements déjà prévus - Barque flotte" + "\n" +
"Monarque caché et bien défendu - Jolie plage" + "\n" +
"Je liquide bien sûr votre pigeon chloroformé" + "\n" +
"Définis même qui bâche vos gilets jaunes" + "\n" +
"Ferons digue de bûches empilées, et votre jonque" + "\n" +
"Fâchons-nous quand petit mâle bouge - Je veille" + "\n" +
"Brocante de fous! - Je parque mon vélo au ghetto" + "\n" +
"Je finirai bientôt votre léger paquet (dimanche)";

var lines = rossel.split("\n");
for (var i=0, len = lines.length;i< len;i++){
//  console.log(lines[i]);
//  console.log(frequence(lines[i]));
//  console.log(Oulipo.lipogramme(lines[i]));
  console.log(Oulipo.belleAbsente(lines[i]));
}

*/

exports.Oulipo = Oulipo;

