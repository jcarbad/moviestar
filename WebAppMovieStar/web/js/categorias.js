$(document).ready(function() {
    $("#enviarCategoria").click(function () {
        enviarCategoria();
    });
    $("#cancelarCategorias").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("hide");
    });
    consultarCategorias();
});

$(function () {
    $("#btMostarForm1").click(function () {
        limpiarForm();
    });
    $("#btnEliminarCancelarCategoria").click(function () {
        $("#myModalVerificarEliminarCategoria").modal("hide");
    });
});

function limpiarForm() {
    //se cambia la accion por agregarCategoria
    $("#categoriasAction").val("agregarCategoria"); 
    //Resetear el formulario
    $('#formCategorias').trigger("reset");
}

function enviarCategoria(){
    if(validarCategoria()){
        $.ajax({
            url: 'CategoriasServlet', 
            data:{
                accion: $("#categoriasAction").val(),
                nombre: $("#nombreCategoria").val(),
                observaciones: $("#observaciones").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    $("#myModalFormulario").modal("hide");
                    alert("La categoría se ingreso correctamente");
                    consultarCategorias();
                    setTimeout(consultarCategorias, 3000);
                } else {
                    if (tipoRespuesta === "E~") {
                        $("#myModalFormulario").modal("hide");
                        alert("La categoría NO se ingreso correctamente");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                        $("#myModalFormulario").modal("hide");
                        alert("Hubo un error");
                    }
                }
                var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaCategorias').paginate({ "+
                                            "paginationButtonsClass:'ui basic default button',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
            },
            type: 'POST'
        });
    }
}

function consultarCategorias() {
    mostrarModal("myModal1", "Espere por favor..", "Consultando la información de las categorías");
    $.ajax({
        url: 'CategoriasServlet',
        data: {
            accion: 'consultarCategorias'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las categorías en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaCategorias(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaCategorias').paginate({ "+
                                            "paginationButtonsClass:'ui basic default button',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
                ocultarModal("myModal1");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaCategorias(dataJson){
    $("#tablaCategorias").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaCategorias").append(head);
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>OBSERVACIONES</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaCategorias(dataJson[i]);
    }
    $("#tablaCategorias").append("<tfoot></tfoot>");
}

function dibujarFilaCategorias(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    
    var row = $("<tr />");
    $("#tablaCategorias").append(row);
    row.append($("<td>" + rowData.CId + "</td>"));
    row.append($("<td>" + rowData.CNombre + "</td>"));
    row.append($("<td>" + rowData.CObs + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="editarCategoria('+rowData.CId+');">'+
                        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="verificarEliminarCategoria('+rowData.CId+');">'+
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+
                    '</button></td>'));
}

function editarCategoria(id) {
    mostrarModal("myModal1", "Espere por favor..", "Consultando la categoría seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'CategoriasServlet',
        data: {
            accion: "consultarCategoriasPorId",
            idCategoria: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se dio un error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            ocultarModal("myModal1");
            limpiarForm();
            //se muestra el formulario
            $("#myModalFormulario").modal();
            //************************************************************************
            //carga información de la persona en el formulario
            //************************************************************************
            //se indicar que la cédula es solo readOnly
            //$("#cedula").attr('readonly', 'readonly');
            
            //se modifica el hidden que indicar el tipo de accion que se esta realizando
            $("#categoriasAction").val("modificarCategoria"); 
            
            //se carga la información en el formulario
            $("#nombreCategoria").val(data.CNombre);
            $("#observaciones").val(data.CObs);
             
            
        },
        type: 'POST',
        dataType: "json"
    });
}



function verificarEliminarCategoria(id) {
    $("#myModalVerificarEliminarCategoria").modal("show");
    document.getElementById("btnEliminarCategoria").onclick= function() {
        $("#myModalVerificarEliminarCategoria").modal("hide");
        eliminarCategoria(id);
    };  
}

function eliminarCategoria(ide){
    $.ajax({
        url: 'CategoriasServlet',
        data: {
            accion: 'eliminarCategorias',
            idCategoria: ide
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal","Resultado acción","Se presento un error, contactar al administador");
            alert("La categoria NO fue eliminada");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            //consultarCategorias();
        },
        type: 'POST',
        dataType: "text"
    });
}

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mesajeResult").removeClass();

    //se setean los estilos
    $("#mesajeResult").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mesajeResult").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}

function validarCategoria(){
    var validacion = true;
    $("#groupNombreCategoria").removeClass("has-error");
    if ($("#nombreCategoria").val() === "" || $("#nombreCategoria").val().length > 15) {
        $("#groupNombreCategoria").addClass("has-error");
        validacion = false;
    }
    return validacion;
}
