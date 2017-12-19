<%-- 
    Document   : usuariosAdmin
    Created on : 08-may-2016, 0:34:55
    Author     : Mery Zúñiga
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Gestión de Usuarios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/semantic.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/usuarios.js"></script>
        <link rel="shortcut icon" href="media/icon.ico">
        <script src="js/header.js"/></script>
    <script src="js/jquery.paginemytable.js"></script>
    <script src="js/utils.js"></script>
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
</head>
<body>
    <%@ include file="Fragmentos/header.jspf" %>
            <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>

    <div class="modal fade" id="myModal2" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="myModal2Title">Modal Header</h4>
                </div>
                <div class="modal-body" id="myModal2Message">
                    <p>This is a small modal.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="myModalVerificarEliminarUsuario" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="myModalTitle">Confirmacion de borrado
                </div>


                <div class="modal-body" id="myModalMessage">
                    <p>Desea eliminar el cliente, si confirma la acción no podrá ser recuperado.</p>
                    <p>¿Desea confirmar la eliminacion?<span id="getPersona"></span></p>
                    <div class="form-group modal-footer">
                        <button type="reset" class="btn btn-default" id="btnEliminarCancelarUsuario">Cancelar</button>
                        <button type="submit" class="btn btn-danger" id="btnEliminarUsuario">Eliminar</button>

                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="modal fade" id="myModalFormulario3" role="dialog" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Usuarios</h4>
                </div>
                <div class="modal-body" id="myModalMessage3">
                    <form role="form" onsubmit="return false;" id="formUsuarios">
                        <div class="form-group" id="groupTipoUsuario">
                            <label for="tipoUsuario">Tipo de usuario:</label>
                            <select id="tipo" name="tipoUsuario" class="form-control">
                                <option value="usuarioCliente">Usuario cliente</option>
                                <option value="usuarioAdmin">Usuario Administrador</option>
                            </select>
                        </div>
                        <div class="form-group" id="groupIde">
                            <label for="id">Identificación:</label>
                            <input type="number" class="form-control" id="ide" placeholder="Numero de indentificación" >
                        </div>
                        <div class="form-group" id="groupUsuario">
                            <label for="usuario">Usuario:</label>
                            <input type="text" class="form-control" id="usuario" placeholder="Usuario" >
                        </div>
                        <div class="form-group" id="groupContrasena">
                            <label for="pass">Contraseña:</label>
                            <input type="password" class="form-control" id="contrasena">
                        </div>
                        <div class="form-group" id="groupNombre">
                            <label for="nombre">Nombre:</label>
                            <input type="text" class="form-control" id="nombre">
                            <div class="form-group" id="groupApellidos">
                                <label for="apellidos">Apellidos:</label>
                                <input type="text" class="form-control" id="apellidos">
                            </div>
                            <div class="form-group" id="groupCorreo">
                                <label for="correo">Correo:</label>
                                <input type="text" class="form-control" id="correo">
                            </div>
                            <div class="form-group" id="groupFechaNac">
                                <label for="fechaNac">Fecha de nacimiento:</label>
                                <input type="date" name="bday" class="form-control" id="fechaNac" >
                            </div>
                            <div class="form-group" id="groupDireccion">
                                <label for="direccion">Dirección:</label>
                                <input type="text" class="form-control" id="direccion">
                            </div>
                            <div class="form-group" id="groupTelCasa">
                                <label for="telCasa">Teléfono de casa:</label>
                                <input type="text" class="form-control" id="telCasa">
                            </div>
                            <div class="form-group" id="groupTelCel">
                                <label for="telCel">Teléfono celular:</label>
                                <input type="text" class="form-control" id="telCel">
                            </div>
                            <div class="form-group">
                                <input type="hidden" value="agregarUsuario" id="usuariosAction"/>
                                <button type="button" class="btn btn-primary" id="enviarUsuarios">Guardar</button>
                                <button type="reset" class="btn btn-danger" id="cancelarUsuarios">Cancelar</button>
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
</div>
<div>
    <h2>Gestión de Usuarios</h2>
    <br/>
    <center>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalFormulario3" id="btMostarForm2">Insertar Usuario</button>
    </center>
    <div>
    </div>
    <table border="2" class="table table-hover table-condensed data-table ui" id="tablaUsuarios"></table>
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
