/*
 * Une Calculatrice 4 opérations
 * @author Philippe SIMIER SNIR Lycée Touchard Le Mans
 * @version version 2.0
 * @description var maCalculatrice = new Calculatrice("calc");
 *               
 */

/*
 * @detail Fonction auto invoquée
 *         Elle permet de créer un conteneur pour le script
 *         le "use strict"; dit au navigateur que tout ce qui se trouve dans cette fonction 
 *         devra être traité par un parseur strict 
 * @returns {undefined}
 */
(function () {
    "use strict";

    /*
     * @detail Constructeur Calculatrice.
     * @param {type} contenair
     * @returns {Calculatrice}
     */

    function Calculatrice(contenair)
    {
        $(contenair).html('<div  class="calculatrice">'
                + '<input type="text" id="number" value="0" autocomplete="off" disabled />'
                + '<div id="clavier">'
                + '	<div class="row">'
                + '          <button type="button" class="btn nb">7</button>'
                + '          <button type="button" class="btn nb">8</button>'
                + '	    <button type="button" class="btn nb">9</button>'
                + '	    <button type="button" class="btn op">/</button>'
                + '	</div>'
                + '	<div class="row">'
                + '	    <button type="button" class="btn nb">4</button>'
                + '	    <button type="button" class="btn nb">5</button>'
                + '	    <button type="button" class="btn nb">6</button>'
                + '	    <button type="button" class="btn op">*</button>'
                + '	</div>'
                + '	<div class="row">'
                + '	    <button type="button" class="btn nb">1</button>'
                + '	    <button type="button" class="btn nb">2</button>'
                + '	    <button type="button" class="btn nb">3</button>'
                + '	    <button type="button" class="btn op">-</button>'
                + '	</div>'
                + '	<div class="row">'
                + '	    <button type="button" class="btn nb">0</button>'
                + '	    <button type="button" class="btn nb">.</button>'
                + '	    <button type="button" class="btn op">=</button>'
                + '	    <button type="button" class="btn op">+</button>'
                + '	</div>'
                + '        <div class="row">'
                + '	    <button type="button" class="btn double" id="clear">CL</button>'
                + '            <button type="button" class="btn double" id="correction">&larr;</button>'
                + '	</div>'
                + '    </div>'
                + '</div>');
        // la calculatrice est composée d'un objet écran        
        this.ecran = $(contenair + " input#number");
        // et d'un objet clavier qui est lui même composé de boutons        
        this.chiffres = $(contenair + " #clavier .nb");
        this.operateurs = $(contenair + " #clavier .op");
        this.clear = $(contenair + " #clear");
        this.correc = $(contenair + " #correction");
        this.run();
    }

// la méthode run connecte les évènements (click) aux methodes
    Calculatrice.prototype.run = function ()
    {
        //laCalculatrice contient une référence à  l'objet Calculatrice
        let laCalculatrice = this;
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
        let text = this.ecran.val();
        // Cette expression régulière recherche la présence d'un operateur à  la fin de la chaîne ou .
        let maRegex = /[.+*/\-]$/gm;
        let signe = maRegex.test(text);
        if (operateur !== '=' && !signe)
            this.ecran.val(this.ecran.val() + operateur);
    };

// la méthode opération
// Effectue le calcul pour un opérateur donné
    Calculatrice.prototype.operation = function (operateur)
    {

        let result;
        // la chaine sur l'écran est scindée en plusieurs éléments 
        let numbers = this.ecran.val().split(operateur);

        for (let i = 0; i < numbers.length; i++) {
            console.log('numbers[' + i + ']->' + numbers[i]);
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
        let text = this.ecran.val().replace(/.$/, '');
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
            let text = this.ecran.val();
            // Cette expression régulière recherche la présence d'un nombre à  virgule à  la fin de la chaine
            // A tester sur www.regextester.com/21 
            let maRegex = /(\d+[.]\d*)$/gm;
            let nbVirgule = maRegex.test(text);
            if (!nbVirgule) {
                this.ecran.val(this.ecran.val() + '.');
            }
        }
    };

    /* On rend notre Calculatrice accessible au reste du monde */
    window.Calculatrice = Calculatrice;
})();