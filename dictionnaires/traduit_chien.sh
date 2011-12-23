#!/bin/bash

for mot in $1
do
  echo "============== $mot ================="
  ./recherche.sh $mot
done
