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

