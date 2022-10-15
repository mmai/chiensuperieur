#!/usr/bin/env bash

# usage : `./solutions.sh ../input/chien_superieur1.txt`

nextPerm() {
  echo ${1:1}${1:0:1} # abcd => bcda
}

INPUT=$1

# BASE="ulcerations"
BASE="ulnoatcesir"
PERM=$BASE
while read line; do 
  PERM=$(nextPerm $PERM)
  echo $line | tr $BASE $PERM
done < $INPUT

# NB_LINES=$(wc -l < $INPUT)
# for i in $(seq 1 $NB_LINES); do 
#   PERM=$(nextPerm $PERM)
#   sed "${i}q;d" $INPUT | tr $BASE $PERM # sed 'Nq;d' file => ecrit la Nieme ligne du fichier
# done
