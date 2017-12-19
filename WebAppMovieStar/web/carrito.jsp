<%-- 
    Document   : carrito
    Created on : 21/05/2016, 03:55:21 PM
    Author     : Byron
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Carrito</title>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom.css">
        <script src="js/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>        <script type="text/javascript" src="js/carrito.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/header.js"/></script>
        <script src="js/demo.js"/></script>
    </head>
    <body>
        
        <%@ include file="Fragmentos/header.jspf" %>
        

            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>
        <div class="modal fade" id="myModalVerificarEliminar" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Confirmacion de borrado
                    </div>
                        
                    
                    <div class="modal-body" id="myModalMessage">
                       <p>Desea eliminar el elemento seleccionado, si confirma la acción no podrá ser recuperada.</p>
                       <p>¿Desea confirmar la eliminacion?</p>
                            <div class="form-group modal-footer">
                                <button type="reset" class="btn btn-default" id="btnEliminarCancelar">Cancelar</button>
                                <button type="submit" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container2" id="carro">
            <table id="cart" class="table table-hover table-condensed">
                <!--
                <tfoot>
                    <tr class="visible-xs">
                            <td class="text-center"><strong>Total 1.99</strong></td>
                    </tr>
                    <tr>
                            <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                            <td colspan="2" class="hidden-xs"></td>
                            <td class="hidden-xs text-center"><strong>Total $1.99</strong></td>
                            <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
                    </tr>
                </tfoot>
                -->
            </table>
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
