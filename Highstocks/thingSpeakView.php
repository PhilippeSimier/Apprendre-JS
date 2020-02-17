<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <title><?php if (isset($_GET['name'])) { echo $_GET['name']; } else { echo "Thing"; }; ?></title>

	<!-- Bootstrap CSS version 4.1.1 -->
    <link rel="stylesheet" href="/Ruche/css/bootstrap.min.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="/Ruche/scripts/bootstrap.min.js"></script> 
    <link rel="stylesheet" href="/Ruche/css/ruche.css" />
    
    

    <script src="//code.highcharts.com/stock/highstock.js"></script>
    <script src="//code.highcharts.com/stock/modules/data.js"></script>
    <script src="//code.highcharts.com/stock/modules/exporting.js"></script>
    
    	<script src="//blacklabel.github.io/indicators/js/indicators.js"></script>
        <script src="//blacklabel.github.io/indicators/js/sma.js"></script>
        <script src="//blacklabel.github.io/indicators/js/ema.js"></script>
        <script src="//blacklabel.github.io/indicators/js/rsi.js"></script>
    <script type="text/javascript">
      
      
    var dynamicChart;
    var channelsLoaded = 0;
    
    // placez votre numéro de canal ThingSpeak, votre nom de canal et vos clés d'API ici.
    var channelKeys =[];
    channelKeys.push({channelNumber: <?php if (isset($_GET['channel'])) { echo $_GET['channel']; } else {echo 01;} ?>, 
	                       name:'<?php if (isset($_GET['name'])) { echo $_GET['name']; } else { echo "thing"; }; ?>',
			        key:'<?php if (isset($_GET['key'])) { echo $_GET['key']; }; ?>',
                          fieldList:[<?php if (isset($_GET['field0'])) { echo "{field:".$_GET['field0'].",axis:'P'}"; } else { echo "{field:1,axis:'P'}"; }; 
					   if (isset($_GET['field1'])) { echo ",{field:".$_GET['field1'].",axis:'O'}"; };
					   if (isset($_GET['field2'])) { echo ",{field:".$_GET['field2'].",axis:'O'}"; };
					   if (isset($_GET['field4'])) { echo ",{field:".$_GET['field4'].",axis:'O'}"; };
					   if (isset($_GET['field5'])) { echo ",{field:".$_GET['field5'].",axis:'O'}"; };
					   if (isset($_GET['field6'])) { echo ",{field:".$_GET['field6'].",axis:'O'}"; };
					   if (isset($_GET['field7'])) { echo ",{field:".$_GET['field7'].",axis:'O'}"; };
				     ?>]});

    
    // décalage horaire de l'utilisateur
    // La méthode getTimezoneOffset() retourne la différence en minutes 
    // entre le fuseau horaire UTC, et celui de l'heure locale.
    var myOffset = new Date().getTimezoneOffset();

    // fonction pour convertir le format de date à partir de JSON
    // récupère les données en utilisant l'objet de date javascript (année, mois, jour, heure, minute, seconde)
    // les mois en javascript commencent à 0, 
    //alors n'oubliez pas de soustraire 1 lorsque vous spécifiez le mois
    // Le décalage horaire en minutes est converti en millisecondes et soustrait 
    // de sorte que l'axe des x du graphique soit en heure locale utilisateur
    function getChartDate(d) {
       return Date.UTC(d.substring(0,4), d.substring(5,7)-1, d.substring(8,10), d.substring(11,13), d.substring(14,16), d.substring(17,19)) - (myOffset * 60000);
    }


    // Fonction pour masquer toutes les séries, via le bouton "Hide all". 
    // Ensuite, l'utilisateur peut cliquer sur le nom de la série dans la légende 
    // pour afficher les séries qui l'interessent.      
    function HideAll(){
        for (var index=0; index<dynamicChart.series.length; index++)  
        { 
            if (dynamicChart.series[index].name == 'Navigator')
                continue;
	    dynamicChart.series[index].hide();
        }          
    }
    
    // Fonction pour activer l'affichage lissé  filtre algorithme SMA
    function sma(){
            nb = dynamicChart.series[0].data.length;         
            console.log(dynamicChart.options.indicators[0].id); 
            
    } 
    
    //  C'est içi que le graphique est généré
$(document).ready(function(){
    
    //Ajout Channel dans le menu load
    var menu=document.getElementById("Channel Select");
    for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // pour chaque canal
    {
	   console.log('Name',channelKeys[channelIndex].name);
	   var menuOption =new Option(channelKeys[channelIndex].name,channelIndex);
	   menu.options.add(menuOption,channelIndex);
    }
    
    var last_date; // variable pour la dernière date ajoutée dans le chart
    
    // Création des séries pour chaque champs
    var seriesCounter=0;
    for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // pour chaque canal
    {
        for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // pour chaque champ du canal
        {
            channelKeys[channelIndex].fieldList[fieldIndex].series = seriesCounter; 
            seriesCounter++;
        }
    }
    //make calls to load data from each channel into channelKeys array now
    // draw the chart when all the data arrives, later asyncronously add history
	for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // pour chaque canal
	{
		channelKeys[channelIndex].loaded = false;  
		loadThingSpeakChannel(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList);
		
	}
 
 
    // Charge les 2500 points les plus récents (chargement initial rapide) 
    // à partir d'un canal ThingSpeak dans un tableau data[]
    // retourne le tableau data[]
    function loadThingSpeakChannel(sentChannelIndex,channelNumber,key,sentFieldList) {
	   var fieldList= sentFieldList;
	   var channelIndex = sentChannelIndex;
	   // Obtient les données d'un canal avec l'appel d'un webservice
		$.getJSON('https://www.thingspeak.com/channels/'+channelNumber+'/feed.json?callback=?&amp;offset=0&amp;results=2500;key='+key, function(data) 
	        {
		   // si pas d'accès
		    if (data === '-1') {
		       $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
		       console.log('Thingspeak Data Loading Error');
		    }
		    for (var fieldIndex=0; fieldIndex<fieldList.length; fieldIndex++)  // iterate through each field
		    {
		        fieldList[fieldIndex].data =[];
		        for (var h=0; h<data.feeds.length; h++)  // iterate through each feed (data point)
			{
	                    var p = [];  //nouveau Highcharts.Point();
			    var fieldStr = "data.feeds["+h+"].field"+fieldList[fieldIndex].field;
			    var v = eval(fieldStr);
			    p[0] = getChartDate(data.feeds[h].created_at);
			    p[1] = parseFloat(v);
			    // Ajout au tableau data si la valeur numérique existe 
			    if (!isNaN(parseInt(v))) { 
                                fieldList[fieldIndex].data.push(p); 
                            }
			}
		        fieldList[fieldIndex].name = eval("data.channel.field"+fieldList[fieldIndex].field);
		    }
		    console.log('getJSON field name:',fieldList[0].name);
		    channelKeys[channelIndex].fieldList=fieldList;
		    channelKeys[channelIndex].loaded=true;
		    channelsLoaded++;
		    console.log('channels Loaded:',channelsLoaded);
		    console.log('channel index:',channelIndex);
                    // Quand toutes les données sont chargées
		    if (channelsLoaded === channelKeys.length){ createChart(); }
		})
	   .fail(function() { alert('getJSON request failed! '); });
    }
 
    // création du graphique 
    function createChart() {
	// spécification des options du graphique
	var chartOptions = {
	chart: 
	    {
		renderTo: 'chart-container',
		zoomType:'y',
		events: 
		{
                    load: function() {
				
			// si la checkbox update  est cochée,toutes les 60 secondes,
                        //  charge la dernière valeur pour l'ajouter au graphique
			setInterval(function(){
			    if (document.getElementById("Update").checked)
			    {
				for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
				{  
				    (function(channelIndex)
				    {
					// get the data with a webservice call
					$.getJSON('https://www.thingspeak.com/channels/'+channelKeys[channelIndex].channelNumber+'/feed/last.json?callback=?&amp;offset=0&amp;location=false;key='+channelKeys[channelIndex].key, function(data) 
					{ 
					    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)
					    {
						// if data exists
						var fieldStr = "data.field"+channelKeys[channelIndex].fieldList[fieldIndex].field;
						var chartSeriesIndex=channelKeys[channelIndex].fieldList[fieldIndex].series;
						if (data && eval(fieldStr)) 
						{
						  var p = []//new Highcharts.Point();
						  var v = eval(fieldStr);
						  p[0] = getChartDate(data.created_at);
						  p[1] = parseFloat(v);
						  // get the last date if possible
						  if (dynamicChart.series[chartSeriesIndex].data.length > 0) 
						  { 
							last_date = dynamicChart.series[chartSeriesIndex].data[dynamicChart.series[chartSeriesIndex].data.length-1].x; 
						  }
						  var shift = false ; //default for shift
						  // if a numerical value exists and it is a new date, add it
						  if (!isNaN(parseInt(v)) && (p[0] != last_date)) 
						  {
							dynamicChart.series[chartSeriesIndex].addPoint(p, true, shift);
						  }   
						}
					    } 
					  
					});
				    })(channelIndex);
				}
			    }
			}, 60000);
				
		    }
		}
	    },
		rangeSelector: {
			buttons: [
			    {count: 1, type: 'day', text: 'D'}, 
				{count: 1, type: 'week', text: 'W'},
				{count: 1, type: 'month', text: 'M'}, 
				{count: 1, type: 'year', text: 'Y'},
				{type: 'all', text: 'All'}
			],
			inputEnabled: true,
			selected: 1
		},
                title: {
		text: '<?php if (isset($_GET['name'])) { echo $_GET['name']; } else { echo "thing"; }; ?>'
		},
		plotOptions: {
			line: {
			    gapSize:5
			},
			series: {
			    marker: {
				radius: 2
				},
				animation: true,
				step: false,
				turboThrehold:1000,
				borderWidth: 0
			}
		},
		tooltip: {
			
			borderColor: '#4b85b7',
			backgroundColor: '#edf1c8',
			valueDecimals: 2,
			xDateFormat: '%A %e %B à  %Hh%M',
                        enabledIndicators: true
			
		},
		xAxis: {
			type: 'datetime',
			ordinal:false,
			min: Date.UTC(2017,02,28),
			dateTimeLabelFormats : {
				hour  : '%H',
				minute: '%H:%M'
			},
			title: {
				text: ''
			}
		},
		yAxis: [{
                    className: 'highcharts-color-0',
		    title: {
                        text: '' 
	              
                    },
		    opposite: false,
                    id: 'P'
		}, {
                    className: 'highcharts-color-1',
		    title: {
                        text: ''
                    },
                    opposite: true,
                    id: 'O'
		}],
		exporting: {
		    enabled: true,
		    csv: {
		 	dateFormat: '%d/%m/%Y %I:%M:%S %p'
		    }
		},
		legend: {
		    enabled: true
		},
		navigator: {
		    baseSeries: 0,  //select which series to show in history navigator, First series is 0
		    series: {
                        includeInCSVExport: false
		    }
		},
		credits:{
			href: "http://touchardinforeseau.servehttp.com/Ruche",
			text: "Section SNIR Touchard"
		},
                indicators: [{
                    id: 'first',
                    type: 'sma',
                    showInLegend: true,
                    params: {
                        period: 48
                    },
                    styles: {
                        stroke: 'blue',
                    }
                }],        
		series: []    
	};
	
	Highcharts.setOptions({
        lang: {
            months: ["Janvier ","Février ","Mars ","Avril ","Mai ","Juin ","Juillet ","Août ","Septembre ","Octobre ","Novembre ","Décembre "],
            weekdays: ["Dimanche ","Lundi ","Mardi ","Mercredi ","Jeudi ","Vendredi ","Samedi "],
	    shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil','Août', 'Sept', 'Oct', 'Nov', 'Déc'],
            decimalPoint: ',',
            resetZoom: 'Reset zoom',
            resetZoomTitle: 'Reset zoom Ã  1:1',
	    downloadPNG: "Télécharger au format PNG image",
            downloadJPEG: "Télécharger au format JPEG image",
            downloadPDF: "Télécharger au format PDF document",
            downloadSVG: "Télécharger au format SVG vector image",
            exportButtonTitle: "Exporter image ou document",
            printChart: "Imprimer le graphique",
	    noData: "Aucune donnée à  afficher",			
            loading: "Chargement..."			
            },
		
	});

	// ajoute toutes les données des channels au graphique (chart)
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // pour chaque channel
  {
    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // add each field
    {
      console.log('Channel '+channelIndex+' field '+fieldIndex);
      chartOptions.series.push({data:channelKeys[channelIndex].fieldList[fieldIndex].data,
                                index:channelKeys[channelIndex].fieldList[fieldIndex].series,
                                yAxis:channelKeys[channelIndex].fieldList[fieldIndex].axis,
                                type: 'spline',
                                id: 'first',
                                name: channelKeys[channelIndex].fieldList[fieldIndex].name});
    }
  }
	// set chart labels here so that decoding occurs properly
	//chartOptions.title.text = data.channel.name;
	//chartOptions.xAxis.title.text = 'Date';
    chartOptions.yAxis[0].title.text = channelKeys[0].fieldList[0].name;
	if (channelKeys[0].fieldList.length > 1){
		chartOptions.yAxis[1].title.text = channelKeys[0].fieldList[1].name; 
	}
	// draw the chart
  dynamicChart = new Highcharts.StockChart(chartOptions);

  // update series number to account for the navigator series (The historical series at the bottom) which is the first series.
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // and each field
    {
      for (var seriesIndex=0; seriesIndex<dynamicChart.series.length; seriesIndex++)  // compare each series name
      {
        if (dynamicChart.series[seriesIndex].name == channelKeys[channelIndex].fieldList[fieldIndex].name)
        {
          channelKeys[channelIndex].fieldList[fieldIndex].series = seriesIndex;
        }
      }
    }
  }          
  // add all history
  //dynamicChart.showLoading("Loading History..." );
  console.log('Nb de Channels: ',channelKeys.length);
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    window.console && console.log('channelIndex: ',channelIndex);
    (function(channelIndex)
      {
        //load only 1 set of 8000 points
        loadChannelHistory(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList,0,1); 
      }
    )(channelIndex);
  }
 }
});
      
function loadOneChannel(){ 
  // load a channel selected in the popUp menu.
  var selectedChannel=document.getElementById("Channel Select");
  var maxLoads=document.getElementById("Loads").value ;
  var channelIndex = selectedChannel.selectedIndex;
  loadChannelHistory(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList,0,maxLoads); 
} 

// load next 8000 points from a ThingSpeak channel and addPoints to a series
function loadChannelHistory(sentChannelIndex,channelNumber,key,sentFieldList,sentNumLoads,maxLoads) {
   var numLoads=sentNumLoads
   var fieldList= sentFieldList;
   var channelIndex = sentChannelIndex;
   var first_Date = new Date();
   if (typeof fieldList[0].data[0] != "undefined") first_Date.setTime(fieldList[0].data[0][0]+7*60*60*1000);//adjust for 7 hour difference from GMT (Zulu time)
   else if (typeof fieldList[1].data[0] != "undefined") first_Date.setTime(fieldList[1].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[2].data[0] != "undefined") first_Date.setTime(fieldList[2].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[3].data[0] != "undefined") first_Date.setTime(fieldList[3].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[4].data[0] != "undefined") first_Date.setTime(fieldList[4].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[5].data[0] != "undefined") first_Date.setTime(fieldList[5].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[6].data[0] != "undefined") first_Date.setTime(fieldList[6].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[7].data[0] != "undefined") first_Date.setTime(fieldList[7].data[0][0]+7*60*60*1000);
   var end = first_Date.toJSON();
   window.console && console.log('earliest date:',end);
   window.console && console.log('sentChannelIndex:',sentChannelIndex);
   window.console && console.log('numLoads:',numLoads);
   // get the Channel data with a webservice call
 	$.getJSON('https://www.thingspeak.com/channels/'+channelNumber+'/feed.json?callback=?&amp;offset=0&amp;start=2018-01-20T00:00:00;end='+end+';key='+key, function(data) 
   {
	   // if no access
	   if (data == '-1') {
       $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
       window.console && console.log('Thingspeak Data Loading Error');
     }
     for (var fieldIndex=0; fieldIndex<fieldList.length; fieldIndex++)  // iterate through each field
     {
       //fieldList[fieldIndex].data =[];
       for (var h=0; h<data.feeds.length; h++)  // iterate through each feed (data point)
       {
         var p = []//new Highcharts.Point();
         var fieldStr = "data.feeds["+h+"].field"+fieldList[fieldIndex].field;
		  	 var v = eval(fieldStr);
 		  	p[0] = getChartDate(data.feeds[h].created_at);
	 	  	p[1] = parseFloat(v);
	 	  	// if a numerical value exists add it
	   		if (!isNaN(parseInt(v))) { fieldList[fieldIndex].data.push(p); }
       }
       fieldList[fieldIndex].data.sort(function(a,b){return a[0]-b[0]});
       dynamicChart.series[fieldList[fieldIndex].series].setData(fieldList[fieldIndex].data,false);
       //dynamicChart.series[fieldList[fieldIndex].series].addPoint(fieldList[fieldIndex].data,false);
       //fieldList[fieldIndex].name = eval("data.channel.field"+fieldList[fieldIndex].field);
       //window.console && console.log('data added to series:',fieldList[fieldIndex].series,fieldList[fieldIndex].data);
	   }
     channelKeys[channelIndex].fieldList=fieldList;
     dynamicChart.redraw()
     window.console && console.log('channel index:',channelIndex);
     numLoads++;
        if (numLoads<maxLoads) {
            loadChannelHistory(channelIndex,channelNumber,key,fieldList,numLoads,maxLoads);}
	});
}

    </script>

</head>
<body>
	<?php require_once 'menu.php'; ?>
	
	<div style="padding-top: 56px;">
		<div class="popin" id="chart-container" style="height: 600px;">
		</div>
		<div class="popin" id="below chart"> 
			<button class="btn btn-primary"  value="Hide All" name="Hide All Button" onclick="HideAll();">Hide All</button>
			<button class="btn btn-primary"  value="Load More Data" name="Load More Data" onclick="loadOneChannel();">More Historical Data </button>
			<select id="Channel Select"></select>
			<select id="Loads">
				<option value="1">1 Load</option>
				<option value="2">2 Loads</option>
				<option value="3">3 Loads</option>
				<option value="4">4 Loads</option>
				<option value="5" selected="selected">5 Loads</option>
				<option value="6">6 Loads</option>
				<option value="7">7 Loads</option>
				<option value="8">8 Loads</option>
				<option value="9">9 Loads</option>
				<option value="10">10 Loads</option>
				<option value="15">15 Loads</option>
				<option value="20">20 Loads</option>
				<option value="25">25 Loads</option>
				<option value="30">30 Loads</option>
				<option value="40">40 Loads</option>
				<option value="50">50 Loads</option>
			</select>
			<input id="Update" name="Update" type="checkbox"><span>Update Chart(Latency)</span>
                        
                        
		</div>
	</div>
	<?php require_once 'piedDePage.php'; ?>
</body>
</html>
