var helpers = require('./helpers');

var Crypt = {};

/* methodes */

//From & to = arrays
Crypt.assoc_method_factory = function(from, to){
  return function (text, decode){
    var thisfrom = from.slice(0);
    var thisto = to.slice(0);
    if (decode === true){
      //Décodage : association inverse
      thisfrom = to.slice(0);
      thisto = from.slice(0);
    }
    return helpers.strtr(thisfrom, thisto, text);
  };
};
/* fin methodes */


Crypt.try_methods = function(dict, text){
//  var from = ["u","l","c","e","r","a","t","i","o","n","s"];
  var from = ["u","l","c","e","r","a", "t"];

  checkPermutation = function(permutation){
//    console.log("trying "+permutation);
    var method = Crypt.assoc_method_factory(from, permutation);
    return Crypt.analyse(dict, method, text); 
  };

  permutation =  helpers.permute(from, checkPermutation);

  var method = Crypt.assoc_method_factory(from, permutation);
  return method(text,true);
};

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


