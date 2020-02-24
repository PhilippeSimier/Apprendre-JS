# Les indicateurs SMA & EMA

## Présentation
Les indicateurs techniques,  sont des outils qui aident à comprendre les graphiques et à prendre des décisions en toute simplicité. Les algorithmes mathématiques utilisent les données d'une série existantes pour indiquer les tendances, les événements, etc.
Les modules d'indicateurs techniques sont implémentés en série, ce qui signifie qu'ils produisent de nouvelles séries de données.

**Exemple de graphique obtenue** avec un indicateur technique SMA (48)

![Graphique SMA](/FiltrageSMA/GraphiqueSMA.PNG)

## L'indicateur SMA
**SMA** : Simple Mobile Average

La moyenne mobile, ou moyenne glissante, est un type de moyenne statistique utilisée pour analyser des séries ordonnées de données, le plus souvent des séries temporelles, en supprimant les fluctuations transitoires de façon à en souligner les tendances à plus long terme. 

Ce type de moyenne est utilisé généralement comme méthode de lissage de valeurs.
Mathématiquement, toute moyenne mobile est une **convolution**.
Physiquement, une moyenne mobile est un **filtre passe-bas**. En particulier, la **EMA**  moyenne mobile exponentielle est un **filtre linéaire passe-bas du premier ordre** tout à fait classique.

### Algorithme de calcul SMA

C'est **une moyenne arithmétique** qui au lieu d'être calculée sur l'ensemble des n valeurs d'un échantillonnage, est calculée tour à tour sur chaque sous-ensemble de N valeurs consécutives (N ≤ n). Le sous-ensemble utilisé pour calculer chaque moyenne,  appelé « fenêtre », « glisse » sur l'ensemble des données.

**Exemple avec N = 3**
![Moyenne glissante](/FiltrageSMA/SMA.PNG)
 
## L'indicateur EMA

Une moyenne mobile exponentielle utilise une pondération des termes qui décroît exponentiellement. Le poids de chaque valeur participant à la moyenne est d'un facteur plus grand que la valeur qui le précède dans la série, ce qui donne plus d'importance aux observations les plus récentes, sans toutefois jamais supprimer complètement l'effet des valeurs les plus anciennes.
Une constante de lissage contrôle le degré de décroissance des poids applicables à chaque observation participant à la moyenne. Cette constante, α, est un nombre compris entre 0 et 1 ; elle peut être exprimée à partir du nombre de période.

    alpha = 2 / (N+1)
[Article sur wikipedia](https://fr.wikipedia.org/wiki/Moyenne_mobile#Point_de_vue_classique)    

## Hightcharts Le module indicators

Les indicateurs techniques nécessitent le module principal `indicators/indicators.js` . Le module principal comprend SMA (Simple Moving Average). Chaque indicateur technique, à l'exception du SMA, est un module distinct et doit être chargé après le module principal.
```javascript
<script src="//code.highcharts.com/stock/indicators/indicators.js"></script>
<script src="//code.highcharts.com/stock/indicators/ema.js"></script>
```
Les modules d'indicateurs techniques sont implémentés en série, ce qui signifie que presque toutes les options par défaut pour les séries sont disponibles. L'option principale, qui doit être définie pour un indicateur, est `series.linkedTo`. Cette option lie un indicateur à une série contenant des data. 

Chaque indicateur a sa propre liste de paramètres, disponible sous `params`. 
Exemple `params: { period: 14 }`

L'exemple suivant crée un graphique avec une série de data et trois indicateurs, deux SMA et une EMA:
```javascript
series: [{
  id: ‘main-series’,
  data: [ … ]
}, {
  type: ‘sma’,
  linkedTo: ‘main-series’,
  params: {
    period: 14
  }
}, {
  type: ‘sma’,
  linkedTo: ‘main-series’,
  params: {
    period: 28
  }
}, {
  type: ‘ema’,
  linkedTo: ‘main-series’,
  params: {
    period: 7
  }
}]
```
# Changelog

**24/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#





