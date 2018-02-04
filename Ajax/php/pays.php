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
    
	$reponse = $bdd->query("SELECT `nom_fr_fr` FROM `pays`  WHERE `nom_fr_fr` LIKE '". strtoupper($_GET['nomPays'])."%'" );
	
	$data = array();
	
	while ($ligne = $reponse->fetch()) {
            
            array_push($data, utf8_encode ($ligne['nom_fr_fr']));
	}
	// var_dump($data);
	echo json_encode($data);
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json; charset=utf-8');
obtenirValeur(connexionBD());

