var Table = require('cli-table'); // for jsonDisplay

/*************************************************
 * String functions
 * ***********************************************/

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

strtr = function (from, to, txt) {//from & to : arrays
  for (var i=0, len=from.length; i<len; i++) {
    txt = txt.replace(new RegExp(from[i], 'g'), to[i]);
  }
  return txt;
};

/***************************************
 * Array functions
 * *************************************/

sortByKeys = function(hash){
  var newhash = Array();
  var keys = Object.keys(hash).sort();
  for (var i=0, len=keys.length;i<len;i++){
    newhash[keys[i]] = hash[keys[i]];
  }
  return newhash;
};

//Send permutations of v to callback_check, call callback_success if check returns true
 permute = function(v, callback_check, callback_success){
   for(var p = -1, j, k, f, r, l = v.length, q = 1, i = l +1; --i > 0 ; q *= i);
   for(x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1;
       ++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
   for(r = new Array(q); ++p < q;){
     for(r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i], x[2][i] = (x[2][i] + 1) % l), r[p][i] =  v[x[3][i]])
       for(x[3][i] = x[2][i], f = 0; !f; f = !f)
         for(j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));
     // console.log("trying ", r[p]);
     if (callback_check(r[p])){
       callback_success(r[p]);
     }
   }
   return r;
 };

/*********************************
 * Display functions
 * ******************************/

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

exports.permute= permute;
exports.strtr= strtr;
exports.accentsTidy = accentsTidy;
exports.jsonDisplay = jsonDisplay;
