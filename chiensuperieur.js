var Oulipo = require('./oulipo').Oulipo;
var jsonDisplay = require('./helpers').jsonDisplay;

var chientressuperieur = " IBS EUSLCCONISR, ONSDNCCS0 ," + "\n" +
" EUF SLS ENSIO TELE:1" + "\n" +
"RA UNGESL KJE OOCHMQP" + "\n" +
"NE TURUVS OS IWINE" + "\n" +
"LENSOS E,T,E,S, ALI" + "\n" +
"XEETSE'EN. Y STL'EE" + "\n" +
"EETETR UNNZLA. E BA" + "\n" +
"EURUR=C AEARUIA=R" + "\n" +
"CA UAEE A=I. T" + "\n" +
"ARR ES LATSE, E" + "\n" +
"GDH OTFTMTA, L SOR" + "\n" +
"JSIEEEL, PTEN EESN" + "\n" +
"ENR(E ROL A). 2." + "\n" +
"OELNCANRUI ITQVNW ER" + "\n" +
"E ELESUXNSECO SYT" + "\n" +
"EEOUZSTIS NEESOCB" + "\n" +
"TUUARREECT UAFDE LOELLA-" + "\n" +
"TRH L. GEREOLAJ TS" + "\n" +
"EARELAITNK TREOLIR T" + "\n" +
"IPQ AIU NEE V" + "\n" +
"EUW TXOENNE.";

var lines = chientressuperieur.split("\n");
res = Array();
for (var i=0, len = lines.length;i< len;i++){
  res.push(Oulipo.frequence(lines[i]));
}
jsonDisplay(res, {
    format:"table",
    columns:Oulipo.ALPHABET
  });

