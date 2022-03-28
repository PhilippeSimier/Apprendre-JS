<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <link href="style.css" rel="stylesheet" type="text/css"/>
        <title>Personnes</title>
    </head>
    <body>
        <?php
           require_once 'php/Personne.php';
           $personne = new Personne();
           //$personne->afficherPersonnes();
        ?>
        <form action="php/traitement.php" method="get">
            <?php 
            $personne->genererListePersonne();
            ?>
            <input type="submit" value="Envoyer"/>
        </form>
        
    </body>
</html>




<!--<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
       //     require_once 'php/Modele.php';
       //     $modele = new Modele();
        ?>
    </body>
</html>-->



