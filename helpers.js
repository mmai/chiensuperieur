var Table = require('cli-table'); // for jsonDisplay

accentsTidy = function(s){
  var r=s.toLowerCase();
//  r = r.replace(new RegExp("\\s", 'g'),"");
  r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
  r = r.replace(new RegExp("æ", 'g'),"ae");
  r = r.replace(new RegExp("ç", 'g'),"c");
  r = r.replace(new RegExp("[èéêë]", 'g'),"e");
  r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
  r = r.replace(new RegExp("ñ", 'g'),"n");                            
  r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
  r = r.replace(new RegExp("œ", 'g'),"oe");
  r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
  r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
//  r = r.replace(new RegExp("\\W", 'g'),"");
  return r;
};

strtr = function (from, to, string) {
  var length = 0;
  var hash = [];
  var tmp = "";
  if (from.length < to.length) {
    length = from.length;
  }
  else {
    length = to.length;
  }

  for (var i=0; i<length; i++) {
    hash[from.charAt(i)] = to.charAt(i);
  }
  for (var j=0; j<string.length; j++) {
    var c = string.charAt(j);
    if (hash[c]){
      tmp = tmp + hash[string.charAt(j)];
    }
    else {
      tmp = tmp + c;
    }
  }
  return tmp;
};

sortByKeys = function(hash){
  var newhash = Array();
  var keys = Object.keys(hash).sort();
  for (var i=0, len=keys.length;i<len;i++){
    newhash[keys[i]] = hash[keys[i]];
  }
  return newhash;
};

//Dispay array of json data in a readable format
jsonDisplay = function(data, args){
  if (args.format === "table"){
    //initialize table
    colwidths = Array();
    for (var i = 0, len=args.columns.length;i<len;i++){
      colwidths.push(4);
    }
    var table = new Table({head: args.columns, colWidths:colwidths});
    var nbcols = args.columns.length;
    for (var i=0,len=data.length;i<len;i++){
      var row = Array();
      var elem = data[i];
      for (var j=0;j<nbcols;j++){
        row.push(elem[args.columns[j]]);
      }
      table.push(row);  
    }
    console.log(table.toString());
  }
  else {
    console.log(json);
    throw new Error("Unknown display format");
  }
};

exports.strtr= strtr;
exports.accentsTidy = accentsTidy;
exports.jsonDisplay = jsonDisplay;
