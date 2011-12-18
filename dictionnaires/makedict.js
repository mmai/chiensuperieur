var fs = require('fs');
var Oulipo = require('../oulipo').Oulipo;

var transforme = function (fichier, func, callback){
  fs.readFile(fichier, 'utf8', function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
      }
      callback(func(data));
    });
};

var parligne = function(func){
  return function(txt){
    var lines = txt.split("\n");
    res = Array();
    for (var i=0, len = lines.length;i< len;i++){
      res.push(func(lines[i]));
    }
    return res.join("\n");
  };
};

//*
var fichier ='mots_francais_chien.txt'; 
transforme(fichier, parligne(Oulipo.signatureDecalage), console.log);
//*/

/*
var fichier ='liste.de.mots.francais.sansaccents.txt'; 
transforme(fichier, parligne(Oulipo.chienOrdinaire), console.log);
//*/

/*
var accentsTidy = require('../helpers').accentsTidy;
var fichier ='liste.de.mots.francais.frgut.txt'; 
transforme(fichier, accentsTidy);
//*/
