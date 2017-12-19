$(document).ready(function() {
    
    $("#login").click(function() {
       login(); 
    });
    $("#cancelarUsuarios").click(function () {
      $("#myModalFormulario3").modal("hide");
        
    });
    $("#agregarUsuario").click(function() {
        enviar(); 
    });

});


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
 
 function enviar() {
    if (validar()) {
        //Se envia la información por ajax
         $.ajax({
            
            url: 'UsuariosServelt',
            data: {
                accion: 'agregar',
                usuario: $("#user").val(),
                contrasena: $("#pass").val(),
                idUsuario: $("#id").val(),
                nombre: $("#fname").val(),
                apellidos: $("#lname").val(),
                direccion: $("#direc").val(),
                fechaNacimiento: $("#cumple").val(),
                correo: $("#email2").val(),
                telCasa: $("#phone").val(),
                telCel: $("#cellphone").val(),
                tipo: "usuarioCliente"
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "El nombre de usuario o correo electrónico ya se encuentra registrado", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                ingresar(data);   
                
            },
            type: 'POST',
            dataType: 'json'
        });
    } else {
        alert("el usuario NO se ingreso correctamente");
    }
   
}

function ingresar(data) {
    //Se envia la información por ajax
        $.ajax({
            url: 'UsuariosServelt',
            data: {
                accion: "login",
                data: data,
                usuario: data.user,
                contrasena: data.contrasena,
                nombre: data.nombre
            },
            error: function () { //si existe un error en la respuesta del ajax
               // mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
               // var respuestaTxt = data.substring(2);
               // var tipoRespuesta = data.substring(0, 2);
                //if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success","Accesando a la página principal...", "Ingreso Correcto!");
                    //alert("Ingreso Correcto,  ");
                   // $("#myModalFormulario").modal("hide");
                    
                    //se redirecciona en JavaScript
                    setTimeout(function(){
                        window.location="index.jsp";
                    }, 2000);
                    
                //} else {
                    //if (tipoRespuesta === "E~") {
                       // mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                       //alert("Error");
                    //} else {
                        //mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    
                

            },
            dataType: "text",
            type: 'POST'
        });
    
}

function validar() {
    var validacion = true;
    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupUser").removeClass("has-error");
    $("#groupPass").removeClass("has-error");
    $("#groupId").removeClass("has-error");
    $("#groupName").removeClass("has-error");
    $("#groupLName").removeClass("has-error");
    $("#groupEmail2").removeClass("has-error");
    $("#groupCumple").removeClass("has-error");
    $("#groupPhone").removeClass("has-error");
    $("#groupCellPhone").removeClass("has-error");
    $("#groupDirec").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if (!testInputData("cellphone", numbersOnly) || $("#cellphone").val().length > 8) {
        $("#groupCellPhone").addClass("has-error");
        validacion = false;
    }
    
    if (!testInputData("phone", numbersOnly) || $("#phone").val().length > 8) {
        $("#groupPhone").addClass("has-error");
        validacion = false;
    }
    
    if (!testInputData("id", numbersOnly) || $("#id").val().length > 9) {
        $("#groupId").addClass("has-error");
        validacion = false;
    }
   
    if ($("#fname").val() === "" || $("#fname").val().length > 15) {
        $("#groupName").addClass("has-error");
        validacion = false;
    }
    
    if ($("#direc").val() === "" || $("#direc").val().length > 50) {  //lastname
        $("#groupDirec").addClass("has-error");
        validacion = false;
    }
    
    if ($("#lname").val() === "" || $("#lname").val().length > 25) {  //lastname
        $("#groupLName").addClass("has-error");
        validacion = false;
    }
    
    if ($("#user").val() === "" || $("#user").val().length > 15) {
        $("#groupUser").addClass("has-error");
        validacion = false;
    }
    
    if ($("#pass").val() === "" || $("#pass").val().length > 15) {
        $("#groupPass").addClass("has-error");
        validacion = false;
    }
    
    if ($("#email2").val() === "" || $("#email2").val().length > 25) {
        $("#groupEmail2").addClass("has-error");
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

 var numbersOnly = /^\d+$/;
 var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
 var uppercaseOnly = /^[A-Z]+$/;
 var lowercaseOnly = /^[a-z]+$/;
 var stringOnly = /^[A-Za-z0-9]+$/;
