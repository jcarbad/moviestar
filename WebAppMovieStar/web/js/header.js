$(document).ready(function(){
   cargarCategorias(); 
   $("#buscadorBoton").click(function () {
       // buscarCatalogo();
       $(location).attr("href", "buscador.jsp?name="+$('#buscador').val());
    });
   $("#btnCar").click(function(){
       $(location).attr("href", "carrito.jsp");
   });
   
   $('#logout').click(function(){
       logout(); 
    });
    
    $('#contac').click(function(){
        $('#popupWindowBasic').click();
    });
});

function logout(){
    mostrarModal("myModal4", "Espere por favor..", "Cerrando la sesión");
    $.ajax({
            url: 'UsuariosServelt',
            data: {
                accion: "cerrarSession"
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
               // alert(data);
                $(location).attr("href", "index.jsp");
            },
            dataType: "text"
        });
}
function cargarCategorias(){
    $.ajax({
        url: 'CategoriasServlet',
        data: {
            accion: 'consultarCategorias'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las categorías en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarCategorias(data);
        },
        type: 'POST',
        dataType: "json"
    });
};

function dibujarCategorias(data){
    $('#pelisub').html("");
    $('#seriessub').html("");
    for (var i =0; i < data.length; i++){
        var nombre = data[i].CNombre;
        var tipo = nombre.substring(0, 2);
        var texto = "<li><a href=" + "catalogos.jsp?id="+ data[i].CId
                +">"+nombre.substring(2, data[i].length) +"</a></li>";
        if (tipo === "P~")
            $('#pelisub').append(texto);
        else if (tipo === "S~")
            $('#seriessub').append(texto);
    }
};