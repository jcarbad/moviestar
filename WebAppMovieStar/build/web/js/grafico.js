/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    gráficoUno();
    gráficoDos();
    listaUno();
    $('#atras').click(function(){
      $('.moroso').modal('hide');
   });
   $('#atras2').click(function(){
      $('.devolver').modal('hide');
   });
});

function gráficoUno(){
    $.ajax({
        url: 'OrdenesServlet',
        data: {
            accion: 'consultarOrdenes'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            ordenesPorMes(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function gráficoDos(){
    $.ajax({
        url: 'DetallesServlet',
        data: {
            accion: 'consultarDetalles'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            ingresosPorAnno(data);
        },
        type: 'POST',
        dataType: "json"
    });
}


function listaUno(){
    $.ajax({
        url: 'DetallesServlet',
        data: {
            accion: 'consultarDetalles'
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error de detalles");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            pendientesDevolucion(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function pendientesDevolucion(data){
    var lista = new Array();
    for (var i = 0; i < data.length; i++) {  
        if(data[i].tipo === 'alquiler'){
            var fechaActual = new Date();
            var fecha= String(data[i].fechaL);
            var dia= fecha.substring(8,11);
            var d= parseInt(dia);
            var diaActual = fechaActual.getDate();
            if(d < diaActual){      //Si el día de entrega es menor al día actual, entonces es un pendiente
                lista.push(data[i]); //Hago una lista de los pendientes y la mando para que cada uno de esos pueda ser agregado
            }
        }
    }
    pendientes(lista);
}

function pendientes(lista){
    $("#table_div").html("");
    var head= $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#table_div").append(head);
    row.append($("<th><b>Nombre articulo</b></th>"));
    row.append($("<th><b>Fecha de devolución</b></th>"));
    
    for(var i= 0; i<lista.length; i++){
        var row = $("<tr />");
        var id= lista[i].catalogo;
        var fecha= lista[i].fechaL;
        hacerTablaUno(id, fecha, row);
        $("#table_div").append(row);
    }
}

function hacerTablaUno(id, fecha, row){
    $.ajax({
        url: 'CatalogosServlet',
        data: {
            accion: "consultarCatalogosPorId",
            idCatalogo: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Error de catalogos");
        },
        success: function (rowData) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            row.append($("<td>" + rowData.CNombre + "</td>"));
            row.append($("<td>" + fecha + "</td>"));
        },
        type: 'POST',
        dataType: "json"
    }); 
}





function ordenesPorMes(data){
    var enero =0, febrero= 0, marzo = 0, abril= 0, mayo= 0, junio= 0, julio= 0, agosto= 0, septiembre= 0, octubre= 0, noviembre= 0, diciembre = 0;
    for (var i = 0; i < data.length; i++) {
        var fecha= String(data[i].fecha);
        var mes= fecha.substring(5,7);
        if(mes=== '01')
            enero+= 1;
        if(mes=== '02')
            febrero+= 1;
        if(mes=== '03')
            marzo+= 1;
        if(mes=== '04')
            abril+= 1;
        if(mes=== '05')
            mayo+= 1;
        if(mes=== '06')
            junio+= 1;
        if(mes=== '07')
            julio+= 1;
        if(mes=== '08')
            agosto+= 1;
        if(mes=== '09')
            septiembre+= 1;
        if(mes=== '10')
            octubre+= 1;
        if(mes=== '11')
            noviembre+= 1;
        if(mes=== '12')
             diciembre+= 1;
    }
    crearGraficoUno(enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre);
}

function ingresosPorAnno(data){
    var ingresosVentas=0, ingresosAlquileres=0;
    for (var i = 0; i < data.length; i++) {
        if(data[i].tipo === 'compra'){
            ingresosVentas+= data[i].precio; 
        }
        else if(data[i].tipo === 'alquiler'){
            ingresosAlquileres+= data[i].precio;
        }     
    }
    crearGraficoDos(ingresosVentas, ingresosAlquileres);
}

//FusionCharts.ready(function () {
function crearGraficoUno(en, fe, ma, ab, my, jn, jl, ag, se, oc, no, di){
    var revenueChart = new FusionCharts({
        type: 'column3d',
        renderAt: 'chart-container',
        width: '600',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Cantidad de órdenes realizadas por mes",
                "xAxisName": "Meses",
                "yAxisName": "Cantidad",
                "paletteColors": "#0075c2",
                "valueFontColor": "#ffffff",
                "baseFont": "Helvetica Neue,Arial",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "placeValuesInside": "1",
                "rotateValues": "1",
                "showShadow": "0",
                "divlineColor": "#999999",               
                "divLineIsDashed": "1",
                "divlineThickness": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "canvasBgColor": "#ffffff"
            },

            "data": [
                {
                    "label": "Enero",
                    "value": en
                },
                {
                    "label": "Febrero",
                    "value": fe
                },
                {
                    "label": "Marzo",
                    "value": ma
                },
                {
                    "label": "Abril",
                    "value": ab
                },
                {
                    "label": "Mayo",
                    "value": my
                },
                {
                    "label": "Junio",
                    "value": jn
                },
                {
                    "label": "Julio",
                    "value": jl
                },
                {
                    "label": "Agosto",
                    "value": ag
                },
                {
                    "label": "Septiembre",
                    "value": se
                },
                {
                    "label": "Octubre",
                    "value": oc
                },
                {
                    "label": "Noviembre",
                    "value": no
                },
                {
                    "label": "Diciembre",
                    "value": di
                }
            ]
        }
    });
    revenueChart.render();
}


function crearGraficoDos(ven, alq){
    var salesChart = new FusionCharts({
        type: 'mscolumn3d',
        renderAt: 'chart-container2', //El id se cambió
        width: '600',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Cantidad de ingresos anual",
                "subCaption": "Distribución de ventas y alquileres",
                "yAxisName": "Ingresos (En USD)",
                "numberPrefix": "$",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500",
                "bgColor": "#ffffff",                
                "showBorder": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "legendBorderAlpha": "0",
                "legendBgAlpha": "0",
                "legendShadow": "0",
                "showHoverEffect" : "1",
                "valueFontColor": "#ffffff",
                "rotateValues": "1",
                "placeValuesInside": "1",
                "divlineColor": "#999999",
                "divLineIsDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "canvasBgColor": "#ffffff",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0"
            },
            "categories": [
                {
                    "category": [
                        {
                            "label": "Año 2016"
                        }
                        
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Venta",
                    "data": [
                        {
                            "value": ven //10000
                        }
                    ]
                },
                {
                    "seriesname": "Alquiler",
                    "data": [
                        {
                            "value": alq //25400
                        }
                    ]
                }
            ]
        }
    })
    .render();
}

