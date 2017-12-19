<%-- 
    Document   : userSettings
    Created on : 16/06/2016, 09:10:01 PM
    Author     : Irving Picado Obando
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Perfil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="css/semantic.min.css">
        <script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
        <script src="js/jquery.paginemytable.js"></script>
        <script src="js/userSettings.js"></script> 
        <link rel="stylesheet" href="css/custom.css">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/header.js"/></script>
    </head>
  
   
    <body>
            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>
        <%@ include file="Fragmentos/header.jspf" %>
        <div class="container2 text-center">
            <button type="button" data-toggle='modal' data-target='.pedidos' class=" btn-info glyphicon glyphicon-user btn-lg" id="user"><br>Modificar mis datos</button>
            <button type="button"  class=" btn-info glyphicon glyphicon-send btn-lg" id="pedidos"><br>Ver mi lista de pedidos</button>
        </div>
        
        <div class="modal fade bd-example-modal-lg pedidos" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div id='usuarioChange' class="modal-content container2">
                <form class="form-horizontal" id="formPersonas">
                    <div class="form-group" id="groupId" >
                        <label for="id">Identificación:</label>
                        <input type="number" class="form-control" id="id" disabled="disabled">
                    </div>
                    <div class="form-group" id="groupUser">
                        <label for="usuario">Usuario:</label>
                        <input type="text" class="form-control" id="usua" disabled="disabled">
                    </div>
                    <div class="form-group" id="groupPass">
                        <label for="pass">Contraseña:</label>
                        <input type="password" class="form-control" id="pass">
                    </div>
                    <div class="form-group" id="groupName">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="fname">
                    </div>
                    <div class="form-group" id="groupLName">
                        <label for="apellidos">Apellidos:</label>
                        <input type="text" class="form-control" id="lname">
                    </div>
                    <div class="form-group" id="groupEmail2">
                        <label for="correo">Correo:</label>
                        <input type="text" class="form-control" id="email2" disabled="disabled">
                    </div>
                    <div class="form-group" id="groupCumple">
                        <label for="fechaNac">Fecha de nacimiento:</label>
                        <input type="date" name="bday" class="form-control" id="cumple" >
                    </div>
                    <div class="form-group" id="groupDirec">
                        <label for="direccion">Dirección:</label>
                        <input type="text" class="form-control" id="direc">
                    </div>
                    <div class="form-group" id="groupPhone">
                        <label for="telCasa">Teléfono de casa:</label>
                        <input type="text" class="form-control" id="phone">
                    </div>
                    <div class="form-group" id="groupCellPhone">
                        <label for="telCel">Teléfono celular:</label>
                        <input type="text" class="form-control" id="cellphone">
                    </div>
                    <div class="form-group">
                        <input type="hidden" value="agregarUsuario" id="usuariosAction"/>
                        <button type="button" class="btn btn-primary" id="agregarUsuario">Guardar</button>
                        <button type="button"  class="btn btn-danger" id="cancelarUsu">Cancelar</button>
                    </div>
                    <div class="form-group height25" >
                        <div class="alert alert-success hiddenDiv" id="mesajeResult">
                            <strong id="mesajeResultNeg">Info!</strong> 
                            <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                        </div>
                    </div>
                 </form>
            </div>
        </div>
        </div>
            <table border="2" class="table table-hover table-condensed data-table ui" id="ordenes"></table>
            <div class="modal fade bd-example-modal-lg detalles" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div id='detalle' class="modal-content">
                        <h4 class="modal-title" id="myModal2Title">Detalles de la orden</h4>
                      <table border="2" class="table table-hover table-condensed data-table ui" id="tablaDetalles"></table>
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
        <script src="js/session.js"/></script>
    </body>
</html>

