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
    
	$reponse = $bdd->query("SELECT `nom_en_gb` FROM `pays`;");
	
	$data = array();
	
	while ($ligne = $reponse->fetch()) {
            
            array_push($data, $ligne['nom_en_gb']);
	}
	
	echo json_encode($data);
}

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json; charset=utf-8');
obtenirValeur(connexionBD());

