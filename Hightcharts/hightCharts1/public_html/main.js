
$(document).ready(function() {
 
  $.afficherCamembert(couleurs, donnees);
  $.afficherCourbe(couleurs, donnees);
 
});
 
 var couleurs = [
            "#1f77b4",  "#aec7e8",  "#ff7f0e",  "#ffbb78",  "#2ca02c",  "#98df8a",  "#d62728",  "#ff9896", 
            "#9467bd",  "#c5b0d5",  "#8c564b",  "#c49c94", "#e377c2",  "#f7b6d2",   "#7f7f7f",    "#c7c7c7", 
            "#bcbd22",  "#dbdb8d",  "#17becf",  "#9edae5"
];
 
$.afficherCamembert = function(couleurs, data) {
 
 var chart = new Highcharts.Chart({
      chart: {
         renderTo: 'camembert',
         width: 598,
         height: 450,
         marginLeft: 25,
         marginRight: 25
      },
      colors: couleurs,
      title: {
         text: "Dépenses janvier par région",
         margin: 10
      },
      tooltip: {
         formatter: function() {
            return "Dépense : " + this.y + " €" ;
         }
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               formatter: function() {
                  return "" + this.point.name.toLowerCase() + "";
               }
            }
         },
         series: {
            dataLabels: {
                enabled: true,
                color: 'black',
                fontSize: 3
            }
        }
      },
       series: [{
         type: 'pie',
         data: data
      }]
   });
 
 };
 
 $.afficherCourbe = function(couleurs, data) {
 
 var chart = new Highcharts.Chart({
      chart: {
         renderTo: 'courbe',
         width: 600,
         height: 450,
         marginLeft: 25,
         marginRight: 25
      },
      colors: couleurs,
      title: {
         text: "Dépenses janvier par région",
         margin: 10
      },
      tooltip: {
         formatter: function() {
            return "Dépense : " + this.y + " €" ;
         }
      },
      plotOptions: {
         bar: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               formatter: function() {
                  return "" + this.point.name.toLowerCase() + "";
               }
            }
         },
         series: {
            dataLabels: {
                enabled: true,
                color: 'black',
                fontSize: 3
            }
        }
      },
       series: [{
         type: 'bar',
         data: data
      }]
   });
 
 };
 


