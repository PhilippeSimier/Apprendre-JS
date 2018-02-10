
$(document).ready(function(){
    
    $("#rechercher").keyup(function(){
        if($(this).val().length >= 1){  // si au moins un caractère est saisi
            $.ajax({
		type: "GET",
		url: "https://philippes.ddns.net/exo/Ajax/pays.php",
		data:'nomPays=' + $(this).val(),
		beforeSend: function(){
			$("#rechercher").css("background","#FFF url(LoaderIcon.gif) no-repeat 30px");
		},
		success: function(dataJson){
			
                        $("#suggestions").show();
                        // les données reçues sont transformées au format html
                        dataHtml = transformation(dataJson);
			$("#suggestions").html(dataHtml);
			$("#rechercher").css("background","#FFF");
		}
            });    
        }
                
    });
});

// Cette fonction transforme un liste au format JSON
// en liste au format HTML
function transformation(dataJson){
    
    dataHtml = '<ul id="listePays">';
    for (var i = 0; i < dataJson.length ; i++) {
        dataHtml += '<li onClick="select(\'' + dataJson[i] + '\');">' + dataJson[i] + '</li>';
    }
    dataHtml += '</ul>';
    console.log(dataHtml);
    return dataHtml;
}

function select(val) {
$("#rechercher").val(val);
$("#suggestions").hide();
}

