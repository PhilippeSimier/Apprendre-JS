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

function obtenirValeur() {
    
	$bdd = connexionBD();
	
	$requete = $bdd->prepare("SELECT * FROM `prixEssence`;");
	$requete->execute() or die (print_r($requete->errorInfo()));
	
	
    $data2 = array();
    $data3 = array();
    $data4 = array();
	$data5 = array();	
	
	while ($ligne = $requete->fetch()) {
		
		
		array_push($data2, floatval($ligne['gazoil']));
		array_push($data3, floatval($ligne['super95']));
		array_push($data4, floatval($ligne['super98']));
		array_push($data5, floatval($ligne['brent']));
				
	}
	
	$valeurs = array();
	
	
	$series = array();
	$serie['name'] = "gazoil"; 		
	$serie['data']  = $data2;
	array_push($series, $serie);
	
	$serie['name'] = "super95"; 
	$serie['data']  = $data3;
	array_push($series, $serie);
	
	$serie['name'] = "super98"; 
	$serie['data']  = $data4;
	array_push($series, $serie);
	
	$serie['name'] = "brent"; 
	$serie['yAxis'] = 1; 
	$serie['data']  = $data5;
	array_push($series, $serie);
	
	
	$valeurs['pointStart'] =  1995;
	$valeurs['series'] = $series;
	
	echo json_encode($valeurs);
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
obtenirValeur();

?>