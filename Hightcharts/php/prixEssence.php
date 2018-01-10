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

function obtenirValeurJSON($bdd) {
    
	//$bdd = connexionBD();
	
	$requete = $bdd->query("SELECT * FROM `prixEssence`;");
	
	$valeurs = array();
	$prix = array();
	
	while ($ligne = $requete->fetch()) {
		
		$prix["gazoil"]  = floatval($ligne['gazoil']);
		$prix["super95"] = floatval($ligne['super95']);
		$prix["super98"] = floatval($ligne['super98']);
		$prix["brent"]   = floatval($ligne['brent']);
		$valeurs[$ligne['annee']] = $prix;	
				
	}
	return json_encode($valeurs, JSON_FORCE_OBJECT);
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

echo obtenirValeurJSON(connexionBD());

?>