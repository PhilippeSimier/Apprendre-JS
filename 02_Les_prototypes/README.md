# Les prototypes en JS

## Présentation
La programmation orientée **prototype** est une forme de programmation orientée objet sans classe, fondée sur la notion de prototype. Un prototype est un objet à partir duquel on crée de nouveaux objets. Le fonctionnement de l'héritage en JavaScript peut-être parfois un peu déroutant dans ce README  de nombreux exemples tenteront de vous éclairer sur ce sujet.

En JavaScript les string, numbers, array.. ont des propriétés héritées par des objets parents, appelés prototypes.

#### **exemple** :
```javascript 
var myArray = ["Pierre", "Paul", "Jacques"];
```
L' objet myArray contient aussi des méthodes. Vous pouvez voir la liste des méthodes contenues en affichant votre objet dans la console de votre navigateur.
Les méthodes sont héritées de l'objet parent  Array. Elles sont référencées dans la propriétées `__proto__`. Noté aussi que la propriété `__proto__` contient aussi un `__proto__` de l'objet **Object**.

![console](/02_Les_prototypes/console0.PNG) 

Lorsque l’on demande une fonction à un objet,  **Array** `myArray.sort();` . JavaScript va d’abord regarder si cet objet contient la fonction demandée, si ce n’est pas le cas JavaScript vérifiera dans l’objet parent si cette fonction existe jusqu’à remonter au premier objet qui à servi de base à l’héritage (Object).

En Javascript les fonctions sont aussi des objets
#### **exemple** :
```javascript 
function maFonction(){
  return "Les fonctions ont des propriétés!";
};
```
![console](/02_Les_prototypes/console0.PNG) 

##1 Ajouter des propriétés héritables

Nous pouvons donc ajouter des méthodes à un type d’objet particulier que nous pourrons retrouver dans tous les futurs objet de ce « type ». Mais concrètement comment pouvons-nous le faire ? Il nous suffit d’ajouter une propriété héritable dans ce que l’on appelle le **prototype** !

En fait le **prototype** est une base, comme une voiture de base sans option, toutes les voitures de ce modèle sont faites à partir de ce modèle de base. Ensuite viennent se rajouter des options (ici des propriétés)

Concrètement, imaginons que nous voulions créer une fonction qui compterait le nombre de fois ou une lettre précise est utilisée dans un string. Nous voulons donc que cette fonction soit accessible sur tous les objets de type string, de la même manière que length par exemple.
```javascript
var firstString = "Hello World ! I'm Philippe, and you ?";
var secondString = "What's your lastname ?";


String.prototype.countAll = function(letter){

    var letterCount = 0;
    for(var i = 0; i < this.length; i++){ // this fait référence à l'objet courant
        if(this.charAt(i).toUpperCase() === letter.toUpperCase()){
            letterCount++;
        }
    }
    return letterCount;
};

console.log(firstString.countAll(' '));
```
Maintenant que nous avons ajouté cette méthode au prototype des strings nous pouvons appeler cette méthode sur toutes les strings.

## 2 Réécrire une propriété / issue d'un prototype (héritage)

Comme vous le savez les objet JavaScript ont de base des méthodes hérités. En effet nous pouvons par exemple appeler .valueOf() sur un array, string, object…Mais si nous voulions modifier le comportement de valueof() ?
#### **exemple** :
```javascript
function Tornade(category, affectedAreas, windGust){
    this.category = category;
    this.affectedAreas = affectedAreas;
    this.windGust = windGust;
};
// autre écriture var Tornado = function(category, affectedAreas, windGust){...};

var cities = [ ["Kansas", 46310],["Torpeka",123939],["Lenexa", 49398]];
var twister = new Tornade("F5",cities,220);

console.log(twister.valueOf());

// réécrire de valueOf pour que l'objet Tornade retourne le nombre de personnes affectées par la tornade.

Tornade.prototype.valueOf = function(){
  var sum = 0;
  for (var i = 0; i < this.affectedAreas.length; i++){
    sum += this.affectedAreas[i][1];
  }
  return sum;
};

console.log(twister.valueOf());
```
Il est important de souligné que nous avons réécrit valueOf uniquement dans l’objet Tornade, nous n’avons pas touché à la définition de cette fonction dans l’objet parent.

## Trouver le constructeur / de l'objet et son prototype

Pour connaitre le constructeur Il suffit donc d’appeler dans la console
```
twister.constructor
ƒ Tornade(category, affectedAreas, windGust){
    this.category = category;
    this.affectedAreas = affectedAreas;
    this.windGust = windGust;
}
```
On peut voire que twister est un objet de type **Tornade**.

On peut afficher dans la console de la même façon le  prototype du constructeur
```
twister.constructor.prototype;
	{valueOf: ƒ, toString: ƒ, constructor: ƒ}
	valueOf: ƒ ()
	toString: ƒ ()
	constructor: ƒ Tornade(category, affectedAreas, windGust)
	__proto__: Object
```
On peut voir que les méthode **valueOf** et **toString** de Object ont été réécrites.
On peut obtenir le même affichage avec

    twister.__proto__;

## Identifier l'origine / d'une propriété

Il est utile de savoir d’où vient la propriété d’un objet. En fait l’objectif est de savoir si l propriété est héritée ou native à l’objet. Pour ce faire nous allons ajouter une méthode **findOwnerOfProperty** au prototype de **Object**.  JavaScript à pensé à tout avec la fonction **hasOwnProperty()**; imaginons que nous voulions savoir d’où vient une propriété, nous pourrions créer une fonction qui chercherait la propriété dans l’objet courant, puis si elle n’est pas là, dans l’objet parent, etc…
```javascript
/**
 * Méthode pour trouver le propriétaire d'une propriété
 * @param {type} propName
 * @returns {Object|String}
 */
Object.prototype.findOwnerOfProperty = function(propName){
  var currentObject = this;
  while (currentObject !== null){   // le dernier  __proto__ de la chaîne est null
      if(currentObject.hasOwnProperty(propName)){
        return currentObject.constructor; // La propriété est trouvé le constructeur à le même nom que l'objet propriétaire
      }else{
        currentObject = currentObject.__proto__; // On remonte au parent pour reverifier
      }
  }
  return "No property found !"; // On a rien trouvé :(
};

console.log(twister.findOwnerOfProperty("toString"));
console.log(firstString.findOwnerOfProperty("hasOwnProperty"));
```

# Changelog

**20/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#



