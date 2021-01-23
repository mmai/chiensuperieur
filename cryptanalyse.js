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
  var from = ["u","l","c","e","r","a","t","i","o","n","s"].filter(function(letter){ return text.indexOf(letter) >= 0; });


  var permutationCandidates = [];

  checkPermutation = function(permutation){
    var method = Crypt.assoc_method_factory(from, permutation);
    if (Crypt.analyse(dict, method, text)) {
      console.log("---------");
      console.log(permutation);
      console.log(method(text,true));
      console.log("---------");
      return true;
    } 
    return false;
  };

  res =  helpers.permute(from, checkPermutation, function(perm){ permutationCandidates.push(perm); });

  permutationCandidates.forEach(function(perm){
    console.log(perm);
    let method = Crypt.assoc_method_factory(from, perm);
    console.log(method(text,true));
  })
  //Retourne la dernière
  return method(text,true);
};

Crypt.getMots = function(txt){
  var reg = new RegExp("[^a-z]", "g");
  txt = txt.replace(reg, " ");
  var mots = txt.split(" ").filter(function(elem){return elem!=="";});
  return mots;
};

Crypt.fastlookup = function(dictionnaire, mot){
  var reg = new RegExp("^"+mot+"$", "m");
  return (reg.exec(dictionnaire) !== null);
};

Crypt.lookup = function(dictionnaire, mot, count){
  var compteur = 0;
  var lines = dictionnaire.split("\n");
  for (var i=0, len = lines.length;i< len;i++){
    if (lines[i] === mot){
      if (count !== true){ return 1; }
      compteur++;
    }
  }
  return compteur;
};

Crypt.analyse = function(dictionnary, method, text){
  var mots = Crypt.getMots(text);
  //On regarde d'abord les plus longs mots, ils ont plus de chance de ne pas êtres connus du dictionnaire.
  mots.sort(function(a,b){
      return b.length - a.length;
    });
  for (var i=0, len = mots.length;i< len;i++){
    var mot = mots[i];
//    if (Crypt.lookup(dictionnary, method(mot, true)) === 0){
    if (!Crypt.fastlookup(dictionnary, method(mot, true))){
      //At least one word not decrypted : bad method
      return false; 
    }
  }
  return true;
};

exports.Crypt = Crypt;


