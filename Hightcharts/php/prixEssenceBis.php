<?php

require_once("config.inc.php");

function connexionBD() {
    try 
	{
        $bdd = new PDO('mysql:host=' . SERVEURBD . ';dbname=' . NOMDELABASE, LOGIN, MOTDEPASSE);
    } 
	catch (Exception $ex) 
	{
        die('<br />Pb connexion serveur BD : ' . $ex->getMessage());
    }
    return $bdd;
}

function obtenirValeur($bdd) {
    
	$requete = $bdd->query("SELECT * FROM `prixEssence`;");
		
    $gasoil  = array();
    $super95 = array();
    $super98 = array();
	$brent   = array();	
	
	while ($ligne = $requete->fetch()) {
		
		array_push($gasoil,  floatval($ligne['gazoil']));
		array_push($super95, floatval($ligne['super95']));
		array_push($super98, floatval($ligne['super98']));
		array_push($brent,   floatval($ligne['brent']));
				
	}
	
	$valeurs = array();
	$tooltip[valueSuffix] = " €";
	
	$series = array();
	$serie['name'] = "gazoil  (L)"; 
	$serie['tooltip'] = $tooltip;
	$serie['data']  = $gasoil;
	array_push($series, $serie);
	
	$serie['name'] = "super95 (L)"; 
	$serie['tooltip'] = $tooltip;
	$serie['data']  = $super95;
	array_push($series, $serie);
	
	$serie['name'] = "super98 (L)";
	$serie['tooltip'] = $tooltip;	
	$serie['data']  = $super98;
	array_push($series, $serie);
	
	$tooltip[valueSuffix] = " $";
	$serie['name'] = "brent (Baryl)";
	$serie['tooltip'] = $tooltip;	
	$serie['yAxis'] = 1; 
	$serie['data']  = $brent;
	array_push($series, $serie);
	
	
	$valeurs['pointStart'] =  1995;
	$valeurs['series'] = $series;
	
	echo json_encode($valeurs);
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
obtenirValeur(connexionBD());

?>