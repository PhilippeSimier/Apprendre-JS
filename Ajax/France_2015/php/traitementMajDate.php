<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$idUtilisateur = filter_input(INPUT_GET, "idUtilisateur");
$nouvelleDate  = filter_input(INPUT_GET, "nouvelleDate");

require_once 'Personne.php';

$personne = new Personne();
$personne->changerDateNaissance($idUtilisateur, $nouvelleDate);
