# Orienté Objet en JS

## Présentation
Le JavaScript est un langage qui possède un fort potentiel pour la programmation orientée objet (abrégée en POO).

Un **objet**, en informatique, est un ensemble cohérent de données et de fonctionnalités qui vont fonctionner ensemble. Pour le dire très simplement, un objet en JavaScript est un conteneur qui va pouvoir stocker plusieurs variables qu’on va appeler ici des propriétés. Lorsqu’une propriété contient une fonction, on appelle alors la propriété une méthode. Un objet est donc un conteneur qui va posséder un ensemble de propriétés et de méthodes qu’il est cohérent de regrouper.

En JavaScript, nous pouvons créer des objets de 4 manières différentes . On va pouvoir :

 - Créer un objet littéral ;
 - Utiliser le constructeur **Object()** ;
 - Utiliser une fonction constructeur personnalisée ;
 - Utiliser la méthode **create()**.

 
## 1 Déclaration d'un objet littéral

exemple :
```javascript
let utilisateur = {
    /*nom, age et mail sont des propriétés de l'objet utilisateur
     *La valeur de la propriété "nom" est un tableau*/
    nom : ['Philippe', 'SIMIER'],
    age : 29,
    mail : 'philippe.simier@ac_nantes.fr',
    
    //presenter est une méthode de l'objet utilisateur
    presenter: function(){
        alert('Bonjour, je suis ' + this.nom[0] + ', j\'ai ' + this.age + ' ans');
    };
    
```
On utilise dans le cas de la création d’un objet littéral **une paire d’accolades** qui indiquent au JavaScript qu’on souhaite créer un **objet**. La variable utilisateur contient une valeur de type objet.
Ce qui nous intéresse particulièrement ici sont les membres de notre objet. Un **membre**  est un couple « nom : valeur », et peut être une propriété ou une méthode. Comme vous pouvez le voir, notre objet est ici composé de différents membres : 3 propriétés et 1 méthode.   
L'instruction **let** permet de déclarer une variable dont la portée est celle du bloc courant.
## Accéder aux membres

Pour accéder aux propriétés et aux méthodes d’un objet, on utilise le caractère point . qu’on appelle également un accesseur. On va ici commencer par préciser le nom de l’objet puis l’accesseur puis enfin le membre auquel on souhaite accéder.
```javascript
console.log(utilisateur.nom[0]);
utilisateur.presenter();
```

## 2 Utiliser une fonction constructeur

Une **fonction constructeur** d’objets est une fonction qui va nous permettre de créer des objets semblables. En JavaScript, n’importe quelle fonction va pouvoir faire office de constructeur d’objets.

Pour construire des objets à partir d’une fonction constructeur, nous allons devoir suivre deux étapes : il va déjà falloir définir notre fonction constructeur et ensuite nous allons appeler ce constructeur avec une syntaxe un peu spéciale utilisant le mot clefs **new**.

L’exemple ici va être de créer une fonction qui va nous permettre de créer des objets possédant les mêmes propriétés nom, age, mail et une méthode presenter() que notre objet littéral.
```javascript
function Utilisateur(n, a, m){
    this.nom = n;
    this.age = a;
    this.mail = m;
    
    this.presenter = function(){
        alert('Bonjour, je suis ' + this.nom[0] + ', j\'ai ' + this.age + ' ans');
    }
}
```
Notez que lorsqu’ on définit un constructeur, on utilise par convention une **majuscule** au début du nom de la fonction afin de bien discerner nos constructeurs des fonctions classiques dans un script.

Dans notre fonction, la ligne `this.nom` suffit à créer une propriété nom pour chaque objet créé via le constructeur. Écrire `this.nom = n` permet également d’initialiser cette propriété.

Lorsqu’on écrit

 `let philippe = new Utilisateur(['Philippe', 'SIMIER'], 29, 'philippe.simier@ac-nantes.fr');
 let mathilde = new Utilisateur(['Mathilde', 'Lissoir'], 27, 'math@gmail.com');`
 
 on crée 2 nouveaux objets philippe & mathilde en appelant la fonction constructeur Utilisateur().

La fonction constructeur doit vraiment être vue en JavaScript comme un plan de base pour la création d’objets similaires et comme un moyen de gagner du temps et de la clarté dans son code. 

L’un des enjeux principaux en tant que développeurs doit toujours être la performance de nos codes. Dans le cas présent, notre code n’est pas optimal puisqu’en utilisant notre constructeur plusieurs fois **on va copier à chaque fois la méthode bonjour() qui est identique pour chaque objet**.

Ici, l’idéal serait de ne définir notre méthode qu’une seule fois et que chaque objet puisse l’utiliser lorsqu’il le souhaite. Pour cela, nous allons recourir à ce qu’on appelle des **prototypes**.

## La propriété prototype

Lorsqu’on créé une fonction, le JavaScript va automatiquement lui ajouter une propriété prototype qui ne va être utile que lorsque la fonction est utilisée comme constructeur, c’est-à-dire lorsqu’on l’utilise avec la syntaxe new.

Par défaut, la propriété prototype d’un constructeur ne contient que deux propriétés : une propriété `constructor` qui renvoie vers le constructeur contenant le prototype et une propriété `__proto__` qui contient elle-même de nombreuses propriétés et méthodes hérités.

Définir des propriétés et des méthodes dans le prototype d’un constructeur nous permet ainsi de les rendre accessible à tous les objets créés à partir de ce constructeur sans que ces objets aient à les redéfinir.

Pour avoir le code le plus clair et le plus performant possible, nous définirons donc généralement les propriétés des objets (dont les valeurs doivent être spécifiques à l’objet) au sein du constructeur.

exemple :
```javascript
function Utilisateur(n, a, m){
    this.nom = n;
    this.age = a;
    this.mail = m;
}
```
et les méthodes (que tous les objets vont pouvoir appeler de la même façon) dans le prototype du constructeur.

```javascript
Utilisateur.prototype.presenter: function(){
        alert('Bonjour, je suis ' + this.nom[0] + ', j\'ai ' + this.age + ' ans');
```
A ce niveau, il faut savoir que tous les objets en JavaScript descendent par défaut d’un objet de base qui s’appelle **Object**.

Cet objet est l’un des objets JavaScript prédéfinis et permet notamment de créer des objets génériques vides grâce à la syntaxe new Object().

## 3 Utiliser la méthode **create()**

La méthode `Object.create()` crée un nouvel objet avec un prototype donné et des propriétés données.
```javascript
var shoe = {size: 6, gender: "women",construction: "slipper"};
var magicShoe = Object.create(shoe);
```
La particularité de Object.create() est que l’argument qui lui est passé (dans notre cas shoe) devient le prototype de notre nouvel objet.
Si vous affichez le contenu de l’objet magic Shoe, vous verrez qu’il ne contient aucune propriété native, toutes les propriétés qu’il contient sont sous forme de prototype hérité de l’objet shoe.

![console](/01_Objet/console_objet.PNG) 

# Changelog

**09/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#


