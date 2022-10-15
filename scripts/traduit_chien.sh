#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

for mot in $1
do
  echo "============== $mot ================="
  $SCRIPT_DIR/recherche.sh $mot
done
