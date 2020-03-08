# Datatable 

## Présentation  

Le plugin **DataTables** de jQuery permet d'interagir avec un tableau HTML. Il gère la personnalisation du style, la pagination, le filtrage des données et le tri sur une ou plusieurs colonnes. 

## Les inclusions nécessaires  

Pour utiliser DataTables, il faut inclure, dans le fichier html, les bibliothèques **jquery.js** et **datatables.js** dans l'en-tête (élément head), ainsi que le fichier de style CSS de DataTables. Le code ci-après montre les inclusions : 
```html  
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js">
</script>  <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.20/datatables.min.js">
</script>  <link href="dataTableStyles.css" rel="stylesheet" type="text/css"/>  
```
 
 Le tableau html doit contenir l'élément thead, qui définit les titres des colonnes, et l'élément tbody, comportant les données. 
 
 ```html
   <table id="example" class="display" style="width:100%">
     <thead>
       <tr>
         <th>Name</th>
         <th>Position</th>
         <th>Office</th>
         <th>Age</th>
         <th>Start date</th>
         <th>Salary</th>
       </tr>
     </thead>  
     <tbody>
       <tr>
         <td>Tiger Nixon</td>  
         <td>System Architect</td>  
         <td>Edinburgh</td>  
         <td>61</td>  
         <td>2011/04/25</td>  
         <td>$320,800</td>  
       </tr>  ...  
    </tbody> 
```  

Dans un script JavaScript , associez **DataTable** au tableau dont l'attribut id a la valeur `example` : 
```javascript
  $(document).ready(function () {
    $('#example').DataTable();  
  });  
```  
Par défaut, DataTables trie le tableau par ordre croissant sur la première colonne. L'utilisateur peut ensuite trier le tableau, par ordre croissant ou décroissant, sur n'importe quelle colonne. 
## Paramétrage de la langue  
**DataTables** affiche le texte des éléments de contrôle en anglais, toutefois il est possible de le configurer pour utiliser une autre langue, par exemple le français.  Placez le fichier **French.json** dans le répertoire DataTables, et affectez le chemin de ce fichier à la propriété url de l'objet **language** de DataTables . 
```javascript
  let options = {  
    language: {
      url: "DataTables/French.json"  
      }  
    };  
$(document).ready(function () {  
   $('#example').DataTable(options);  
});  
``` 
## Pagination  
Il est possible de personnaliser la pagination avec l'option **pagingType**. Quatre types de pagination sont disponibles : 
- simple  
- simple_numbers  
- full 
- full_numbers 

Les options du sélecteur nombre de lignes par page sont configurés avec le tableau **lengthMenu**. Par défaut, le sélecteur propose: 10, 25, 50, 100. Le nombre de lignes à afficher au chargement du tableau est contrôlé par l'option **pageLength**. 
```javascript
  let options = {  
     language: {  
        url: "DataTables/french.json"  
     },  
     pagingType: "simple_numbers",  
     lengthMenu:[5,10,15,20,25],  
     pageLength: 5  
     }; 
      
     $(document).ready(function () {
         $('#example').DataTable(options);  
     });  
``` 
## Tri  
Par défaut, le tri est réalisé sur la première colonne, par ordre croissant. La propriété **order** indique les colonnes à utiliser pour le tri et l'ordre à leur appliquer : croissant (**asc**) ou décroissant (**desc**). 



    order:[[1,'desc'], [0, 'asc']] 

L'option **columns**` 
permet de définir le type de la colonne (alphabétique, numérique, … ).  

    columns: [ {type:"text"}, {type:"text"}, {type:"num"} ]

 

# Changelog  
**22/02/2020 : ** Ajout du README . 
> **Notes :**  
> - Licence : **licence publique générale** ![enter image description here](https://img.shields.io/badge/licence-GPL-green.svg)  
> - Auteur **Philippe SIMIER** Lycée Touchard Le Mans  > ![enter image description here](https://img.shields.io/badge/built-passing-green.svg)  

<!-- TOOLBOX Génération des badges : https://shields.io/  
       Génération de ce fichier : https://stackedit.io/editor#





