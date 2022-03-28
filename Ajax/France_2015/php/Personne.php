<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Personne
 *
 * @author pcruchet
 */
require_once 'Modele.php';

class Personne extends Modele {

    public function afficherPersonnes() {

// Question 6
//        $requete = $this->_bdd->query('Select nom, prenom, dateNaissance, ville_nom, '
//                        . 'departement_nom, region_nom from utilisateurs, villes, '
//                        . 'departements, regions '
//                        . 'where utilisateurs.ville_id = villes.ville_id AND '
//                        . 'ville_departement_id = departement_id AND '
//                        . 'departement_region_id = regions_id')
//                or die(print_r($requete->errorInfo()));

        $requete = $this->_bdd->query("set lc_time_names = 'fr_FR'")
                or die(print_r($requete->errorInfo()));

        $requete = $this->_bdd->query("select nom, prenom, "
                        . "DATE_FORMAT(dateNaissance,'%d %M %Y') as dateNaissance, "
                        . "ville_nom, departement_nom, region_nom from utilisateurs, "
                        . "villes, departements, regions "
                        . "where utilisateurs.ville_id = villes.ville_id and "
                        . "villes.ville_departement_id = departements.departement_id  "
                        . "and departements.departement_region_id = regions.regions_id;")
                or die(print_r($requete->errorInfo()));


        echo "<table>";
        echo "<tr> <th>Nom </th> <th> Prenom </th> <th> Date de naissance </th>"
        . "<th> Nom de la ville </th> <th> Nom du departement </th>"
        . "<th> Nom de la région </th> </tr>";

        while ($ligne = $requete->fetch()) {
            $nom = $ligne["nom"];
            $prenom = $ligne["prenom"];
            $date = $ligne["dateNaissance"];
            $villeNom = $ligne["ville_nom"];
            $depNom = $ligne["departement_nom"];
            $regNom = $ligne["region_nom"];

            echo '<tr> '
            . '<td>' . $nom . '</td>'
            . '<td>' . $prenom . '</td>'
            . '<td>' . $date . '</td>'
            . '<td>' . $villeNom . '</td>'
            . '<td>' . $depNom . '</td>'
            . '<td>' . $regNom . '</td>'
            . '</tr>';
        }
        echo "</table>";
        $requete->closeCursor();
    }

    public function genererListePersonne() {

        try {
            $this->_bdd->query("set lc_time_names = 'fr_FR'");
                  
            $requete = $this->_bdd->query("select nom, prenom, utilisateur_id, "
            . "DATE_FORMAT(dateNaissance,'%d %M %Y') as dateNaissance "
            . "from utilisateurs order by nom ;");

            echo "<select name='idPersonne' id='idPersonne'>\n";
            echo "<option value='-1'>Sélectionner une personne</option>\n";

            while ($ligne = $requete->fetch()) {
                $nom = $ligne["nom"];
                $prenom = $ligne["prenom"];
                $date = $ligne["dateNaissance"];
                $id = $ligne["utilisateur_id"];
                echo "<option value='$id'>$nom $prenom $date</option>\n";
            }
            echo "</select>";
            $requete->closeCursor();
        } catch (PDOException $ex) {
            die('<br />Pb génération liste personnes : ' . $ex->getMessage());
        }
    }
    
    public function obtenirDateNaissance($idUtilisateur) {
         try { 
            // echo "Id utilisateur 2 : $idUtilisateur";
            $this->_bdd->query("set lc_time_names = 'fr_FR'");
                           

            $requete = $this->_bdd->prepare("select DATE_FORMAT(dateNaissance,'%Y-%m-%d') as dateNaissance "
            . "from utilisateurs where utilisateur_id = :id ;");
            $requete->bindParam(":id", $idUtilisateur);
            $requete->execute();
             
            $date = date("Y-m-d");
             if ($ligne = $requete->fetch()) {
                $date = $ligne["dateNaissance"];
            }
            
            $requete->closeCursor();
            return $date;
        } catch (PDOException $ex) {
            die('<br />Pb obtenir date naissance : ' . $ex->getMessage());
        }
    }
    
    public function changerDateNaissance($idUtilisateur,$nouvelleDate) {
         try { 
                                 

            $requete = $this->_bdd->prepare("update utilisateurs set dateNaissance = :dateNaissance where utilisateur_id = :id;");
            $requete->bindParam(":dateNaissance", $nouvelleDate);
            $requete->bindParam(":id", $idUtilisateur);
            $requete->execute();
            //echo "Nouvelle date : $nouvelleDate id : $idUtilisateur";
            header('Location: ../index.php');
        } catch (PDOException $ex) {
            die('<br />Pb changer date naissance : ' . $ex->getMessage());
        }
    }
   

}
