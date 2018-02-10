
// classe calculatrice
/**  JavaScript utilise une fonction comme constructeur pour définir un objet. 
 * On définit les propriétés et méthodes d'un objet en définissant une fonction 
 * qui sera utilisée par la suite pour construire l'objet souhaité. 
 * Ici, on définit un constructeur calculatrice.**/

function calculatrice()
{
    console.log('Nouvel objet calculatrice créé');
    //that contient une référence à  l'objet calculatrice
    that 		= this, 
    // la calculatrice est composée d'un objet écran        
    this.ecran  = $("input#number"),  
    // et d'un objet clavier qui est lui même composé de boutons        
    this.chiffres = $("#clavier .nb"),
    this.operateurs = $("#clavier .op"),
    this.clear = $("#cl"),
    this.larr = $("#larr"),
	
    // la méthode run 
    this.run = function()
    {
        that.chiffres.click(function() {
            var value = $(this).html();     // la valeur du bouton
			console.log('clique sur le chiffre '+value);
            if (value != "."){
                that.ecran.val(that.ecran.val() + value);
            }else{ 
                text = that.ecran.val();
				// Cette expression régulière recherche la présence d'un nombre à  virgule à  la fin de la chaine
				// A tester sur www.regextester.com/21 
				var maRegex = /(\d+[.]\d*)$/gm;
				var nbVirgule = maRegex.test(text); 
                if (!nbVirgule) {
                    that.ecran.val(that.ecran.val() + '.');
                }
            }
            
		});
        
        
		
		that.operateurs.click(function(){
            var operateur = $(this).html();
            console.log('clique sur l\'opérateur '+ operateur);
            
			that.calculer();
				   
            // le symbole = n'est pas affiché sur l'écran de la calculatrice
			text = that.ecran.val();
			// Cette expression régulière recherche la présence d'un operateur à  la fin de ma chaîne ou .
			var maRegex = /[.+*/\-]$/gm;
			var signe = maRegex.test(text);
            if (operateur != '=' && !signe)
                that.ecran.val(that.ecran.val() + operateur);
        });
        
		
        // un clique sur clear efface l'écran
        that.clear.click(function(){
            console.log('clique sur RAZ ');    
            that.ecran.val('');
        });
        
        // un clique sur larr efface le dernier caractère 
        that.larr.click(function(){
               console.log('clique sur correction ');
               var text = that.ecran.val().replace(/.$/, '');
               that.ecran.val(text);
        }); 
    },

    /* la méthode calculer recherche l'opérateur 
        La méthode indexOf() renvoie le premier indice pour 
	lequel on trouve un élément donné dans un tableau. 
	Si l'élément recherché n'est pas présent dans le tableau, 
	la méthode renverra -1.  Ici recherche Ã  partir de l'indice 1 */
	
    this.calculer = function()
    {
	console.log('Appel de la mÃ©thode calculer');
        if (that.ecran.val().indexOf("/",1) != -1)
            this.operation("/");
        if (that.ecran.val().indexOf("*",1) != -1)
            this.operation("*");
        if (that.ecran.val().indexOf("-",1) != -1)
            this.operation("-");
        if (that.ecran.val().indexOf("+",1) != -1)
            this.operation("+");
    },

    // la méthode opération
    this.operation = function(symbol)
    {
        console.log('Appel de la mÃ©thode opÃ©ration :'+ symbol);
        // la chaine sur l'écran est scindée en plusieurs éléments 
        var numbers = that.ecran.val().split(symbol);
        
	console.log(numbers.length);
	console.log('numbers[0]->' + numbers[0]);
    console.log('symbole :' + symbol);
	console.log('numbers[1]->' + numbers[1]);
        if (numbers[1] !=''){
            if (numbers.length == 2){
		if (symbol == "/")
                    result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
		else if (symbol == "*")
                    result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
		else if (symbol == "-")
                    result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
		else if (symbol == "+")
                    result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
		}
            else {  // c'est une expression de la forme -1-4 par exemple
		result = -1 * parseFloat(numbers[1]) - parseFloat(numbers[2]);
	    }	   
            if (isNaN(result)) result = 0;
                // affichage du résultat sur l'écran
                that.ecran.val(result);   
        }
        
    };
}