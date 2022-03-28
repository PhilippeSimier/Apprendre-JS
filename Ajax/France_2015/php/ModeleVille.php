<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ville
 *
 * @author pcruchet
 */
require_once 'Modele.php';

class ModeleVille extends Modele {

    public function ObtenirVilles($codePostal) {

        $requete = $this->_bdd->prepare("select ville_nom from villes where villes.ville_code_postal = :cp ;");
        $requete->bindParam(":cp", $codePostal);
        $requete->execute() or die(print_r($requete->errorInfo()));

        $villes = array();
        while ($ligne = $requete->fetch()) {
            array_push($villes, $ligne["ville_nom"]);
        }

        $requete->closeCursor();
        return $villes;    }

    public function ObtenirNbVilles($codePostal) {
        $requete = $this->_bdd->prepare("select count(ville_id) as nbVilles from villes where villes.ville_code_postal = :cp ;");
        $requete->bindParam(":cp", $codePostal);
        $requete->execute() or die(print_r($requete->errorInfo()));
        
        if ($ligne = $requete->fetch()) {
            $compte = $ligne["nbVilles"];
        }
        
        $requete->closeCursor();
        return $compte;
    }
}
