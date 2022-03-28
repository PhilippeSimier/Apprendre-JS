<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link href="style.css" rel="stylesheet" type="text/css"/>
        <title>Personnes</title>
    </head>
    <body>
        <?php
          require_once 'Personne.php';
          $personne = new Personne(); 
          $idUtilisateur = filter_input(INPUT_GET, "idPersonne");
        ?>
        <form action="traitementMajDate.php" method="get">
        
            <input type="date" name="nouvelleDate" value="<?php 
            echo $personne->obtenirDateNaissance($idUtilisateur); ?>"/>
            <input type="hidden" name="idUtilisateur" value="<?php 
            echo $idUtilisateur;?>"/>
            <input type="submit" value="Envoyer"/>
        </form>
        
    </body>
</html>