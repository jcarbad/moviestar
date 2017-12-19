$(document).ready(function() {
    cargarCatalogos();
    $('.SeeMore2').click(function(){
    var $this = $(this);
    $this.toggleClass('SeeMore2');
    if($this.hasClass('SeeMore2')){
            $this.text('Leer Más');			
    } else {
            $this.text('Leer Menos');
    }
    });
});

function cargarCatalogos(){
    $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: 'ultimosCatalogos'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            ultimosCatalogos(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function ultimosCatalogos(data){
    var val2 = $('#typeUser').val(); //si el tipo de usuario es cliente entonces si me permite guardar
    var val = $('#sesion').val();
    var count =0;
    if(data.length > 4){
        $('#reciente').append("<div class='item'>"+
                                    "<ul class='thumbnails' id='noActivo'>"+
                                      "</ul>"+
                                    "</div>"+  
                                "</div>");
        $('#prevNext').append("<a data-slide='prev' href='#myCarousel' class='carousel-control left'>‹</a>"+
                                "<a data-slide='next' href='#myCarousel' class='carousel-control right'>›</a>");
    }
    for (var i = 0; i < data.length && count <= 8; i++){
        count++;
        var text = ("<li class='col-sm-3'>"+  
                    "<div class='thumbnail'>"+
                        "<a href='#'><img src="+data[i].CUrlImg+" alt=''></a>"+
                    "</div>"+
                    "<div class='caption-box'>"+
                        "<h4>"+data[i].CNombre+"</h4>"+
                            "<div class='panel panel-primary'>"+
                                "<div id="+data[i].CId+" class='collapse panel-body'>"+
                                    "<p>"+data[i].CDescrip+"</p>"+
                                    "<h6>Precio de venta:"+data[i].CPrecComp+"</h6>"+
                                    "<h6>Precio de renta:"+data[i].CPrecAlqu+"</h6>");
                                  if (val2 !== "a"&& val!== "f"){
                                   text += ("<button type='button' class='btn btn-default' onclick=add('"+data[i].CId+"','"+encodeURIComponent(data[i].CNombre)+"','"
                                        +data[i].CPrecAlqu+"','"+data[i].CPrecComp+"')><span class='glyphicon glyphicon-shopping-cart'></span></button>");
                                  }
                                  text +=("</div>"+
                            "</div>"+
                        "<a class='SeeMore2 btn btn-primary btn-mini'"+
                        "data-toggle='collapse' href='#"+data[i].CId+"'"+
                        ">Leer Más <span class='glyphicon glyphicon-arrow-right'></span></a>"+
                    "</div>"+
                "</li>");
        if (count > 4){
            $('#noActivo').append(text);
        }
        else {
            $('#activo').append(text);
        }

}
}