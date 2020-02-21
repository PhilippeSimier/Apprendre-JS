# hiérarchie d’objets avec héritage 

## Présentation

Lorsqu’on a compris comment le langage JavaScript utilise le prototypage, on est capable de créer **une hiérarchie d’objets** avec des objets qui héritent des membres d’autres objets.

Quel intérêt à faire cela ? Parfois, nous voudrons créer des types d’objets relativement proches. Plutôt que de redéfinir un constructeur entièrement à chaque fois, il va être plus judicieux de créer un constructeur de base qui va contenir les propriétés et méthodes communes à tous nos objets puis des constructeurs plus spécialisés qui vont hériter de ce premier constructeur.

Pour mettre en place un héritage ou plus exactement un système de délégation (qui est un mot beaucoup plus juste que le terme « héritage » dans le cas du JavaScript), nous allons toujours procéder en trois étapes :

 1. On va déjà créer un constructeur qui sera notre constructeur parent   ;
 2. On va ensuite créer un constructeur enfant qui va appeler le parent ;
 3. On va modifier la propriété `prototype`  de l’enfant pour qu’elle soit égale au parent.

## Exemple
1 Création du constructeur parent **Personne()**
```javascript
function Personne(prenom, nom, age, genre, interets) {
    this.nom_complet = {
        prenom,
        nom
    };
    this.age = age;
    this.genre = genre;
    this.interets = interets;                
};
```
On ajoute ensuite une première méthode **saluer** dans le prototype de notre constructeur. Cette méthode appartient au constructeur et sera partagée par tous les objets créés à partir de celui-ci. 
```javascript
Personne.prototype.saluer = function() {
    alert('Bonjour ! Je m\'appelle ' + this.nom_complet.prenom + '.');
};
```
2 On crée ensuite un deuxième constructeur Professeur(). 
```javascript
function Professeur(prenom, nom, age, genre, interets, matiere) {
    Personne.call(this, prenom, nom, age, genre, interets);
    // ajout d'un attribut spécifique pour profeseur
    this.matiere = matiere;
}
```
Dans ce constructeur, vous pouvez remarquer la ligne `Personne.call(this, prenom, nom, age, genre, interets);`.
On l’utilise ici pour faire appel au constructeur **Personne()**. Le mot clef this permet de faire référence à l’objet courant et de passer les valeurs de l’objet relative aux propriétés prenom, nom, age, genre, interets.  Les attributs de professeurs sont créées.

Il reste à recopier les méthodes de Personne qui sont dans son prototype. On va donc cloner l'objet prototype de Personne() grâce à la méthode create().
```javascript
Professeur.prototype = Object.create(Personne.prototype);
```
Cela permet à Professeur d’hériter des propriétés et méthodes définies dans le prototype de Personne.
Il  reste cependant une chose à régler ici : il va nous falloir rétablir la valeur de la propriété constructor de prototype de Professeur car la ligne précédente a eu pour effet de définir Professeur.prototype.constructor comme étant égal à celui de Personne().
```javascript
Professeur.prototype.constructor = Professeur;
```
Finalement on surcharge  la méthode saluer() du prototype de Professeur.
```javascript
Professeur.prototype.saluer = function() {
    var prefix;

    if (this.genre === 'homme' || this.genre === 'Homme' || this.genre === 'h' || this.genre === 'H') {
        prefix = 'M.';
    } else if (this.genre === 'femme' || this.genre === 'Femme' || this.genre === 'f' || this.genre === 'F') {
        prefix = 'Mme';
    } else {
        prefix = '';
    }

    alert('Bonjour. Mon nom est ' + prefix + ' ' + this.nom_complet.nom + ', et j\'enseigne ' + this.matiere + '.');
};
```
## 2 Examinons la chaîne d'héritage
Nous avons une méthode `isPrototypeOf()` pour savoir si une propriété est native ou héritée d’un prototype ;
```
Object.prototype.isPrototypeOf(professeur2);
true
```
Cette instruction retourne true car professeur2 hérite des propriétés de l’objet Object (qui est l’objet par défaut, le parent de tous les objets).
```
Personne.prototype.isPrototypeOf(professeur1);
true
```
Cette instruction retourne true car professeur1 à hérité dans son prototype de toutes les propriétés de Personne.
```
Professeur.prototype.isPrototypeOf(etudiant1);
false
```
Logiquement l'instruction retourne false car etudiant1 n’hérite pas des propriétés de Professeur.  En faite etudiant1 à hérité des propriétés de Personne.

# Changelog

**20/02/2020 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans
>  ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#





