/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Debe guardar en la tabla la fecha de compra, el usuario, el estado, 


$(document).ready(function() {
    consultarOrdenes();
});


function consultarOrdenes(){
    $.ajax({
        url: 'OrdenesServlet',
        data: {
            accion: 'consultarOrdenes'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaOrdenes(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaOrdenes').paginate({ "+
                                            "paginationButtonsClass:'ui basic button .btn-primary',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 10 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaOrdenes(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaOrdenes").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaOrdenes").append(head); 
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>FECHA</b></th>"));
    row.append($("<th><b>USUARIO</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaOrdenes(dataJson[i]);
    }
    $("#tablaOrdenes").append("<tfoot></tfoot>");
}

function dibujarFilaOrdenes(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    
    var row = $("<tr />");
    $("#tablaOrdenes").append(row); 
    row.append($("<td>" + rowData.id + "</td>"));
    row.append($("<td>" + rowData.fecha + "</td>"));
    row.append($("<td>" + rowData.usuario + "</td>"));
    row.append($("<td><button id='boton"+rowData.id+"' data-toggle='modal' data-target='.bd-example-modal-lg' onclick='consultarDetalles("+rowData.id+");' type='button' class='btn btn-default ' aria-label='Left Align' onclick='modificarOrden('"+rowData.id+"');>"+
                        '<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>'+
                    '</button>'+
                    '</td>'));
}

function consultarDetalles(id){
    $.ajax({
        url: 'DetallesServlet',
        data: {
            accion: 'consultarDetallesPorId',
            id: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaDetalles(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaDetalles').paginate({ "+
                                            "paginationButtonsClass:'ui basic button .btn-primary btn-xs',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaDetalles(dataJson) {
    $("#tablaDetalles").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaDetalles").append(head); 
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>TIPO</b></th>"));
    row.append($("<th><b>FECHA</b></th>"));
    row.append($("<th><b>PRECIO</b></th>"));
    row.append($("<th><b>ESTADO</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaDetalles(dataJson[i], (i+1));
    }
    $("#tablaDetalles").append("<tfoot></tfoot>");
}

function dibujarFilaDetalles(rowData, i){
    var row = $("<tr />");
    $("#tablaDetalles").append(row); 
    row.append($("<td>" + rowData.id + "</td>"));
    row.append($("<td>" + rowData.tipo + "</td>"));
    row.append($("<td>" + rowData.fechaL + "</td>"));
    row.append($("<td>" + rowData.precio + "</td>"));
    if (rowData.estado === "proceso")
    row.append($("<td><select id='estado' name='estado' class='form-control'>"+
                                    "<option value='proceso' selected='selected'>Proceso</option>"+
                                    "<option value='ruta' >Ruta</option>"+
                                    "<option value='entregado' >Entregado</option>"+
                                    "<option value='devuelto' >Devuelto</option>"+
                                "</select></td>"));
    if (rowData.estado === "ruta")
    row.append($("<td><select id='estado' name='estado' class='form-control'>"+
                                    "<option value='proceso' >Proceso</option>"+
                                    "<option value='ruta' selected='selected'>Ruta</option>"+
                                    "<option value='entregado' >Entregado</option>"+
                                    "<option value='devuelto' >Devuelto</option>"+
                                "</select></td>"));
    if (rowData.estado === "entregado")
    row.append($("<td><select id='estado' name='estado' class='form-control'>"+
                                    "<option value='proceso>Proceso</option>"+
                                    "<option value='ruta'>Ruta</option>"+
                                    "<option value='entregado' selected='selected'>Entregado</option>"+
                                    "<option value='devuelto' >Devuelto</option>"+
                                "</select></td>"));
    if (rowData.estado === "devuelto")
    row.append($("<td><select id='estado' name='estado'  class='form-control'>"+
                                    "<option value='proceso>Proceso</option>"+
                                    "<option value='ruta'>Ruta</option>"+
                                    "<option value='entregado'>Entregado</option>"+
                                    "<option value='devuelto' selected='selected'>Devuelto</option>"+
                                "</select></td>"));
    row.append($("<td><button id='boton"+rowData.id+"' data-toggle='modal' data-target='.bd-example-modal-lg' onclick='change("+i+");' type='button' class='btn btn-default' aria-label='Left Align' onclick='modificarOrden('"+rowData.id+"');>"+
                        '<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>'+
                    '</button>'+
                    '</td>'));
}
function guardarOrden(id) {
    //Se envia la información por ajax
    $.ajax({
        url: 'OrdenesServlet',
        data: {
            accion: "moficarOrden",
            idCatalogo: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se dio un error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            alert(data);
        },
        type: 'POST'
    });
}

function change(xid){
    var x=document.getElementById('tablaDetalles').rows;
    var y=x[xid].cells;
    var id = y[0].innerText;
    tipo = y[4].childNodes[0].selectedIndex;
    var send = "";
    if (tipo === 1)
        send = "ruta";
    if (tipo === 2)
        send = "entregado";
    if (tipo === 3)
        send = "devuelto";
    if (tipo === 0)
        send = "proceso";
    $.ajax({
        url: 'DetallesServlet',
        data: {
            accion: "modificarDetalles",
            id: id,
            estado: send
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se dio un error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            alert(data);
        },
        type: 'POST'
    });
}

function modificarDetalles(id) {
    var x=document.getElementById('tablaDetalles').rows;
    var y=x[id].cells;
    var id = y[0].innerText;
    tipo = y[4].childNodes[0].selectedIndex;
}
function estado(id) {
    var x=document.getElementById('tablaOrdenes').rows;
    var y=x[1].cells;
    tipo = y[1].childNodes[0].selectedIndex;
    if (tipo ===  0){
       y[2].innerHTML=com;
       y[3].innerHTML=com;
    }
    else {
       y[2].innerHTML=alq;
       y[3].innerHTML=alq;
    }
}