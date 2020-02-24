# Les indicateurs SMA & EMA

## Présentation
**SMA** : Simple Mobile Average
**EMA**: Exponantiel Mobile Average

La moyenne mobile, ou moyenne glissante, est un type de moyenne statistique utilisée pour analyser des séries ordonnées de données, le plus souvent des séries temporelles, en supprimant les fluctuations transitoires de façon à en souligner les tendances à plus long terme. 

Ce type de moyenne est utilisé généralement comme méthode de lissage de valeurs.
Mathématiquement, toute moyenne mobile est une **convolution**.
Physiquement, une moyenne mobile est un **filtre passe-bas**. En particulier, la **EMA**  moyenne mobile exponentielle est un **filtre linéaire passe-bas du premier ordre** tout à fait classique.

## Méthode de calcul

C'est une moyenne qui au lieu d'être calculée sur l'ensemble des n valeurs d'un échantillonnage, est calculée tour à tour sur chaque sous-ensemble de N valeurs consécutives (N ≤ n). Le sous-ensemble utilisé pour calculer chaque moyenne,  appelé « fenêtre », « glisse » sur l'ensemble des données.

![Moyenne glissante](/FiltrageSMA/SMA.PNG)
 
## Le module indicators de highcharts

# Changelog

**24/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#





