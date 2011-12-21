var helpers = require('./helpers');

var Crypt = {};

/* methodes */
Crypt.assoc_method_factory = function(from, to){
  return function (text, decode){
    var thisfrom = from;
    var thisto = to;
    if (decode === true){
      //Décodage : association inverse
      thisfrom = to;
      thisto = from;
    }

    return helpers.strtr(thisfrom, thisto, text);
  };
};
/* fin methodes */

Crypt.getMots = function(txt){
  var reg = new RegExp("[^a-z]", "g");
  txt = txt.replace(reg, " ");
  var mots = txt.split(" ").filter(function(elem){return elem!=="";});
  return mots;
};

Crypt.lookup = function(dictionnaire, mot){
  var compteur = 0;
  var lines = dictionnaire.split("\n");
  for (var i=0, len = lines.length;i< len;i++){
    if (lines[i] === mot){
      compteur++;
    }
  }
  return compteur;
};

Crypt.analyse = function(dictionnary, method, text){
  var mots = Crypt.getMots(text);
  for (var i=0, len = mots.length;i< len;i++){
    var mot = mots[i];
    if (Crypt.lookup(dictionnary, method(mot, true)) === 0){
      //At least one word not decrypted : bad method
      return false; 
    }
  }
  return true;
};

exports.Crypt = Crypt;


