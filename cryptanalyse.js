var helpers = require('./helpers');

var Crypt = {};

/* methodes */
var crypt_association = function(from, to, text){
  return helpers.strtr(from, to, text);
};
/* fin methodes */

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
  return 

};

exports.Crypt = Crypt;


