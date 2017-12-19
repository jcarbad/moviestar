<%-- 
    Document   : Login
    Created on : 23-may-2016, 19:01:20
    Author     : Mery Zúñiga
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/css.css">
        <link rel="stylesheet" type="text/css" href="css/font-awesome-4.5.0/css/font-awesome.min.css" />
        <link rel="shortcut icon" href="media/icon.ico">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/custom.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="js/login.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/demo.js"/></script>
        <title>Ingresar</title>
    </head>
    <body>
                  <button id="popupWindowBasic" class="btn btn-primary hidden">Window</button>  
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="myModalMessage">
                        <p>This is a small modal.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <nav class="navbar navbar-default"> 
         <a class="pull-left"> <img src="http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/logo_zpspvoqfv70.png" alt="logo"> </a>
        </nav>
            
        <div class="container">
            <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>Ingresar</h1>
                <br/>
                <form role="form" onsubmit="return false;" id="formLogin">
                    <div class="form-group" id="groupUsario">
                        <label for="usuario">Usuario:</label>
                        <input type="text" class="form-control" id="usuario" autofocus="true" placeholder="Usuario">
                    </div>

                    <div class="form-group" id="groupPassword">
                        <label for="nombre">Contraseña:</label>
                        <input type="password" class="form-control" id="contrasena" placeholder="Contraseña" >
                    </div>

                    <div class="form-group">
                        <input type="hidden" value="agregarPersona" id="personasAction"/>
                        <button type="submit" class="btn btn-primary" id="enviar">Ingresar</button>
                        <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                    </div>

                    <div class="form-group height25" >
                        <div class="alert alert-success hiddenDiv" id="mesajeResult">
                            <strong id="mesajeResultNeg">Info!</strong> 
                            <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                        </div>
                    </div>
                    </br></br>
                    </br></br>
                    <div class="modal-footer">
                        ¿Eres nuevo en MovieStar?
                        <a href="registro.jsp" class="btn btn-primary">Regístrate</a>
                    </div>
                </form>
             </div>
          </div>
        </div>
        
    </body>
</html>
