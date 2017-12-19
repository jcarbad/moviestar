$(document).ready(function() {
    buscarCatalogo();
});


function buscarCatalogo(){
     $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: 'buscarCatalogo',
            nombreCatalogo: $('#name').val()
            
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            if (data.length <= 0){
                $('#search').append("</br></br><div class='text-center'><h2><b>Lo sentimos! No se ha encontrado ninguna coincidencia</b></h2></div>");
                
            }
            else {
                dibujarCatalogo(data);
                
            }

        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarCatalogo(data){
    var val2 = $('#typeUser').val(); //si el tipo de usuario es cliente entonces si me permite guardar
    var val = $('#sesion').val();
    $('#search').html("");
    for (var i =0; i < data.length; i++){
        var text= ("<div class='col-lg-4 col-sm-6'"+
                "><div class='portfolio-box'><img src="+data[i].CUrlImg+
                " class='img-responsive' alt=''>"+
                            "<div class='portfolio-box-caption'>"+
                                "<div class='portfolio-box-caption-content'>"+
                                    "<div class='project-category text-faded'>"+data[i].CNombre+
                                    "</div>"+
                                    "<div class='project-name'>"+data[i].CDescrip+
                                         "<br/>"+
                                        "Precio de venta: $" + data[i].CPrecComp +"<br/>"+
                                        "Precio de renta: $"+ data[i].CPrecAlqu +"<br/>");
                                        if (val2 !== "a" && val!== "f"){
                                            text += ("<button type='submit' class='btn btn-default'"+
                                            "><span class='glyphicon glyphicon-shopping-cart'></span></button>");
                                        }
                                    text +=("</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div> ");
            $('#search').append(text);
    }
}
/*
 * var val2 = $('#typeUser').val(); //si el tipo de usuario es cliente entonces si me permite guardar
    var val = $('#sesion').val();
    $('#show').html("");
    for (var i =0; i < data.length; i++){
        var text =("<form method='post' action='carrito.jsp'><div class='col-lg-4 col-sm-6'"+
                "><div class='portfolio-box'><img src="+data[i].CUrlImg+
                " class='img-responsive' alt=''>"+
                            "<div class='portfolio-box-caption'>"+
                            "<input type='hidden' name='nombre' value='"+data[i].CNombre+"'/>"+
                            "<input type='hidden' name='id' value='"+data[i].CId+"'/>"+
                            "<input type='hidden' name='alq' value='"+data[i].CPrecAlqu+"'/>"+
                            "<input type='hidden' name='com' value='"+data[i].CPrecComp+"'/>"+
                                "<div class='portfolio-box-caption-content'>"+
                                    "<div class='project-category text-faded'>"+data[i].CNombre+
                                    "</div>"+
                                    "<div class='project-name'>"+data[i].CDescrip+
                                         "<br/>"+
                                        "Precio de venta: ₡" + data[i].CPrecComp +"<br/>"+
                                        "Precio de renta: ₡"+ data[i].CPrecAlqu +"<br/>");
                                        if (val2 !== "a" && val!== "f"){
                                            text += ("<button type='button' class='btn btn-default' onclick=add('"+data[i].CId+"','"+encodeURIComponent(data[i].CNombre)+"','"
                                            +data[i].CPrecAlqu+"','"+data[i].CPrecComp+"')><span class='glyphicon glyphicon-shopping-cart'></span></button>");
                                        }
                                    text +=("</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div> </form>");
            $('#show').append(text);
    }
    $('#show').append("<script src="+ "js/header.js"+"/></script>");
 */

