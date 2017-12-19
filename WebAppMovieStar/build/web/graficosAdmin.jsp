<%-- 
    Document   : graficosAdmin
    Created on : 15-jun-2016, 22:17:12
    Author     : Mery Zúñiga
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Reportes</title>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/semantic.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/catalogos.js"/></script>
        <script src="js/usuariosAdmin.js"/></script>
        <script src="js/header.js"/></script>
        <script src="js/grafico.js"/></script>
        <script src="js/jquery.paginemytable.js"></script>
        <script src="js/utils.js"/></script>
        <script src="js/lobibox.js"/></script>
        <script src="js/demo.js"/></script>
        <script src="js/notifications.js.js"/></script>
        <script src="js/notifications.min.js.js"/></script>
        <link rel="stylesheet" href="css/lobibox.min.css"/>
        <script src="js/fusioncharts.js"></script>
        <script src="js/fusioncharts.charts.js"></script>
        <script src="js/morosos.js"></script>
        <script src="js/grafico.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />    </head>
    <body>
        <%@ include file="Fragmentos/header.jspf" %>
            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>
        <div class="container text-justify">
            <button type="button" data-toggle='modal' data-target='.mes' class=" btn-info glyphicon glyphicon-credit-card btn-lg" id="user"><br>Ordenes realizadas por mes</button>
            <button type="button" data-toggle='modal' data-target='.anual' class=" btn-info glyphicon glyphicon-usd btn-lg" id="user"><br>Ingresoos anuales</button>
            <button type="button" data-toggle='modal' data-target='.devolver' class=" btn-info glyphicon glyphicon-film btn-lg" id="user"><br>Catalogos por devolver</button>
            <button type="button" data-toggle='modal' data-target='.moroso' class=" btn-info glyphicon glyphicon-user btn-lg" id="user"><br>Lista de morosos</button>
        </div>
        
        <div class="modal fade bd-example-modal-lg mes" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div id='detalle' class="modal-content container">
                    <table class="table-condensed container3" border="4">
                        <tr>
                            <td><div id="chart-container" id="grafico1" class="text center"></div></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg anual" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div id='detalle' class="modal-content container">
                    <table class="table-condensed container3" border="4">
                        <tr>
                            <td><div id="chart-container2"></div></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg devolver" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div id='detalle' class="modal-content container">
                    <h4 class="modal-title" id="myModal2Title">Lista de catálogos que faltan por devolver</h4>
                    <table id="table_div" class="table table-hover table-condensed data-table ui container2"></table>
                    <button type="button"  class="btn btn-danger modal-title" id="atras2">Atrás</button>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg moroso" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg ">
                <div id='detalle' class="modal-content container">
                    <h4 class="modal-title" id="myModal2Title">Lista de clientes morosos</h4>
                    <table id="morosos" class="table table-hover table-condensed data-table ui container2"></table>
                    <button type="button"  class="btn btn-danger modal-title" id="atras">Atrás</button>
                </div>
            </div>
        </div>
            <footer>
            <div id="footer" class="container well">
                <div>
                    <div class="row">
                        <h3 class="footertext">Sobre Nosotros:</h3>
                        <br>
                        <div class="col-md-4">
                            <i class="fa fa-university bigicon fa-3x"></i>
                            <br>
                            <h4 class="footertext">MovieStar</h4>
                            <p class="footertext">MovieStar nace como parte del proyecto de Programación IV de la Universidad Nacional de Costa Rica.<br>
                          </div>
                        <div class="col-md-4">
                            <i class="fa fa-eye bigicon fa-3x"></i>
                            <br>
                            <h4 class="footertext">Objetivo</h4>
                            <p class="footertext">El objetivo de nuestro proyecto es simular un comercio dedicado al alquiler/venta de peliculas y/o series.<br>
                          </div>
                          <div class="col-md-4">
                                <i class="fa fa-code bigicon fa-3x"></i>
                                <h4 class="footertext">Programadores</h4>
                                <p class="footertext"><i class="fa fa-female bigicon fa-2x"></i> Meribeth Zúñiga Zúñiga.<br>
                                <p class="footertext"><i class="fa fa-male bigicon fa-2x"></i> Bayron Picado Obando.<br>
                          </div>
                        </div>
                    <div class="row">
                        <p class="footertext">Copyright 2016</p>
                    </div>
                </div>
            </div>
        </footer>
        <script src="js/header.js"/> </script>
    </body>
</html>