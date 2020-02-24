# Les closures (Fermeture)

## Présentation
**closure** ce dit aussi **fermeture** en français 
Vous connaissez surement la portée des variables en javascript. Elle est définie par le scope. En effet si une variable est définie à l'intérieure d'une fonction celle-ci n'est pas accessible à l'extérieur de cette même fonction. Cependant que se passe t'il quand une fonction retourne une fonction ? Les variables contenues dans cette fonction seront elles accessibles ? 

Lorsque vous utilisez le mot-clé **function** pour créer une **fonction dans une fonction**, alors vous êtes en train de créer une **closure**.  L'utilisation des **closures** a surtout lieu quand une fonction transmet une fonction à une autre fonction ou retourne une fonction.

Une closure est la pile de mémoire associée à une fonction. Cette pile mémorise les variables locales utilisées par la fonction au moment de sa destruction. Dans la plupart des langages de programmation, lorsque l'exécution d'une fonction se termine, les variables locales de la fonction sont détruites. Ce n'est pas le cas en JavaScript : elles sont sauvegardées dans une closure. 

## Exemple
```javascript
function direBonjour(nom)
{
    var texte = 'Bonjour ' + nom;    // Variable locale
    var dire = function () {
        console.log(texte);
    };
    return dire;
}

var maFonction = direBonjour('Philippe');
maFonction(); // logs Bonjour Jean
```
Dans cet exemple la fonction direBonjour retourne une fonction, lorsque l’on assigne son résultat à une variable. L’exécution de celle-ci nous retourne la valeur de la variable texte.
Ici la variable maFonction est une closure  qui contient la fonction direBonjour et une référence à la variable var texte = "Bonjour" + nom qui existait lorsque la closure  a été créée.
```javascript
direBonjour("Philippe")();
```
Cela fonctionne en JavaScript grâce à l'existence de la closure dans laquelle les variables locales de la fonction ont été conservées. Il faut également savoir que les variables sauvegardées ne sont pas copiées, ce sont des références. Si après avoir déclaré une fonction utilisant une variable locale, vous modifiez ensuite cette variable locale avant de retourner la fonction, alors un appel de la fonction retournée montrera que la variable a été modifiée. 

```javascript
function multiplicationParDeux() {
    // Variable locale utilisée pour démontrer la closure
    var chiffre = 10;
    var fonction = function () {
        console.log(chiffre * multiplicateur);
    };
    chiffre = chiffre * 2;  
    var multiplicateur = 10;
    return fonction;
}
var maFonction = multiplicationParDeux();
maFonction(); // Affiche 200 dans la console
```

# Les fermetures en pratique

Voici un exemple concret : si on souhaite ajouter des boutons à une page afin d'ajuster la taille du texte, on pourrait définir la taille de police de l'élément body en pixels, et celles des autres éléments relativement à cette première taille grâce à l'unité em :
[l'exemple sur MDN ](https://developer.mozilla.org/fr/docs/Web/JavaScript/Closures)


# Changelog

**22/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#





