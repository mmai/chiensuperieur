#!/usr/bin/env bash

# usage : `./chienSuperieur2chien.sh ../input/chien_superieur1.txt`

nextPerm() {
  echo ${1:1}${1:0:1} # abcd => bcda
}

INPUT=$1

# la première indication (chien_superieur1)
BASE="ulnoatcesir"
PERM=$BASE
while read line; do 
  PERM=$(nextPerm $PERM)
  echo $line | tr '[:upper:]' '[:lower:]' | tr $BASE $PERM
done < $INPUT

echo "--------"

# --------------- la nouvelle première indication (chien_superieur2)
# BASE="ulnoatcesir"
# PERM=$BASE
#   PERM=$(nextPerm $PERM)
#   PERM=$(nextPerm $PERM)
# while read line; do 
#   PERM=$(nextPerm $PERM)
#   echo $line | tr '[:upper:]' '[:lower:]' | tr $BASE $PERM
# done < $INPUT

# ------------ nombres de Queneau
QUENEAU_LIST=(1 2 3 5 6 9 11 14 18 23 26 29 30 33 35 39 41 49 50 53)
COUNT=0
while read line; do 
  QUENEAU=${QUENEAU_LIST[$COUNT]}
  echo $line | tr -cd '[:alpha:]' | tr '[:upper:]' '[:lower:]' | head -c $QUENEAU | tail -c 1
  echo ""
  COUNT=$((COUNT+1))
done < $INPUT
