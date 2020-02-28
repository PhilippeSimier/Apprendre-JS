/* 
 * Script pour afficher sous forme de graphiques les données 
 * issues d'un canal thingSpeak. Le numero du canal ainsi que sa clé API
 * et les champs à afficher doivent être renseignés dans la variable
 * channelKeys. Ce script ajoute automatiquement un indicateur ema
 * à chacun des champs demandés.
 * Les données sur thingSpeak ne peuvent être obtenues que par lot de 8000 point maximum.
 * C'est pourquoi Les données sont obtenues en plusieurs chargements. 
 * Le premier obtient 2500 points et dessine le graphique.
 * le second charge 8000 points suivants, le graphique est redessiné.
 * @author Philippe SIMIER Lycée Touchard Le Mans
 * @version 2.0  du 27/02/2020
 */

"use strict";

// placez votre numéro de canal ThingSpeak, et votre clé d'API ici.
let channelKeys = [
    {channelNumber: 752839,
        key: '',
        fieldList: [{field:1,axis:'P'},{field:2,axis:'O'}]
    }
];

let dynamicChart;
let channelsLoaded = 0;

/*
 * décalage horaire de l'utilisateur
 * myOffset contient la différence en minutes 
 * entre le fuseau horaire UTC, et celui de l'heure locale.
 */
let myOffset = new Date().getTimezoneOffset();

/**
 * fonction pour convertir le format de date
 * de sorte que l'axe des x du graphique soit en heure locale utilisateur
 * @param {type} d une date format JSON
 * @returns {Number}
 */
function getChartDate(d) {
    return Date.UTC(d.substring(0, 4), d.substring(5, 7) - 1, d.substring(8, 10), d.substring(11, 13), d.substring(14, 16), d.substring(17, 19)) - (myOffset * 60000);
}

/**
 * Fonction principale
 */
$(document).ready(function () {

    // La letiable menu est un selecteur qui permet de choisir un canal
    let menu = document.getElementById("Channel_Select");
    let last_date; // letiable pour la dernière date du data dans le chart

    // Création d'un attribut series pour chaque fieldList
    // Cet attribut nommé series contient le numéro de la série
    let seriesCounter = 0;
    for (let channelIndex = 0; channelIndex < channelKeys.length; channelIndex++)  // pour chaque canal
    {
        for (let fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++)  // pour chaque champ du canal
        {
            channelKeys[channelIndex].fieldList[fieldIndex].series = seriesCounter;
            seriesCounter++;
        }
    }
    // appels pour charger les données de chaque canal dans le tableau channelKeys maintenant
    // dessine le graphique quand toutes les données sont chargées, later asyncronously add history
    for (let channelIndex = 0; channelIndex < channelKeys.length; channelIndex++)  // pour chaque canal
    {
        channelKeys[channelIndex].loaded = false;
        loadThingSpeakChannel(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList);
    }

    // Charge les 2500 points les plus récents (chargement initial rapide) 
    // à partir d'un canal ThingSpeak dans un tableau data[]
    // retourne le tableau data[]
    function loadThingSpeakChannel(channelIndex, channelNumber, key, fieldList) {

        // Obtient les données d'un canal avec l'appel d'un webservice
        $.getJSON('https://www.thingspeak.com/channels/' + channelNumber + '/feed.json?callback=?&amp;offset=0&amp;results=2500;key=' + key, function (data)
        {
            console.log(data.channel.name);

            // si pas d'accès
            if (data === '-1') {
                $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
                console.log('Thingspeak Data Loading Error');
            }
            for (let fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++)  // iterate through each field
            {
                fieldList[fieldIndex].data = []; // creation  
                for (let h = 0; h < data.feeds.length; h++)  // iteration pour chaque data
                {
                    let p = [];  //nouveau Highcharts.Point();
                    let fieldStr = "data.feeds[" + h + "].field" + fieldList[fieldIndex].field;
                    let v = eval(fieldStr);
                    p[0] = getChartDate(data.feeds[h].created_at);
                    p[1] = parseFloat(v);
                    // Ajout au tableau data si la valeur est numérique 
                    if (!isNaN(parseInt(v))) {
                        fieldList[fieldIndex].data.push(p);
                    }
                }
                fieldList[fieldIndex].name = eval("data.channel.field" + fieldList[fieldIndex].field);
            }
            console.log('getJSON field name:', fieldList[0].name);
            // Nom du graphique
            channelKeys[channelIndex].name = data.channel.name;
            // Titre de la page
            document.title = data.channel.name;

            let menuOption = new Option(channelKeys[channelIndex].name, channelIndex);
            menu.options.add(menuOption, channelIndex);

            channelKeys[channelIndex].fieldList = fieldList;
            channelKeys[channelIndex].loaded = true;
            channelsLoaded++;
            console.log('channels Loaded:', channelsLoaded);
            console.log('channel index:', channelIndex);
            // Quand toutes les cannaux sont chargées
            if (channelsLoaded === channelKeys.length) {
                createChart();
            }
        })
                .fail(function () {
                    alert('getJSON request failed! ');
                });
    }

    /**
     * si la checkbox update  est cochée,toutes les 60 secondes,
     * charge la dernière valeur pour l'ajouter au graphique
     * @returns {undefined}
     */
    let latency = function () {
        setInterval(function () {
            if (document.getElementById("Update").checked)
            {
                for (let channelIndex = 0; channelIndex < channelKeys.length; channelIndex++)  // iterate through each channel
                {
                    (function (channelIndex)
                    {
                        // get the data with a webservice call
                        $.getJSON('https://www.thingspeak.com/channels/' + channelKeys[channelIndex].channelNumber + '/feed/last.json?callback=?&amp;offset=0&amp;location=false;key=' + channelKeys[channelIndex].key, function (data)
                        {
                            for (let fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++)
                            {
                                // if data exists
                                let fieldStr = "data.field" + channelKeys[channelIndex].fieldList[fieldIndex].field;
                                let chartSeriesIndex = channelKeys[channelIndex].fieldList[fieldIndex].series;
                                if (data && eval(fieldStr))
                                {
                                    let p = []; //nouveau Highcharts.Point();
                                    let v = eval(fieldStr);
                                    p[0] = getChartDate(data.created_at);
                                    p[1] = parseFloat(v);
                                    // Obtenir la dernière date dans le tableau des data
                                    if (dynamicChart.series[chartSeriesIndex].data.length > 0)
                                    {
                                        last_date = dynamicChart.series[chartSeriesIndex].data[dynamicChart.series[chartSeriesIndex].data.length - 1].x;
                                    }
                                    let shift = false; //default for shift
                                    // si la valeur est numérique et que c'est une nouvelle date on l'ajoute 
                                    if (!isNaN(parseInt(v)) && (p[0] !== last_date))
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
    };


    // création du graphique 
    function createChart() {
        let couleurs = ['#2f7ed8', '#8bbc21', '#1aadce', '#c42525', '#0d233a', '#910000', '#492970', '#f28f43', '#77a1e5', '#a6c96a'];
        // spécification des options du graphique
        let chartOptions = {
            chart: {
                renderTo: 'chart-container',
                zoomType: 'y',
                events: {
                    load: latency
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
                text: ''
            },
            plotOptions: {
                line: {
                    gapSize: 5
                },
                series: {
                    marker: {
                        radius: 2
                    },
                    showInLegend: true,
                    animation: true,
                    step: false,
                    turboThrehold: 1000,
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
                ordinal: false,
                min: Date.UTC(2017, 2, 28),
                dateTimeLabelFormats: {
                    hour: '%H',
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
                baseSeries: 0, //select which series to show in history navigator, First series is 0
                series: {
                    includeInCSVExport: false
                }
            },
            credits: {
                href: "http://touchardinforeseau.servehttp.com/Ruche",
                text: "Section SNIR Touchard"
            },
            series: []
        };

        Highcharts.setOptions({
            lang: {
                months: ["Janvier ", "Février ", "Mars ", "Avril ", "Mai ", "Juin ", "Juillet ", "Août ", "Septembre ", "Octobre ", "Novembre ", "Décembre "],
                weekdays: ["Dimanche ", "Lundi ", "Mardi ", "Mercredi ", "Jeudi ", "Vendredi ", "Samedi "],
                shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
                decimalPoint: ',',
                resetZoom: 'Reset zoom',
                resetZoomTitle: 'Reset zoom à  1:1',
                downloadPNG: "Télécharger au format PNG image",
                downloadJPEG: "Télécharger au format JPEG image",
                downloadPDF: "Télécharger au format PDF document",
                downloadSVG: "Télécharger au format SVG vector image",
                exportButtonTitle: "Exporter image ou document",
                printChart: "Imprimer le graphique",
                noData: "Aucune donnée à  afficher",
                loading: "Chargement..."
            }

        });

        // ajoute le titre au graphique
        chartOptions.title.text = channelKeys[0].name;
        // ajoute toutes les données des channels au graphique (chart)
        for (let channelIndex = 0; channelIndex < channelKeys.length; channelIndex++)  // pour chaque channel
        {
            // pour chaque champs création des séries
            for (let fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++)  // pour chaque champs
            {

                console.log('Channel ' + channelIndex + ' field ' + fieldIndex);
                let nameSerie = channelKeys[channelIndex].fieldList[fieldIndex].name;
                let id = 'ID' + fieldIndex + channelIndex * 10;

                chartOptions.series.push({
                    data: channelKeys[channelIndex].fieldList[fieldIndex].data,
                    index: channelKeys[channelIndex].fieldList[fieldIndex].series,
                    yAxis: channelKeys[channelIndex].fieldList[fieldIndex].axis,
                    type: 'spline',
                    id: id,
                    color: couleurs[fieldIndex],
                    name: nameSerie});
                
            }
            // pour chaque champs création des séries EMA
            for (let fieldIndex = 0; fieldIndex < channelKeys[channelIndex].fieldList.length; fieldIndex++)  
            {
                let nameSerie = channelKeys[channelIndex].fieldList[fieldIndex].name;
                let nameSerieSMA = nameSerie + ' Ema';
                let id = 'ID' + fieldIndex + channelIndex * 10;
                chartOptions.series.push({
                    yAxis: channelKeys[channelIndex].fieldList[fieldIndex].axis,
                    type: 'ema',
                    linkedTo: id,
                    opacity: 0.6,
                    dashStyle: 'ShortDash',
                    name: nameSerieSMA,
                    color: couleurs[fieldIndex],
                    showInLegend: true,
                    marker: {
                        enabled: false
                    },
                    params: {
                        period: 96
                    }
                });
            }
            


        }
        // donne des noms aux axes yAxis
        chartOptions.yAxis[0].title.text = channelKeys[0].fieldList[0].name;
        if (channelKeys[0].fieldList.length > 1) {
            chartOptions.yAxis[1].title.text = channelKeys[0].fieldList[1].name;
        }
        // dessine le graphique
        dynamicChart = new Highcharts.StockChart(chartOptions);

        // ajoute l'historique

        console.log('Nb de Channels: ', channelKeys.length);
        for (let channelIndex = 0; channelIndex < channelKeys.length; channelIndex++)  // pour chaque canal
        {
            console.log('channelIndex: ', channelIndex);
            loadChannelHistory(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList, 0, 1);
        }
    }

    /**
     * Fonction pour masquer toutes les séries, via le bouton "Hide all".
     * @returns {undefined}
     */
    $("#hideAll").click(function () {
        console.log("Hide all");
        for (let index = 0; index < dynamicChart.series.length; index++)
        {
            if (dynamicChart.series[index].name !== 'Navigator 1') {
                dynamicChart.series[index].hide();
            }
            else{
                dynamicChart.series[index].show();
            }
        }
    });

    /**
     *  Fonction pour charger plus de données pour
     *  un canal donnée 
     *  Cette fonction est appellée quand le bouton load more data est cliqué
     */
    $("#loadMore").click(function loadOneChannel() {
        // load a channel selected in the popUp menu.
        let selectedChannel = document.getElementById("Channel_Select");
        let maxLoads = document.getElementById("Loads").value;
        let channelIndex = selectedChannel.selectedIndex;
        loadChannelHistory(channelIndex, channelKeys[channelIndex].channelNumber, channelKeys[channelIndex].key, channelKeys[channelIndex].fieldList, 0, maxLoads);
    }
    );

});


// load next 8000 points from a ThingSpeak channel and addPoints to a series
function loadChannelHistory(channelIndex, channelNumber, key, fieldList, numLoads, maxLoads) {
    // Affiche le loader sur le graphique
    dynamicChart.showLoading("Loading History...");

    // Recherche de la première date du graphique
    let first_Date = new Date();
    let i = 0;
    for (i = 0; i < fieldList.length; i++) {
        if (typeof fieldList[i].data[0][0] !== "undefined")
            first_Date.setTime(fieldList[i].data[0][0]);
    }
    let end = first_Date.toJSON();
    console.log('earliest date :', end);
    console.log('channelIndex :', channelIndex);
    console.log('numLoads :', numLoads);
    // get the Channel data with a webservice call
    $.getJSON('https://www.thingspeak.com/channels/' + channelNumber + '/feed.json?callback=?&amp;offset=0&amp;start=2018-01-20T00:00:00;end=' + end + ';key=' + key, function (data)
    {
        // if no access
        if (data === '-1') {
            $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
            console.log('Thingspeak Data Loading Error');
        }
        for (let fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++)  // iterate through each field
        {
            for (let h = 0; h < data.feeds.length; h++)  // iterate through each feed (data point)
            {
                let p = []; //new Highcharts.Point();
                let fieldStr = "data.feeds[" + h + "].field" + fieldList[fieldIndex].field;
                let v = eval(fieldStr);
                p[0] = getChartDate(data.feeds[h].created_at);
                p[1] = parseFloat(v);
                // if a numerical value exists add it
                if (!isNaN(parseInt(v))) {
                    fieldList[fieldIndex].data.push(p);
                }
            }
            fieldList[fieldIndex].data.sort(function (a, b) {
                return a[0] - b[0];
            });
            // On peut mettre à jour les données dynamiquement par la méthode setData
            dynamicChart.series[fieldList[fieldIndex].series].setData(fieldList[fieldIndex].data, false);
            dynamicChart.hideLoading("Loading History...");
        }
        channelKeys[channelIndex].fieldList = fieldList;
        dynamicChart.redraw();
        console.log('channel index:', channelIndex);
        numLoads++;
        if (numLoads < maxLoads) {
            loadChannelHistory(channelIndex, channelNumber, key, fieldList, numLoads, maxLoads);
        }

    });
}