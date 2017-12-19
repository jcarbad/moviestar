$(document).ready(function(){
   $('#agregarUsuario').click(function(){
      guardar(); 
   });
   $('#cancelarUsu').click(function(){
      $('.pedidos').modal('hide');
   });
   $('#user').click(function(){
      load(); 
   });
   $('#pedidos').click(function(){
      load2(); 
   });
});


function load2() {
    var i =  $('#idUser').val();
    $.ajax({
        url: 'OrdenesServlet',
        data: {
            accion: 'consultarOrdenesPorPersona',
            id: i
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los catalogos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaOrdenes(data);
            var script = document.createElement('script');
                script.innerHTML = "$(document).ready(function() { "+
                                    "$('#ordenes').paginate({ "+
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
    $("#ordenes").html(""); 
    
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#ordenes").append(head); 
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>FECHA</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaOrdenes(dataJson[i]);
    }
    $("#ordenes").append("<tfoot></tfoot>");
}

function dibujarFilaOrdenes(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un usuario
    
    var row = $("<tr />");
    $("#ordenes").append(row); 
    row.append($("<td>" + rowData.id + "</td>"));
    row.append($("<td>" + rowData.fecha + "</td>"));
    row.append($("<td><button id='boton"+rowData.id+"' data-toggle='modal' data-target='.detalles' onclick='consultarDetalles("+rowData.id+");' type='button' class='btn btn-default ' aria-label='Left Align' onclick='modificarOrden('"+rowData.id+"');>"+
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
    row.append($("<td>" + rowData.estado + "</td>"));
}


function guardar() {
    var x = $('#typeUser').val();
    var y = "";
    if (x === "c")
        y = "Cliente";
    else 
        y = "Administrador";
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'modificarUsuario',
            idUsuario: $("#id").val(),
            tipo: y,
            usuario: $("#usua").val(),
            contrasena: $("#pass").val(),
            nombre: $("#fname").val(),
            apellidos: $("#lname").val(),
            direccion: $("#direc").val(),
            fechaNacimiento: $("#cumple").val(),
            correo: $("#email2").val(),
            telCasa: $("#phone").val(),
            telCel: $("#cellphone").val()
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se modificó correctamente.. Te la creiste we");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            alert(data);
        },
        type: 'POST',
        dataType: "json"
    });
}
function load() {
    var xx = $('#idUser').val();
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'consultarUsuariosById',
            idUsuario: xx
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presentó un error de la concha de la lora");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            $("#id").val(data.id);
            $("#fname").val(data.nombre);
            $("#lname").val(data.apellidos);
            $("#usua").val(data.user);
            $("#pass").val(data.contrasena);
            $("#email2").val(data.correo);
            $("#cumple").val(data.cumple);
            $("#direc").val(data.direccion);
            $("#phone").val(data.telCasa);
            $("#cellphone").val(data.telCel);
        },
        type: 'POST',
        dataType: "json"
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

