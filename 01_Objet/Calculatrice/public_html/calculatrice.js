/*
 * @detail Ici, on définit le constructeur Calculatrice.
 * @returns {Calculatrice}
 */

function Calculatrice(contenair)
{
    // la calculatrice est composée d'un objet écran        
    this.ecran = $("#"+contenair+" input#number");
    // et d'un objet clavier qui est lui même composé de boutons        
    this.chiffres = $("#"+contenair+" #clavier .nb");
    this.operateurs = $("#"+contenair+" #clavier .op");
    this.clear = $("#"+contenair+" #clear");
    this.correc = $("#"+contenair+" #correction");
}

// la méthode run 
Calculatrice.prototype.run = function ()
{
    //laCalculatrice contient une référence à  l'objet Calculatrice
    var laCalculatrice = this;
    this.chiffres.click(function () {
        var value = $(this).html();     // la valeur du bouton
        laCalculatrice.concat(value);
    });

    this.operateurs.click(function () {
        var operateur = $(this).html();
        laCalculatrice.calculer(operateur);
    });

    this.clear.click(function () {
        laCalculatrice.effacer();
    });

    this.correc.click(function () {
        laCalculatrice.correction();
    });
};



/* la méthode calculer recherche l'opérateur
 * et appelle la méthode opération avec l'opérateur trouvé
 */

Calculatrice.prototype.calculer = function (operateur)
{
    if (this.ecran.val().indexOf("/", 1) !== -1)
        this.operation("/");
    if (this.ecran.val().indexOf("*", 1) !== -1)
        this.operation("*");
    if (this.ecran.val().indexOf("-", 1) !== -1)
        this.operation("-");
    if (this.ecran.val().indexOf("+", 1) !== -1)
        this.operation("+");

    // le symbole = n'est pas affiché sur l'écran de la calculatrice
    text = this.ecran.val();
    // Cette expression régulière recherche la présence d'un operateur à  la fin de la chaîne ou .
    var maRegex = /[.+*/\-]$/gm;
    var signe = maRegex.test(text);
    if (operateur !== '=' && !signe)
        this.ecran.val(this.ecran.val() + operateur);
};

// la méthode opération
// Effectue le calcul pour un opérateur donné
Calculatrice.prototype.operation = function (operateur)
{
    // la chaine sur l'écran est scindée en plusieurs éléments 
    var numbers = this.ecran.val().split(operateur);

    for (i=0; i<numbers.length; i++){
      console.log('numbers['+i+']->' + numbers[i]);  
    }
    
    if (numbers[1] !== '') {
        if (numbers.length === 2) {
            if (operateur === "/")
                result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
            else if (operateur === "*")
                result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
            else if (operateur === "-")
                result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
            else if (operateur === "+")
                result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
        } else {  // c'est une expression de la forme -1-4 par exemple
            result = -1 * parseFloat(numbers[1]) - parseFloat(numbers[2]);
        }
        if (isNaN(result))
            result = 0;
        // affichage du résultat sur l'écran
        this.ecran.val(result);
    }

};

/*
 * Méthode effacer l'écran
 */
Calculatrice.prototype.effacer = function ()
{
    this.ecran.val('');
};

/*
 * Méthode pour effacer le dernier caractère
 */
Calculatrice.prototype.correction = function ()
{
    var text = this.ecran.val().replace(/.$/, '');
    this.ecran.val(text);
};

/*
 * Méthode pour concaténer les chiffres
 * sur l'écran
 */
Calculatrice.prototype.concat = function (chiffre) {
    
    if (chiffre !== ".") {
        this.ecran.val(this.ecran.val() + chiffre);
    } else {
        text = this.ecran.val();
        // Cette expression régulière recherche la présence d'un nombre à  virgule à  la fin de la chaine
        // A tester sur www.regextester.com/21 
        var maRegex = /(\d+[.]\d*)$/gm;
        var nbVirgule = maRegex.test(text);
        if (!nbVirgule) {
            this.ecran.val(this.ecran.val() + '.');
        }
    }
};