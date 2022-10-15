/*
 * TODO
 * - comparaison avec mots/expressions du français (moins lettres absentes)
 * - association de lettres
 */
var fs = require('fs');
var Oulipo = require('./oulipo').Oulipo;
var Crypt = require('./cryptanalyse').Crypt;
var jsonDisplay = require('./helpers').jsonDisplay;

var chiensuperieur1 = "t'cea uc tscl rs" + "\n" +
"n neo rt aluot" + "\n" +
"ia ouna s ilel-" + "\n" +
"-rc oal ei ntoi." + "\n";

var chiensuperieur2 = "O'atn ia ootar ost" + "\n" +
"u nutl so nrilo" + "\n" +
"rt aluot ai rnasntni" + "\n" +
"tea rl tscl" + "\n";

var chientressuperieur = " IBS EUSLCCONISR, ONSDNCCS0 ," + "\n" +
" EUF SLS ENSIO TELE:1" + "\n" +
"RA UNGESL KJE OOCHEMQP" + "\n" +
"NE TURUVS OS IWINE" + "\n" +
"LENSOS E,T,E,S, ALI" + "\n" +
"XEETSE'EN. Y STL'EE" + "\n" +
"EETETR UNNZLA. E BA" + "\n" +
" EARUR=C AEARUIA=R" + "\n" +
"CA UAEE A=I. T" + "\n" +
"ARR ES LATSE, E" + "\n" +
"GDH OTFTMTA, L SOR" + "\n" +
"JSIEEEL, PTEN EESN" + "\n" +
"ENR(E ROL A). 2." + "\n" +
"OELNCANRUI ITQVNW ER" + "\n" +
"E ELESUXNSECO SYT" + "\n" +
"EEOUZSTIS NEESOCB" + "\n" +
"TUUARREECT UAFDE LOELLA-" + "\n" +
"TRH L. GEREOALJ TS" + "\n" +
"EARELAITNK TREOLIR T" + "\n" +
"IPQ AIU NEE V" + "\n" +
"EUW TXOENNE.";

//var mots = Crypt.getMots(chientressuperieur.toLowerCase());
//var dict = 'mots_francais_chien_signatureDecalage.txt';

var lignes = chiensuperieur1.split("\n");
var dict = 'mots_francais_chien_unique.txt';

var testassoc = Crypt.assoc_method_factory("lnesutcaori","ulcerations");

var fichier = 'dictionnaires/' + dict;
fs.readFile(fichier, 'utf8', function(err, dict_data){
    if(err) {
      console.error("Could not open file: %s", err);
      process.exit(1);
    }

    result  = Crypt.try_methods(dict_data, "t'cea uc tscl rs");
    // result  = Crypt.try_methods(dict_data, "u nutl so nrilo");
    console.log(result);
    /*
    for (var i=0, len = lignes.length;i< len;i++){
      ligne = lignes[i];
      var statut = ligne;
      if (Crypt.analyse(dict_data, testassoc, ligne)){
        statut += " => decrypté!!";
      }
      console.log(statut);
    }
    */
  });


/*
var lines = chientressuperieur.split("\n");
res = Array();
for (var i=0, len = lines.length;i< len;i++){
  res.push(Oulipo.frequence(lines[i]));
}
jsonDisplay(res, {
    format:"table",
    columns:Oulipo.ALPHABET
  });
//*/

