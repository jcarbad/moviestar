$(document).ready(function() {
    $("#enviarCatalogos").click(function () {
        enviarCatalogo();
    });
    consultarCatalogos();
});

$(function () {
    $("#btnEliminarCancelarCatalogo").click(function () {
        $("#myModalVerificarEliminarCatalogo").modal("hide");
    });
    
    $("#btMostarForm0").click(function () {
        limpiarForm();
    });
});


function consultarCatalogos() {
    mostrarModal("myModal0", "Espere por favor..", "Consultando la información de los catágos");
    $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: 'consultarCatalogo'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaCatalogos(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaCatalogos').paginate({ "+
                                            "paginationButtonsClass:'ui basic default button',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
                ocultarModal("myModal0");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaCatalogos(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaCatalogos").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaCatalogos").append(head); 
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>TIPO</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>DIRECTOR</b></th>"));
    row.append($("<th><b>ACTOR PRINCIPAL</b></th>"));
    row.append($("<th><b>CATEGORIA</b></th>"));
    row.append($("<th><b>CANTIDAD</b></th>"));
    row.append($("<th><b>PRECIO ALQUILER<b></th>"));
    row.append($("<th><b>PRECIO VENTA</b></th>"));
    row.append($("<th><b>INFORMACIÓN</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaCatalogos(dataJson[i]);
    }
    $("#tablaCatalogos").append("<tfoot></tfoot>");
}

function dibujarFilaCatalogos(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    
    var row = $("<tr />");
    $("#tablaCatalogos").append(row); 
    row.append($("<td>" + rowData.CId + "</td>"));
    row.append($("<td>" + rowData.CTipo + "</td>"));
    row.append($("<td>" + rowData.CNombre + "</td>"));
    row.append($("<td>" + rowData.CDirector + "</td>"));
    row.append($("<td>" + rowData.CActorPrin + "</td>"));
    row.append($("<td>" + rowData.categorias + "</td>"));
    row.append($("<td>" + rowData.CCantidad + "</td>"));
    row.append($("<td>" + rowData.CPrecAlqu+ "</td>"));
    row.append($("<td>" + rowData.CPrecComp+ "</td>"));
    row.append($("<td>" + rowData.CDescrip+ "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="editarCatalogos('+rowData.CId+');">'+
                        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="verificarEliminarCatalogo('+rowData.CId+');">'+
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+
                    '</button></td>'));
}

function editarCatalogos(id) {
   //Se envia la información por ajax
    $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: "consultarCatalogosPorId",
            idCatalogo: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se dio un error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            ocultarModal("myModal0");
            limpiarForm();
            //se muestra el formulario
             $("#myModalFormulario2").modal();
            //************************************************************************
            //carga información de la persona en el formulario
            //************************************************************************
            //se indicar que la cédula es solo readOnly
            //$("#cedula").attr('readonly', 'readonly');
            
            //se modifica el hidden que indicar el tipo de accion que se esta realizando
            $("#catalogosAction").val("modificarCatalogo"); 
            
            //se carga la información en el formulario
            $("#nombreCatalogo").val(data.CNombre);
           // $("#tipo").select(data.CTipo);
            $("#nombreDirector").val(data.CDirector);
            $("#cantidadE").val(data.CCantidad);
            $("#actorPrincipal").val(data.CActorPrin);
            //$("#categoria").select(data.categorias);
            $("#precioAlquiler").val(data.CPrecAlqu);
            $("#precioVenta").val(data.CPrecComp);
            $("#urlImagen").val(data.CUrlImg);
            $("#descrip").val(data.CDescrip);
            
        },
        type: 'POST',
        dataType: "json"
    });
}

function limpiarForm() {
    //se cambia la accion por agregarCatalogos
    $("#catalogosAction").val("agregarCatalogo"); 
    //Resetear el formulario
    $('#formCatalogos').trigger("reset");
}



function enviarCatalogo(){
    if(validarCatalogo()){
        $.ajax({
            url: 'CatalogosServlet', 
            data:{
                accion: $("#catalogosAction").val(),
                tipo: $("#tipo").val(),
                nombre: $("#nombreCatalogo").val(),
                director: $("#nombreDirector").val(),
                cantidad: $("#cantidadE").val(),
                actor: $("#actorPrincipal").val(),
                categoria: $("#categoria").val(),
                precioA: $("#precioAlquiler").val(),
                precioV: $("#precioVenta").val(),
                urlImg: $("#urlImagen").val(),
                descripc: $("#descrip").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    setTimeout($("#myModalFormulario2").modal("hide"), 5000);
                    consultarCatalogos();
                    $("#basicSuccessPosition").click();
                    
                }  else {
                    if (tipoRespuesta === "E~") {
                        $("#myModalFormulario2").modal("hide");
                        alert("El catalogo NO se ingreso correctamente");
                    } else {
                        $("#myModalFormulario2").modal("hide");
                        alert("Hubo un error");
                    }
                }
                
                var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaCatalogos').paginate({ "+
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
    else{
        $("#basicWarningAnimation").click();
    }
}

function validarCatalogo(){
    var validacion = true;
    $("#groupNombre").removeClass("has-error");
    $("#groupDirector").removeClass("has-error");
    $("#groupActorPrincipal").removeClass("has-error");
    $("#groupPrecioAlquiler").removeClass("has-error");
    $("#groupPrecioVenta").removeClass("has-error");
    $("#groupCantidad").removeClass("has-error");
    
    if ($("#nombreCatalogo").val() === "" || $("#nombreCatalogo").val().length > 45) {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#nombreDirector").val() === "" || $("#nombreDirector").val().length > 45) {
        $("#groupDirector").addClass("has-error");
        validacion = false;
    }
    if ($("#actorPrincipal").val() === "" || $("#actorPrincipal").val().length > 45) {
        $("#groupActorPrincipal").addClass("has-error");
        validacion = false;
    }
    if (!testInputData("precioAlquiler", numbersOnly) || $("#precioAlquiler").val().length > 8) {
        $("#groupPrecioAlquiler").addClass("has-error");
        validacion = false;
    }
    if (!testInputData("precioVenta", numbersOnly) || $("#precioVenta").val().length > 8) {
        $("#groupPrecioVenta").addClass("has-error");
        validacion = false;
    }
    if (!testInputData("cantidadE", numbersOnly) || $("#cantidadE").val().length > 8) {
        $("#groupCantidad").addClass("has-error");
        validacion = false;
    }
    
    return validacion;
}

function testInputData(myfield, restrictionType) {
  var myData = document.getElementById(myfield).value;
  if(myData!==''){
   if(restrictionType.test(myData)){
    return true;
   }else{
     return false;
   }
  }
  return;
    
 }
 
function verificarEliminarCatalogo(id) {
    $("#myModalVerificarEliminarCatalogo").modal("show");
    document.getElementById("btnEliminarCatalogo").onclick= function() {
        $("#myModalVerificarEliminarCatalogo").modal("hide");
        eliminarCatalogo(id);
    };  
}
 
function eliminarCatalogo(id){
    $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: 'eliminarCatalogo',
            codigo: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal","Resultado acción","Se presento un error, contactar al administador");
            alert("El usuario NO fue eliminado");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            alert("El usuario fue eliminado correctamente");
            consultarCatalogos();
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaCatalogos').paginate({ "+
                                            "paginationButtonsClass:'ui basic default button',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
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

 
 var numbersOnly = /^\d+$/;
 var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
 var uppercaseOnly = /^[A-Z]+$/;
 var lowercaseOnly = /^[a-z]+$/;
 var stringOnly = /^[A-Za-z0-9]+$/;