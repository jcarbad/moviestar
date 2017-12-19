<%-- 
    Document   : categoriasAdmin
    Created on : 14/05/2016, 12:20:40 AM
    Author     : Byron
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión de Categorías</title>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/semantic.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/categorias.js"/></script>
        <script src="js/header.js"/></script>
        <script src="js/jquery.paginemytable.js"></script>
        <script src="js/utils.js"/></script>
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
    </head>
    <body>
        <%@ include file="Fragmentos/header.jspf" %>
            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>
        <div class="modal fade" id="myModal1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModal1Title">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="myModal1Message">
                        <p>This is a small modal.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="myModalVerificarEliminarCategoria" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Confirmacion de borrado
                    </div>
                        
                    
                    <div class="modal-body" id="myModalMessage">
                       <p>Desea eliminar la categoría, si confirma la acción no podrá ser recuperada.</p>
                       <p>¿Desea confirmar la eliminacion?<span id="getPersona"></span></p>
                            <div class="form-group modal-footer">
                                <button type="reset" class="btn btn-default" id="btnEliminarCancelarCategoria">Cancelar</button>
                                <button type="submit" class="btn btn-danger" id="btnEliminarCategoria">Eliminar</button>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="modal fade" id="myModalFormulario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Categorias
                    </div>
                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formCategorias">
                            <div class="form-group" id="groupNombreCategoria">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombreCategoria" placeholder="Nombre" >
                            </div>
                            <div class="form-group">
                                <label for="observaciones">Observaciones:</label>
                                <textarea class="form-control" maxlength="400" rows="3" id="observaciones"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="hidden" value="agregarCategoria" id="categoriasAction"/>
                                <button type="button" class="btn btn-primary" id="enviarCategoria">Guardar</button>
                                <button type="reset" class="btn btn-danger" id="cancelarCategorias">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        <div>
        <h2>Gestión de Categorias</h2>
            <br/>
            <center>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalFormulario" id="btMostarForm1">Insertar Categoría</button>
            </center>
            <div>
            </div>
            <table border="2" class="table table-hover table-condensed data-table ui" id="tablaCategorias"></table>
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
