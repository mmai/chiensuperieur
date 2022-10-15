# Chien supérieur

Quelques scripts pour tenter de décrypter le texte final de _Le Labrador : une vie_, dixième chapitre du "multiroman" _Nous, les moins-que-rien, fils aînés de personne_ de Jacques Roubaud.  

Le chien supérieur "simple" utilisé dans _La princesse Hoppy, ou le conte du Labrador_ a été [décodé par Dominique Fagnot](./doc/chien_superieur.pdf)

Décoder le chien supérieur "simple" vers du chien ordinaire : 
`./scripts/chienSuperieur2chien.sh ./input/chien_superieur1.txt`

Et si vous avez du mal à lire le chien ordinaire :
`./scripts/chien2francais.sh  "$(./scripts/chienSuperieur2chien.sh ./input/chien_superieur1.txt)"`
