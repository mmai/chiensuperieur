#!/usr/bin/env bash

grep -n '^'$1'$' mots_francais_chien.txt  | awk -F':' '{print $1}' > /tmp/last
for line in $(cat /tmp/last)
do
  LAST=$line"q"
  sed "$LAST;d" liste.de.mots.francais.sansaccents.txt
done
