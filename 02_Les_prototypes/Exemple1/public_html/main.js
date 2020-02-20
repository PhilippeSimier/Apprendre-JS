// Exemple 1
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

// Exemple 2  
function Tornade(category, affectedAreas, windGust){
    this.category = category;
    this.affectedAreas = affectedAreas;
    this.windGust = windGust;
};
// autre écriture var Tornado = function(category, affectedAreas, windGust){...};

var cities = [ ["Kansas", 46310],["Torpeka",123939],["Lenexa", 49398]];
var twister = new Tornade("F5",cities,220);

console.log(twister.valueOf());

// re-ecrire valueOf pour que l'objet Tornade retourne le nombre de personnes affectées par la tornade.

Tornade.prototype.valueOf = function(){
  var sum = 0;
  for (var i = 0; i < this.affectedAreas.length; i++){
    sum += this.affectedAreas[i][1];
  }
  return sum;
};


console.log(twister.valueOf());

/**
 * nous voulons que la function toString() sur l'objet Tornade renvoie 
 * la liste des villes affectées par cette tornade avec d’autres informations 
 * plus globale sur la situation dans une belle phrase.
 * Cette tornade a une catégorie classé F5, 
 * avec des rafales de vent jusqu'à 220 mph Les zones touchées sont: 
 * Kansas, Torpeka, Lenexa, affectant potentiellement une population de 219647
 */

Tornade.prototype.toString = function(){
  var list = "";

  for (var i = 0; i < this.affectedAreas.length; i++){
      list = list +this.affectedAreas[i][0]+', ';
  }

  return "Cette tornade a une catégorie classé " + this.category +
          ", avec des rafales de vent jusqu'à  " + this.windGust +
          " mph Les zones touchées sont: " + list +
          ", affectant potentiellement une population de " + this.valueOf();

};

console.log(twister.toString());
/**
 * Méthode pour trouver le propriétaire d'une propriété
 * @param {type} propName
 * @returns {Object|String}
 */
Object.prototype.findOwnerOfProperty = function(propName){
  var currentObject = this;
  while (currentObject !== null){   // le dernier  __proto__ de la chaîne est null
      if(currentObject.hasOwnProperty(propName)){
        return currentObject.constructor; // La propriété est trouvé le constructeur à le même que le propriétaire
      }else{
        currentObject = currentObject.__proto__; // On remonte au parent pour reverifier
      }
  }
  return "No property found !"; // On a rien trouvé :(
};

console.log(twister.findOwnerOfProperty("toString"));
console.log(firstString.findOwnerOfProperty("hasOwnProperty"));