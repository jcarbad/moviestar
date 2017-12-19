<%-- 
    Document   : catalogos
    Created on : 14/05/2016, 09:11:39 PM
    Author     : Byron
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom.css">
        <link rel="stylesheet" href="css/creative.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/carrito.js"></script>
        <script src="js/header.js"/></script>
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
        <%
            out.println("<input id="+ "idPar" +" type=" + "hidden" +" name="+"id"+" value="+ request.getParameter("id") +"/>");
       
        %>
        
        <button id="basicError" class="btn btn-danger hidden">Error</button>
        <button id="basicSuccessCustomDelay" class="btn btn-success hidden">Success</button>
        <div class="no-padding" id="portfolio">
            <div class="container-fluid">
                <div class="row no-gutter" id="show">
                    
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
        <script src="js/show.js"/></script>
    </body>
</html>
