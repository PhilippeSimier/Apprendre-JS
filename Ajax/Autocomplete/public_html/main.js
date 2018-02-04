
$(document).ready(function(){
    
    $("#rechercher").keyup(function(){
        if($(this).val().length >= 1){
            $.ajax({
		type: "GET",
		url: "https://philippes.ddns.net/exo/Ajax/pays.php",
		data:'nomPays='+$(this).val(),
		beforeSend: function(){
			$("#rechercher").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
		},
		success: function(data){
			
                        $("#suggestions").show();
                        // fonction transforme JSON en liste html
                        dataListe = transformation(data);
			$("#suggestions").html(dataListe);
			$("#rechercher").css("background","#FFF");
		}
            });    
        }
                
    });
});

function transformation(data){
    
    dataliste = '<ul id="listePays">';
    for (var i = 0; i < data.length ; i++) {
        dataliste += '<li onClick="select(\'' + data[i] + '\');">' + data[i] + '</li>';
    }
    dataliste += '</ul>';
    console.log(dataliste);
    return dataliste;
}

function select(val) {
$("#rechercher").val(val);
$("#suggestions").hide();
}

