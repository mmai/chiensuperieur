#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
DICT_DIR=$SCRIPT_DIR/../dictionnaires

grep -n '^'$1'$' $DICT_DIR/mots_francais_chien.txt  | awk -F':' '{print $1}' > /tmp/last
for line in $(cat /tmp/last)
do
  LAST=$line"q"
  sed "$LAST;d" $DICT_DIR/liste.de.mots.francais.sansaccents.txt
done
