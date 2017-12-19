

$(document).ready(function(){
//    $('#tipo').change(function(){
//        tipo = $('#tipo').val();
//         get();
//    });
    get();
});


$(function () {
    $("#btnEliminarCancelar").click(function () {
       $("#myModalVerificarEliminar").modal("hide");
    });
   
});

$(function () { 
  $("#agregar").click(function (){
      agregarOrden();
  });
});

function mostrarFecha(){
   var hoy= new Date();
   var dia = hoy.getDay();
   if(dia < 10){
        var day= "0"+dia;
   }
   else
   {
       var day= "0"+dia;
   }
   var mes= hoy.getMonth()+1;
   var anio= hoy.getFullYear();
   var fecha_actual= String(day+"/"+mes+"/"+anio);
   return fecha_actual;
}

function get(){
    $.ajax({
        url: 'CarritoServlet',
        data: {
            accion: 'get'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las categorías en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            if (data === null || data.length <= 0){
                $('#carro').html("");
                $('#carro').append("<h2>No se ha añadido ningún elemento al carrito</h2>");
                $('#carro').append("<script src="+ "js/header.js"+"/></script>");
            }
            else {
                dibujarCarrito(data);
                total();
            }
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarCarrito(dataJson) {
    //limpia la información que tiene la tabla
    $("#cart").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#cart").append(head); 
    row.append($("<th class='text-center'><b>ID</b></th>"));
    row.append($("<th class='text-center'><b>PRODUCTO</b></th>"));
    row.append($("<th class='text-center'><b>ACCION</b></th>"));
    row.append($("<th class='text-center'><b>PRECIO</b></th>"));
    row.append($("<th class='text-center'><b>SUBTOTAL</b></th>"));
    
    var body = $("<tbody />");
    $("#cart").append(body); 
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaCarrito(dataJson[i], i, body);
        
    }
    _footer(dataJson[i]);
    
}

function _footer(rowData){
    var foot = $("<tfoot />");
    var x=document.getElementById('cart').rows;
    var rowFoot = ("<tr>"+
                            "<td><a href='index.jsp' class='btn btn-warning'><i class='fa fa-angle-left'></i> Continuar Comprando</a></td>"+
                            "<td colspan='2' class='idden-xs'></td>"+
                            "<td class='hidden-xs text-center' id='tot'><strong>Total $1.99</strong></td>"+
                            "<td><form action='https://www.sandbox.paypal.com/cgi-bin/webscr' method='post' target='_blank'>"+
                            "<input type='hidden' name='cmd' value='_cart'>"+
                            "<input type='hidden' name='business' value='byron15-facilitator@hotmail.es'>"+
                            "<input type='hidden' name='upload' value='1'>"+
                            "<input type='hidden' name='lc' value='MX'> <t:enumeration>");
                            for (var i =0; i< x.length-1; i++){
                                var y=x[i+1].cells;
                                rowFoot += (
                                    "<input type='hidden' name='item_name_"+(i+1)+"' value='"+y[0].textContent+"'>"+
                                    "<input type='hidden' name='amount_"+(i+1)+"' value='"+y[3].innerHTML+"'>"
                                );
                            }
                            rowFoot += (
                            "</t:enumeration><input type='hidden' name='button_subtype' value='services'>"+
                            "<input type='hidden' name='no_note' value='0'>"+
                            "<input type='hidden' name='currency_code' value='USD'>"+
                            "<input type='hidden' onclick='agregarOrden();' name='bn' value='PP-BuyNowBF:btn_paynow_LG.gif:NonHostedGuest'>"+
                            "<input type='image' onclick='agregarOrden();'  src='https://www.paypalobjects.com/es_XC/i/btn/btn_paynow_LG.gif' border='0' name='submit' alt=''>"+
                            "<img alt='' border='0' src='https://www.paypalobjects.com/es_XC/i/scr/pixel.gif' width='1' height='1'>"+
                            "</form>"+
                            "</td>"+
                    "</tr>");
    foot.append($(rowFoot));
    $("#cart").append(foot);
}
function dibujarFilaCarrito(rowData, i, body) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    var row = $("<tr />");
    body.append(row);
    row.append($("<td data-th='ID' id='id' class='text-center'>"+rowData.CId+"</td>"));
    row.append($("<td data-th='PRODUCTO'>"+
                    "<div class='row'>"+
                        "<div class='col-sm-10' id= 'nombre' >"+
                                "<h4 class='nomargin'>"+rowData.CNombre+"</h4>"+
                        "</div>"+
                    "</div>"+
                "</td>"));
        row.append($("<td data-th='ACCION' class='text-center'><select id='accion' name='tipoVA' onchange=change("+i+","+rowData.CPrecComp+","+rowData.CPrecAlqu+");>"+
                                    "<option value='compra'>Compra</option>"+
                                    "<option value='alquiler' >Alquiler</option>"+
                                "</select></td>"));
        row.append($("<td data-th='PRECIO' id='precio' class='text-center'>"+rowData.CPrecComp+"</td>"));
        row.append($("<td data-th='Subtotal' id='subTotal' class='text-center'>"+rowData.CPrecComp+"</td>"));
    row.append($("<td class='actions' data-th=''>"+
                    "<button class='btn btn-danger btn-sm' onclick='verificarEliminar("+rowData.CId+")'><i class='fa fa-trash-o'></i></button>"+								
                "</td>"));
}


function agregarOrden(){
    var val = $('#idUser').val();
    $.ajax({
        url: 'OrdenesServlet', 
        data:{
            accion: "agregarOrden",
            fecha: mostrarFecha(),
            usuario: val
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se dio un error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
               agregar(data);
//             var respuestaTxt = data.substring(2);
//             var tipoRespuesta = data.substring(0, 2);
//                if (tipoRespuesta === "C~") {
//                    alert(respuestaTxt);
//                }
//                if (tipoRespuesta === " E~") {
//                    alert(respuestaTxt);
//                +}
        get();
        },
        type: 'POST',
        dataType: "json"
    });
}

function agreg(data){
    var d = data.OFecha;
    var n = d.toString();
    alert(n);
}



function agregar(data){
    var x=document.getElementById('cart').rows;  //Toma las filas de la tabla
    var d = data.fecha; 
    //var fecha = String(d); //Una misma fecha para todos los detalles
    var idOrden= data.id;
    for (var i =1; i < x.length-1; i++){   //Toma una por una las filas de la tabla, i representa la fila
        var y=x[i].cells;  //y representa las columnas, por ejemplo y[3] es el precio en la tabla
        var precio = y[4].innerHTML;
        var tipo= y[2].childNodes[0].selectedIndex;
        var type;
        var idC = y[0].innerText;
        if(tipo===0){
            type= "compra";
        }
        else{
            type="alquiler";
        }
        window.setTimeout(agregarDetalle(precio, type, d, idOrden, idC), 1500);
        
    }
}

function agregarDetalle(precio, type, fecha, idOrden, idC){
    $.ajax({
        url: 'DetallesServlet',
        data: {
            accion: 'agregarDetalle',
            tipo: type,
            precio: precio,
            fechaLimite: fecha,
            idOrden: idOrden,
            idC : idC
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    alert("Se agregó el detalle correctamente");
                }
                else
                    if(tipoRespuesta === "E~"){
                        alert("Error");
                    }
        },
        type: 'POST'
    });
}

function change(i, com, alq){
    
    var x=document.getElementById('cart').rows;
    var y=x[i+1].cells;
    tipo = y[2].childNodes[0].selectedIndex;
    if (tipo ===  0){
       y[3].innerHTML=com;
       y[4].innerHTML=com;
    }
    else {
       y[3].innerHTML=alq;
       y[4].innerHTML=alq;
    }
    $('tfoot').html("");
    _footer();
    total();
}

function total(){
    var sum =0;
    var x=document.getElementById('cart').rows;
    for (var i =1; i < x.length-1; i++){
        var y=x[i].cells;
        sum = sum + parseInt(y[4].innerHTML);
    }
    var t = document.getElementById('tot');
    t.innerHTML = "<strong>Total: $"+sum+"</strong>";
}

function verificarEliminar(id) {
    $("#myModalVerificarEliminar").modal("show");
    document.getElementById("btnEliminar").onclick= function() {
        $("#myModalVerificarEliminar").modal("hide");
        borrar(id);
    };  
}


function borrar(i){
    $.ajax({
        url: 'CarritoServlet',
        data: {
            accion: 'delete',
            id: i
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las categorías en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            get();
        },
        type: 'POST'
    });
}
