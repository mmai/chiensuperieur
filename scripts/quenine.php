<?php
# cf. https://www.oulipo.net/fr/contraintes/n-ine
#
$input = $argv[1];

function quenineNext(string $input): string {
  $chars = str_split($input);
  $halfCount = floor(count($chars) / 2);
  $doubled = array_slice($chars,0,$halfCount);
  $complement = array_slice($chars,$halfCount);
  $out = "";
  while (!empty($complement)){
    $out .= array_pop($complement);
    if ($char = array_shift($doubled)){
      $out .= $char;
    }
  }
  return $out;
}

function quenine(string $input):array {
  $strophe = $input;
  $strophes = [];
  do {
    $strophes[] = $strophe;
    $strophe = quenineNext($strophe);
  } while ($strophe != $input);
  return $strophes;
}

$strophes = quenine($input);
foreach($strophes as $strophe){
  echo "$strophe\n";
}
