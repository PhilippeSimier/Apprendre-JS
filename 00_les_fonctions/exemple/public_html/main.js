/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Fonction classique
function kingOfCool() {
    alert('Message 2');
}

// Fonction test mémorisée dans la variable message
var nomme = function test() {
    alert('Message 3');
};

var anonyme = function () {
    alert('Message 4');
};

// Fonction anonyme mémorisée dans la variable message4

$(document).ready(function () {
    // Fonction anonyme comme argument de la fct click
    $("#element1").click(function () {
        console.log("Le paragraphe a été cliqué.");
    });
    // Fonction nommé kingOfCool comme argument de la fct click
    $("#element2").click(kingOfCool);

    $("#element3").on('click', nomme);

    $("#element4").on('click', anonyme);


    // Une fonction anonyme comme argument d'une fonction map
    const multiplicateur = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var table7 = multiplicateur.map(function (arrayCell) {
        return arrayCell * 7;
    });

    console.log(table7);

    // Une fonction qui retourne une fonction
    var parkRides = [
        ["Birch Bumper", 40],
        ["Pines Plunge", 55],
        ["Cedar Coaster", 20],
        ["Ferris Wheel of firs", 90]
    ];

    var fastPassQueue = [
        "Cedar Coaster",
        "Pines Plunge",
        "Birch Bumper",
        "Pines Plunge"
    ];


    function buildTicket(allRides, parkRides, pick) {

        if (parkRides[0] === pick) {

            var pass = parkRides.shift();

            return function () {
                alert("Rapide ! Vous avez un fast pass pour " + pass + "!");
            };

        } else {
            for (var i = 0; i < allRides.length; i++) {
                if (allRides[i][0] === pick) {

                    return function () {
                        alert("Je vous imprime un ticket pour " + pick + " !\n" +
                                "Votre temps d'attente est de " + allRides[i][1] + "min :)");
                    };
                }
            }

        }
    }


    var wantsRide = "Pines Plunge";


    var ticket = buildTicket(parkRides, fastPassQueue, wantsRide);
    ticket();
    
    // Il existe un moyen d’exécuter les function retournées sans passer par une fonction expression.
    buildTicket(parkRides, fastPassQueue, "Birch Bumper")();






});



