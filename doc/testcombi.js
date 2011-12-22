/*
 permute = function(v){
  for(var p = -1, j, k, f, r, l = v.length, q = 1, i = l +1; --i > 0 ; q *= i);
  for(x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1;
        ++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
    for(r = new Array(q); ++p < q;)
        for(r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i],
            x[2][i] = (x[2][i] + 1) % l), r[p][i] =  v[x[3][i]])
            for(x[3][i] = x[2][i], f = 0; !f; f = !f)
                for(j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));
    return r;
};
*/

nextPermutation = function (init, comb){
  var size = init.length;
  var last = init[size - 1];
  var curLetterIndex = 0;
  console.log("-------------");
  console.log(init);
  console.log(comb);
  console.log(size);
  console.log(last);
  console.log("-------------");
  while (curLetterIndex < size && comb[curLetterIndex] === last){
    curLetterIndex++;
  }
  if (curLetterIndex === size){
    return false;
  }
  else {
    console.log("curLetterIndex : "+curLetterIndex);
    var combBegin = comb.slice(0, curLetterIndex);
    var combEnd = comb.slice(curLetterIndex + 1);
    var combEndIni = combEnd.slice(0);
    combEnd = nextPermutation(combEndIni, combEnd);
    console.log("==> ");
    console.log(combEnd);
    if (combEnd !== false){
      return combBegin.concat(combEnd); 
    }
    else {
      var combSub = comb.slice(0);
      var nextLetter = init[init.indexOf(comb[0]) + 1]; 
      console.log(combSub);
      combSub.splice(combSub.indexOf(nextLetter), 1);
      console.log(combSub);
      var out = combSub.unshift(nextLetter);
      console.log('permut : ');
      console.log(out);
      return out;
    }
  }
};

permutations = function(elems){
  var combs = [];
  var init = elems;
  var combi = init.slice(0);
  while (combi !== false){
    combi = nextPermutation(init, combi);
    combs.push(combi);
  }
  return combs;
};


var ens = [1,2,3,4,5,6];
console.log(permutations(ens));
