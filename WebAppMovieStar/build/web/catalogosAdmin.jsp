
<%-- 
    Document   : catalogosAdmin
    Created on : 14/05/2016, 12:20:59 AM
    Author     : Byron
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión de Catálogos</title>
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
        <script src="js/jquery.paginemytable.js"></script>
        <script src="js/utils.js"/></script>
        <script src="js/lobibox.js"/></script>
        <script src="js/demo.js"/></script>
        <script src="js/notifications.js.js"/></script>
        <script src="js/notifications.min.js.js"/></script>
        <link rel="stylesheet" href="css/lobibox.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
    </head>
    <body>
            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>
        <%@ include file="Fragmentos/header.jspf" %>
        
        <button id="basicInfo" class="btn btn-info hidden">Info</button>
        <button id="basicWarningAnimation" class="btn btn-warning hidden">Warning</button>
        <button id="basicError" class="btn btn-danger hidden">Error</button>
        <button id="basicSuccessPosition" class="btn btn-success hidden">Success</button>
        
        <div class="modal fade" id="myModal0" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModal0Title">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="myModal0Message">
                        <p>This is a small modal.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="myModalVerificarEliminarCatalogo" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Confirmacion de borrado
                    </div>
                        
                    
                    <div class="modal-body" id="myModalMessage">
                       <p>Desea eliminar el catalogo, si confirma la acción no podrá ser recuperada.</p>
                       <p>¿Desea confirmar la eliminacion?</p>
                            <div class="form-group modal-footer">
                                <button type="reset" class="btn btn-default" id="btnEliminarCancelarCatalogo">Cancelar</button>
                                <button type="submit" class="btn btn-danger" id="btnEliminarCatalogo">Eliminar</button>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="modal fade" id="myModalFormulario2" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Catalogos
                    </div>
                    <div class="modal-body" id="myModalMessage2">
                        <form role="form" onsubmit="return false;" id="formCatalogos">
                            <div class="form-group" id="groupTipo">
                                <label for="tipo">Tipo:</label>
                                <select id="tipo" name="tipo" class="form-control" >
                                    <option value="pelicula">Pelicula</option>
                                    <option value="serie">Serie</option>
                                </select>
                            </div>
                            <div class="form-group" id="groupNombre">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombreCatalogo" placeholder="Nombre" >
                            </div>
                            <div class="form-group" id="groupDirector">
                                <label for="director">Director:</label>
                                <input type="text" class="form-control" id="nombreDirector" placeholder="Director" >
                            </div>
                            <div class="form-group" id="groupActorPrincipal">
                                <label for="actorPrincipal">Actor principal:</label>
                                <input type="text" class="form-control" id="actorPrincipal" placeholder="Actor principal" >
                            </div>
                            <div class="form-group" id="groupCategoria">
                                <label for="tipo">Categoria:</label>
                                <select id="categoria" name="tipo" class="form-control">
                                </select>
                            </div>
                            <div class="form-group" id="groupCantidad">
                                <label for="cantidad">Cantidad existente:</label>
                                <input type="text" class="form-control" id="cantidadE" placeholder="Catidad" >
                            </div>
                            <div class="form-group" id="groupPrecioAlquiler">
                                <label for="precioAlquiler">Precio alquiler:</label>
                                <input type="text" class="form-control" id="precioAlquiler" placeholder="Digite el precio en colones">
                            </div>
                            <div class="form-group" id="groupPrecioVenta">
                                <label for="precioVenta">Precio venta:</label>
                                <input type="text" class="form-control" id="precioVenta" placeholder="Digite el precio en colones">
                            </div>
                            <div class="form-group" id="groupUrl">
                                <label for="urlImagen">URL de la imagen:</label>
                                <input type="text" class="form-control" id="urlImagen" placeholder="Introduzca el url de la imagen">
                            </div>
                            <div class="form-group" id="groupDescrip">
                                <label for="descripcion">Descripción:</label> 
                                <textarea class="form-control" id="descrip" placeholder="Información del catálogo"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="hidden" value="agregarCatalogo" id="catalogosAction"/>
                                <button type="button" class="btn btn-primary" id="enviarCatalogos">Guardar</button>
                                <button type="reset" class="btn btn-danger" id="cancelarCatalogos">Cancelar</button>
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
        </div>
        <div>
        <h2>Gestión de Catálogos</h2>
           <br/>
            <center>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalFormulario2" id="btMostarForm0">Insertar Catálogo</button>
            </center>
            <table border="2" class="table table-hover table-condensed data-table ui" id="tablaCatalogos"></table>
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
