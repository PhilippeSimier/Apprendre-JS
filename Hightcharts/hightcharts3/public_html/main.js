/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var chart;
var couleurs = ["#1f77b4",  "#aec7e8",  "#ff7f0e",  "#ffbb78",  "#2ca02c"];
var options = {};
 
options.chart = {
  renderTo: 'essenceChart',
  height: 500,
  marginTop: 70,
  marginLeft: 100,
  marginRight: 100,
  backgroundColor: '#F9F9F9',
  type:'line'
};
 
options.credits = {
  text: '© SNIR Soft Touchard Le Mans'
};
 
options.colors = couleurs;
 
options.title = {
  text: "Évolution du prix de l'essence et du baryl de pétrole",
  margin: 10
};
 
options.tooltip = {
    
    shared: true,
    borderColor: '#4b85b7',
    backgroundColor: '#edf1c8'
};

options.legend = {
    
    layout: 'horizontal',
    align: 'center',   
    backgroundColor: '#FFFFFF'
};

options.yAxis = [
  {
    title : {
      text: "Gazoil & Super 95 98"
    },
    labels: {
        formatter: function() {
            return this.value +' €';
        },
        style: {
            color: '#000'
        }
    }
  },
  {
    title: {
        text: "Baryl brent"
    },
    labels: {
        formatter: function() {
            return this.value +' $';
        },
        style: {
            color: '#8C564B'
        }
    },
    opposite: true
   }
];

options.plotOptions = {
        series: {
            pointStart: 0
        }
};


$.getJSON('https://philippes.ddns.net/exo/prixEssenceBis.php', function(valeurs) {
    
    options.series = valeurs.series;
    options.plotOptions.series.pointStart = valeurs.pointStart;
    
    chart = new Highcharts.Chart(options);
  
  });

