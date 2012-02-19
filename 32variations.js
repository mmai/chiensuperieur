var Oulipo = require('./oulipo').Oulipo;

var souche = "dans cet intervalle quotidient de ma vie maintenant vide, j'écrirai";
console.log("00. Texte souche");
console.log(souche);
console.log("\n01. Réorganisation alphabétique");
var freq = Oulipo.frequence(souche);
var reorg = "";
for (lettre in  freq){
  var count = 0;
  while (count < freq[lettre]){
    reorg += lettre;
    count++;
  }
  reorg += ' ';
}
console.log(reorg);
console.log("\n02. Anagramme");
console.log("\n03. Anagramme (autre)");
console.log("\n04. Lipogramme en ...");
console.log("\n05. Lipogramme en i");
console.log("\n06. Lipogramme en e");
