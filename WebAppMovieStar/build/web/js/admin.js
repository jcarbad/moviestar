$(document).ready(function(){
   $('#categoria').click(function(){
       $(location).attr("href", "http://localhost:8080/WebAppMovieStar/categoriasAdmin.jsp");
   });
   $('#catalogos').click(function(){
       $(location).attr("href", "http://localhost:8080/WebAppMovieStar/catalogosAdmin.jsp");
   });
   $('#usuarios').click(function(){
       $(location).attr("href", "http://localhost:8080/WebAppMovieStar/usuariosAdmin.jsp");
   });
});