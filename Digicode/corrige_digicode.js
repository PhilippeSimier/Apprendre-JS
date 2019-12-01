$(function() {
	var chiffres = $("#clavier .nb");
	var ecran  = $("input#number");
	var actions = $("#clavier .op");
	var porte = $("#porte");
	var code = '';
	const code_secret = '1234';
	var cptErreur = 0;
	
	chiffres.click(function() {
        var valeur = $(this).html();     // la valeur du bouton
		if (cptErreur < 3){
			code = code + valeur;
			console.log('code : '+code);     // affichage du code dans la console
			ecran.val(ecran.val() + '*');    // affichage d'une étoile sur l'ecran
        }
		else{
			ecran.val('Clavier bloqué');	//  trois codes faux ont été saisis bloquage du clavier
			setTimeout(init, 5000);         //  après 5 secondes débloquage du clavier 
		}
	});
	
	actions.click(function() {
		action = $(this).html();     //  action contient A ou C
		if (action ==='C'){
			code = '';
			cptErreur = 0;
			effacer();
		}
		if (action ==='A'){
			if (code === code_secret) {
				code = '';
				ouverture();
			}
			else{
				code = '';
				console.log('Erreur');
				ecran.val('code faux');
				cptErreur++;                // incrémentation du compteur d'erreur
				setTimeout(effacer, 1000);
				
			}
		}
	});
	
	function ouverture(){
		console.log('Ouverture de la porte');
		ecran.val('Code bon');
		porte.attr('src', 'porte_ouverte.png');   // affichage de l'image porte ouverte
		setTimeout(fermeture, 2000);  // appel de la fonction fermeture après 2 secondes
		
	}
	
	function fermeture(){
		console.log('Fermeture de la porte');
		porte.attr('src', 'porte_fermee.png');   // affichage de l'image porte fermee
		effacer();
		
	}
	function effacer(){
		ecran.val('');
	}
	function init(){
		cptErreur=0;
		effacer();
	}
	
});