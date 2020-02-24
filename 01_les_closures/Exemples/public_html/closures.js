/*
 * Exemple d'une fonction retournant une fonction
 * @param {type} nom
 * @returns {direBonjour.dire}
 */

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

// autre possibilité
direBonjour("Didier")();

/** Exemple 2
 *  Modification d'une variable après la définition de la fonction de retour
 * @returns {multiplicationParDeux.fonction}
 */
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
maFonction();

