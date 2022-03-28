<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'ModeleVille.php';
$uneVille = new ModeleVille();
$codePostal = filter_input(INPUT_GET,"cp");
//header('Content-Type: application/json; charset=utf-8');
print_r($uneVille->ObtenirVilles($codePostal)) ;
echo "<br>" . $uneVille->ObtenirNbVilles($codePostal);
