$(document).ready(function(){
   consultarUsuarios();
   $("#enviarUsuarios").click(function () {
        enviarUsuario();
    });
   $("#cancelarUsuarios").click(function () {
        limpiarForm();
        enviarUsuario();
    }); 
    
});

$(function () {
    $("#btnEliminarCancelarUsuario").click(function () {
        $("#myModalVerificarEliminarUsuario").modal("hide");
    });
    
    $("#btMostarForm2").click(function () {
        limpiarForm();
    });
});

function consultarUsuarios() {
    mostrarModal("myModal2", "Espere por favor..", "Consultando la información de los usuarios");
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'consultarUsuarios'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los usuarios en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaUsuarios(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaUsuarios').paginate({ "+
                                            "paginationButtonsClass:'ui basic button .btn-primary',"+
                                            "paginationButtonsContainerClass:'ui right aligned',"+
                                            "previousButtonContent: 'Anterior',"+
                                            "nextButtonContent: 'Siguiente',"+
                                            "pageLength: 5 "+
                                    "});"+
                            "}); ";
                document.body.appendChild(script);
                ocultarModal("myModal2");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaUsuarios(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaUsuarios").html(""); 
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaUsuarios").append(head); 
    row.append($("<th><b>NOMBRE USUARIO</b></th>"));
    row.append($("<th><b>CONTRASEÑA</b></th>"));
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>APELLIDOS</b></th>"));
    row.append($("<th><b>CORREO</b></th>"));
    row.append($("<th><b>FECHA DE NACIMIENTO<b></th>"));
    row.append($("<th><b>DIRECCIÓN</b></th>"));
    row.append($("<th><b>TELÉFONO FIJO</b></th>"));
    row.append($("<th><b>TELÉFONO CELULAR</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaUsuarios(dataJson[i]);
    }
    $("#tablaUsuarios").append("<tfoot></tfoot>");
}

function dibujarFilaUsuarios(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    
    var row = $("<tr />");
    $("#tablaUsuarios").append(row); 
    row.append($("<td>" + rowData.user + "</td>"));
    row.append($("<td>" + rowData.contrasena + "</td>"));
    row.append($("<td>" + rowData.id + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellidos + "</td>"));
    row.append($("<td>" + rowData.correo + "</td>"));
    row.append($("<td>" + rowData.cumple + "</td>"));
    row.append($("<td>" + rowData.direccion + "</td>"));
    row.append($("<td>" + rowData.telCasa + "</td>"));
    row.append($("<td>" + rowData.telCel + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="editarUsuarios('+rowData.UId+');">'+
                        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="verificarEliminarUsuario('+rowData.UId+');">'+
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+
                    '</button></td>'));
}

function limpiarForm() {
    //setea el focus del formulario
    $('#ide').focus();
    $("#ide").removeAttr("readonly"); //elimina el atributo de solo lectura
    
    //se cambia la accion por agregarPersona
    $("#usuariosAction").val("agregarUsuario"); 


    //Resetear el formulario
    $('#formUsuarios').trigger("reset");
}

function editarUsuarios(id) {
    mostrarModal("myModal2", "Espere por favor..", "Consultando la información del usuario seleccionado");
    //Se envia la información por ajax
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'consultarUsuariosById',
            idUsuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error!!");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            //se muestra el formulario
            ocultarModal("myModal2");
            limpiarForm();
            $("#myModalFormulario3").modal();
            
            //************************************************************************
            //carga información de la persona en el formulario
            //************************************************************************
            //se indicar que la cédula es solo readOnly
            $("#ide").attr('readonly', 'readonly');
            $("#ide").val(data.UId);
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#usuariosAction").val("modificarUsuario"); 
            
            //se carga la información en el formulario
            $("#nombre").val(data.UNombre);
            $("#apellidos").val(data.UApellidos);
            $("#usuario").val(data.UUsuario);
            $("#contrasena").val(data.UContrasena);
            $("#correo").val(data.UCorreo);
            
            var fecha = new Date(data.UFechaNac);
            var fechatxt = fecha.getDate() +"/" +(fecha.getMonth()) + "/" + fecha.getFullYear();
            $("#fechaNac").val({date: fechatxt});
            
            $("#direccion").val(data.UDireccion);
            $("#telCasa").val(data.UTelCasa);
            $("#telCel").val(data.UTelCel);
            
           var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#tablaUsuarios').paginate({ "+
                                            "paginationButtonsClass:'ui basic button .btn-primary',"+
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

function verificarEliminarUsuario(id) {
    $("#myModalVerificarEliminarUsuario").modal("show");
    document.getElementById("btnEliminarUsuario").onclick= function() {
        $("#myModalVerificarEliminarUsuario").modal("hide");
        eliminarUsuario(id);
    };  
}

function eliminarUsuario(id){
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'eliminarUsuarios',
            idUsuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("El usuario NO fue eliminado");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            consultarUsuarios();
        },
        type: 'POST',
        dataType: "text"
    });
}

function enviarUsuario() {
    if (validarUsuario()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'UsuariosServelt',
            data: {
                accion: $("#usuariosAction").val(),
                idUsuario: $("#ide").val(),
                tipo: $("#tipo").val(),
                usuario: $("#usuario").val(),
                contrasena: $("#contrasena").val(),
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                direccion: $("#direccion").val(),
                fechaNacimiento: $("#fechaNac").val(),
                correo: $("#correo").val(),
                telCasa: $("#telCasa").val(),
                telCel: $("#telCel").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                alert("Se generó un error");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!")
                    setTimeout($("#myModalFormulario3").modal("hide"), 5000);
                    setTimeout(consultarUsuarios, 3000);
                    
                    
                }else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    } else {
                        alert("Se generó un error");
                    }
                }
            },
            type: 'POST'
        });
    } else {
        alter("Digite la información correcta");
    }
}

 function validarUsuario() {
    var validacion = true;
    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupUsuario").removeClass("has-error");
    $("#groupContrasena").removeClass("has-error");
    $("#groupIde").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCorreo").removeClass("has-error");
    $("#groupFechaNac").removeClass("has-error");
    $("#groupTelCasa").removeClass("has-error");
    $("#groupTelCel").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if (!testInputData("telCel", numbersOnly) || $("#telCel").val().length > 8) {
        $("#groupTelCel").addClass("has-error");
        validacion = false;
    }
    
    if (!testInputData("telCasa", numbersOnly) || $("#telCasa").val().length > 8) {
        $("#groupTelCasa").addClass("has-error");
        validacion = false;
    }
    
    if (!testInputData("ide", numbersOnly) || $("#ide").val().length > 9) {
        $("#groupIde").addClass("has-error");
        validacion = false;
    }
   
    if ($("#nombre").val() === "" || $("#nombre").val().length > 15) {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    
    if ($("#direccion").val() === "" || $("#direccion").val().length > 45) {  //lastname
        $("#groupDireccion").addClass("has-error");
        validacion = false;
    }
    
    if ($("#apellidos").val() === "" || $("#apellidos").val().length > 25) {  //lastname
        $("#groupApellidos").addClass("has-error");
        validacion = false;
    }
    
    if ($("#usuario").val() === "" || $("#usuario").val().length > 15) {
        $("#groupUsuario").addClass("has-error");
        validacion = false;
    }
    
    if ($("#contrasena").val() === "" || $("#contrasena").val().length > 15) {
        $("#groupContrasena").addClass("has-error");
        validacion = false;
    }
    
    if ($("#correo").val() === "" || $("#correo").val().length > 25) {
        $("#groupCorreo").addClass("has-error");
        validacion = false;
    }
    
    return validacion;
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

 var numbersOnly = /^\d+$/;
 var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
 var uppercaseOnly = /^[A-Z]+$/;
 var lowercaseOnly = /^[a-z]+$/;
 var stringOnly = /^[A-Za-z0-9]+$/;