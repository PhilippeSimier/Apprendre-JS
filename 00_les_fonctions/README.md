# Les fonctions

## Présentation

JavaScript permet de créer des **fonctions** que nous pourrons stocker dans des variables. Bienvenue dans le monde des fonctions expression ou en français des expressions en tant que fonctions. Ce concept est indispensable en JavaScript car il est très utilisé, mais pourquoi ? En fait la différence entre fonction déclaré et une fonction expression est lié à la façon dont le navigateur interprète et stock en mémoire ces informations.

Dans le cas d’une fonction déclarée de manière classique, toute la fonction est chargée dans la mémoire du navigateur même si elle n’est pas utilisée immédiatement. À la différence des expressions de fonction (ou fonction expression) qui elles sont appelées quand l’interpréteur atteint cette ligne de code.

## La déclaration d'une fonction
Il y a plusieurs façons de définir des fonctions.
Avec une instruction qui commence par le mot clé `function` 

**Exemple 1**
```javascript
function kingOfCool() {
    alert('Message de king');
}
```
Les instructions qui déclarent des fonctions mais qui ne commencent pas avec le mot clé `function` sont des expressions de fonction.

**Exemple 2 - Expression de fonction anonyme**
(il n'y a pas de nom utilisé) 
```javascript
let maFonctionAnonyme = function () {
    alert('Message anonyme');
};
```
Ne pas oublier le **;** à la fin, car cela reste une variable comme une autre.
Ici, on affecte notre fonction anonyme à une variable **maFonctionAnonyme**.
Notre variable contient donc ici une valeur complexe qui est une fonction et on va désormais pouvoir l’utiliser comme si c’était la fonction elle-même.
Pour « invoquer notre fonction» c'est à dire pour exécuter le code de la fonction qu’elle contient, il faut écrire le nom de la variable suivi d’un couple de parenthèses. 
```javascript
maFonctionAnonyme();
```

**Exemple 3 - Expression de fonction nommée**
```javascript
let maFonctionNommee = function monNom() {
    alert('Message de fonction nommée');
};
``` 
L'un des bénéfices d'utiliser une expression de fonction nommée est que son nom sera utilisé dans la pile d'appel lorsqu'on aura une erreur. Avec le nom de la fonction, il sera plus facile de repérer l'origine de l'erreur.
l'exécution de la fonction nommée se fait de la même façon que pour une fonction anonyme.
```javascript
maFonctionNommee();
```
## Auto invoquer une fonction
Une autre façon d’exécuter une fonction  va être de créer une fonction  qui va s’auto-invoquer c’est-à-dire qui va  s’appeler ou encore s’exécuter elle-même dès sa création.

Pour créer une fonction auto-invoquée à partir d’une fonction, il faut tout simplement  rajouter un couple de parenthèses autour de la fonction et un second couple après le code de la fonction.

Exemple :
``` javascript
(function(){
    alert('rouge');
})()
```
On ne met pas la fonction dans une variable, on l’enferme dans des parenthèses, ce qui permet de garder la référence le temps de l’appeler, puis on l’appelle. 
On fait la même chose que précédemment , on saute juste l'étape de mémorisation dans une variable.  
Cependant il faut juste réaliser que le bout de code ci-dessous fait EXACTEMENT la même chose que le bout de code juste au dessus :
``` javascript
	alert('rouge');
```
**Alors qu'elle peut bien être l'intérêt d'auto-invoquer !!!**

En créant une fonction, on crée un **scope**. Ainsi, tout ce qui est déclaré avec **var** ou **let** dans la fonction sera garanti de ne pas être une variable globale. il n'y aura pas d’effet de bord sur le monde extérieur. Et le monde extérieur n’aura pas accès aux variables déclarées dans la fonction. Par contre la fonction a accès aux variables globales !
Il est donc **une bonne pratique de mettre TOUT son script dans une fonction qui s’auto-appelle**, pour l’isoler du monde extérieur et ne pas polluer le namespace global. 

Voir l'exemple de calculatrice

## Une fonction comme paramètre d'une fonction

Le paramètre d'une fonction peut être une fonction puisqu'une fonction est un objet.

**Exemple 4 - avec une fonction de la librairie jQuery**
```javascript
$("#element4").on('click', maFonctionAnonyme);
```
Cette instruction permet d'associer l’événement **click** sur l'élément html ayant l'id element4, à la fonction maFonctionAnonyme.

**Exemple 5**

Avec la méthode array.map() , pour rappel array.map() permet d’appliquer un traitement à n’importe quelle valeur d’un array (de manière individuelle) et renvoyer cette nouvelle version de l’array.
```javascript
var multiplicateur = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var table7 = multiplicateur.map(function (arrayCell) {
        return arrayCell * 7;
});

console.log(table7);
```
##  Une fonction comme retour d'une fonction

On peut retourner une fonction depuis une autre fonction.
Voir l'exemple promenade dans un parc.



# Changelog

**22/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#





