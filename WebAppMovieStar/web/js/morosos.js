$(document).ready(function(){
    morosos();
});

function morosos(){
    $.ajax({
        url: 'UsuariosServelt',
        data: {
            accion: 'ordenMorosos'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error de morosos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            listaMorosos(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function listaMorosos(lista){
    $("#morosos").html("");
    var head= $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#morosos").append(head);
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>APELLIDOS</b></th>"));
    row.append($("<th><b>CORREO</b></th>"));
    for(var i= 0; i<lista.length; i++){
        hacerTablaMorosos(lista[i]);
    }
}

function hacerTablaMorosos(rowData){
    var row = $("<tr />");
    $("#morosos").append(row); 
    row.append($("<td>" + rowData.id + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellidos + "</td>"));
    row.append($("<td>" + rowData.correo + "</td>"));
}
