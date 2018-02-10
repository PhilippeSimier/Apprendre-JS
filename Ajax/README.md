# Champ auto-complété

# Description
Moderne et réactif le champ auto-complété est aujourd'hui plébiscité par les visiteurs et illustre à merveille le principe des requêtes asynchrones (AJAX).
Dans le cadre d'un champ auto-complété, nous avons besoin d'un rafraîchissement très ponctuel de l'information : A chaque fois que l'utilisateur presse une touche du clavier ou complète sa saisie, le script relance une nouvelle requête auprès du serveur et la réponse obtenue ne met à jour qu'un élément à l'écran - la liste déroulante sous le champ de recherche.
Ici nous allons proposer de sélectionner un pays parmi la liste complète des 241 états recensés à travers le globe qui seront stockés dans une table de la base de données.
Par exemple : si vous appuyez sur la lettre "**F**" le champ vous propose de "**Fidji**" "**Finlande**" "**France**" ou "**Féfération de Russie**". Vous pouvez alors sélectionner  un pays parmi ceux proposés.

# Screen Shot

![enter image description here](https://lh3.googleusercontent.com/-27U70UkW7uQ/Wn8VnuFW7sI/AAAAAAAANkk/Divk7lSRWygfjR_HZb2vWEmo9QLvdtl8QCLcBGAs/s0/Autocomplete.PNG "Autocomplete.PNG")

Une solution consiste à réaliser un appel Ajax à travers la bibliothèque jQuery (qui facilite grandement ce type d'interactions) à chaque fois que l'utilisateur saisit un caractère dans le champ (événement **keyup**).
En retour le script  reçoit une liste de pays au format JSON

    [ "Fidji",
      "Finlande",
      "France",
      "Fédération de Russie"
    ]
qu'il transforme en liste html

    <ul id="listePays">
        <li onclick="select('Fidji');">Fidji</li>
        <li onclick="select('Finlande');">Finlande</li>
        <li onclick="select('France');">France</li>
        <li onclick="select('Fédération de Russie');">Fédération de Russie</li>
    </ul>

# Changelog

**10/02/2018 : ** Ajout du README . 

> **Notes :**


> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)
> - Auteur **Philippe SIMIER** 
<!-- TOOLBOX 

Génération des badges : https://shields.io/
Génération de ce fichier : https://stackedit.io/editor#


