 $(document).ready(function() {
    mostrarSlider();
    
});

 $(document).ready(function() {
    $('.carousel').carousel({
      interval: 6000
    });
  });
  function dibujarSlider(data){
    $("#ajSlider").html("");
    for (var i =0; i < data.length; i++) {
        $("#ajSlider").append("<img src= "+""+ data[i].url +""+ "></img>");
    }
    for (var i =0; i < data.length; i++) {
        $("#ajSlider").append("<a></a>");
    }
    $('#ajSlider').ajSlider(3000,{
		"width":"100%",//width of slider
		"height":"475px",//height of slider
		"textPosition":"30%",//position of text from top
		"textSize":"60px",//font size of the text
                "position": "center",
                "margin-top": "0%"
		});
}
  
 function show(id){
    document.getElementById(id).style.display = "block";
};


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

 
 function add(id, nombre, alq, com, tipo){
    var val = $('#sesion').val();
    var val2 = $('#typeUser').val();  //si el tipo de usuario es cliente entonces si me permite guardar
    if (val === "t"){
        if (val2 === "c"){
           $.ajax({
                url: 'CarritoServlet',
                data: {
                    accion: 'add',
                    id: id,
                    nombre: decodeURIComponent(nombre),
                    precioAlq: alq,
                    precioCom: com
                },
                error: function () { //si existe un error en la respuesta del ajax
                    alert("Se presento un error a la hora de añadir al carrito");
                },
                success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                    var respuestaTxt = data.substring(0);
                    var tipoRespuesta = data.substring(0, 2);
//                    mostrarModal("myModal4", "Proceso Éxitoso!!",respuestaTxt);
//                    setTimeout($("#myModal4").modal("hide")
//                    , 5000); 
                    $('#miniSuccessRounded').click();
                    
                },
                type: 'POST'
            }); 
        }
        else
            alert("Usted no es un cliente...");
    }
    else {
        alert("Primero debe de iniciar sesion");
    }
}
 
 var numbersOnly = /^\d+$/;
 var numbersOnly = /^\d+$/;
 var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
 var uppercaseOnly = /^[A-Z]+$/;
 var lowercaseOnly = /^[a-z]+$/;
 var stringOnly = /^[A-Za-z0-9]+$/;
function mostrarSlider() {
    $.ajax({
        url: 'MediaServlet',
        data: {
            accion: "slider"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las imagenes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarSlider(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
        },
        type: 'POST',
        dataType: "json"
    });
}
