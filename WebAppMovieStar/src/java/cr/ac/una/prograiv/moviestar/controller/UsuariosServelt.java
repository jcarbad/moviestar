/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.moviestar.bl.DetallesBL;
import cr.ac.una.prograiv.moviestar.bl.OrdenesBL;
import cr.ac.una.prograiv.moviestar.bl.UsuariosBL;
import cr.ac.una.prograiv.moviestar.domain.Detalles;
import cr.ac.una.prograiv.moviestar.domain.Ordenes;
import cr.ac.una.prograiv.moviestar.domain.OrdenesAdapter;
import cr.ac.una.prograiv.moviestar.domain.Usuarios;
import cr.ac.una.prograiv.moviestar.domain.UsuariosAdapter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author byron
 */
public class UsuariosServelt extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            //String para guardar el JSON generaro por al libreria GSON
            String json;
            //Se crea el objeto Persona
            Usuarios u = new Usuarios();
                    HttpSession session=request.getSession();   //crea la sesión si no existe
            //Se crea el objeto de la logica de negocio
            UsuariosBL uBL = new UsuariosBL();
            GsonBuilder b = new GsonBuilder();
            Gson gson = b.registerTypeAdapter(Usuarios.class, new UsuariosAdapter()).create();
            //Se hace una pausa para ver el modal
            Thread.sleep(1000);
            
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************
            String accion = request.getParameter("accion");            
            switch (accion) {
                case "consultarUsuarios":
                    json = gson.toJson(uBL.findAll(Usuarios.class.getName()));
                    out.print(json);
                    break;
                case "eliminarUsuarios":
                    u.setUId(Integer.parseInt(request.getParameter("idUsuario")));
                     //Se elimina el objeto
                    uBL.delete(u);

                    //Se imprime la respuesta con el response
                    out.print("El usuario fue eliminado correctamente");
                    break;
                    
                case "ordenMorosos":
                    OrdenesBL oBL = new OrdenesBL();
                    DetallesBL dBL = new DetallesBL();
                    List<Usuarios> m = uBL.findAll(Usuarios.class.getName());
                    List<Usuarios> f1 = new ArrayList<>();
                    for (int i =0; i < m.size(); i++){
                        if (m.get(i).getUTipo().equals("usuarioCliente"))
                            f1.add(m.get(i));
                    }
                    List<Usuarios> f2 = new ArrayList<>();
                    for (int i =0; i < f1.size(); i++){
                        if (f1.get(i).getOrdeneses().size() > 0){
                            for (int j =0; j < f1.get(i).getOrdeneses().size(); j++){
                                Ordenes o = oBL.findById(f1.get(i).getOrdeneses().iterator().next().getOId());
                                List<Detalles> d = dBL.findAllByOther(String.valueOf(o.getOId()));
                                for (int a =0; a < d.size(); a++){
                                    Date date = d.get(a).getDFechaLimite();
                                    Date now = new Date();
                                    Calendar someCalendar1 = Calendar.getInstance();
                                    someCalendar1.setTime(date);
                                    if (now.compareTo(someCalendar1.getTime()) > 0) {
                                        f2.add(f1.get(i));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    Set<Usuarios> hs = new HashSet<>();
                    hs.addAll(f2);
                    f2.clear();
                    f2.addAll(hs);
                    json = gson.toJson(f2);
                    out.print(json);
                    break;
             
                case "consultarUsuariosPorCuenta":   //Se guarda un usuario y una contraseña en una persona, y se busca si la persona existe
                    //se consulta la persona por ID
                    Usuarios consultado= new Usuarios();
                    consultado.setUUsuario(request.getParameter("usuario"));
                    consultado.setUContrasena(request.getParameter("contraseña"));
                    u = uBL.findByOther(consultado);
                    
                    //se pasa la informacion del objeto a formato JSON
                    json = gson.toJson(u);
                    out.print(json);
                    break;
                    
                    
                case "consultarUsuariosById":
                    u = uBL.findById(Integer.parseInt(request.getParameter("idUsuario")));
                    //se pasa la informacion del objeto a formato JSON
                    json = gson.toJson(u);
                    out.print(json);
                    break;
                    
                case "agregarUsuario": case "modificarUsuario":

                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                    u.setUTipo(request.getParameter("tipo"));
                    u.setUId(Integer.parseInt(request.getParameter("idUsuario")));
                    u.setUNombre(request.getParameter("nombre"));
                    u.setUApellidos(request.getParameter("apellidos"));
                   
                    String fechatxt = request.getParameter("fechaNacimiento");
                    Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fechatxt);
                    u.setUFechaNac(new java.sql.Date(date.getTime()));
                    u.setUContrasena(request.getParameter("contrasena"));
                    u.setUCorreo(request.getParameter("correo"));
                    u.setUTelCasa(request.getParameter("telCasa"));
                    u.setUTelCel(request.getParameter("telCel"));
                    u.setUUsuario(request.getParameter("usuario"));
                    u.setUDireccion(request.getParameter("direccion"));
                    boolean validacion= false;
                    if(accion.equals("agregarUsuario")){ //es insertar usuarios
                        List<Usuarios> lista = uBL.findAll(Usuarios.class.getName());
                        for(Usuarios usuarios : lista){
                            if(usuarios.getUUsuario() == null ? u.getUUsuario() == null : usuarios.getUUsuario().equals(u.getUUsuario())){
                                out.print("E~Usted ha ingresado un nombre de usuario que ya existe");
                                validacion= true;
                            }
                        }
                        if(!validacion){
                        //Se guarda el objeto
                            uBL.save(u);
                            out.print("C~El usuario fue ingresado correctamente");
                        }

                        //Se imprime la respuesta con el response
                    
                        
                    }else{//es modificar persona
                        //Se guarda el objeto
                        uBL.merge(u);

                        //Se imprime la respuesta con el response
                        out.print("C~El usuario fue modificado correctamente");
                    }
                    
                    break;
                case "agregar":
                    u.setUTipo(request.getParameter("tipo"));
                    u.setUId(Integer.parseInt(request.getParameter("idUsuario")));
                    u.setUNombre(request.getParameter("nombre"));
                    u.setUApellidos(request.getParameter("apellidos"));
                   
                    String fechatx = request.getParameter("fechaNacimiento");
                    Date dat = new SimpleDateFormat("yyyy-MM-dd").parse(fechatx);
                    u.setUFechaNac(new java.sql.Date(dat.getTime()));
                    u.setUContrasena(request.getParameter("contrasena"));
                    u.setUCorreo(request.getParameter("correo"));
                    u.setUTelCasa(request.getParameter("telCasa"));
                    u.setUTelCel(request.getParameter("telCel"));
                    u.setUUsuario(request.getParameter("usuario"));
                    u.setUDireccion(request.getParameter("direccion"));
                    boolean valida= false;
                    List<Usuarios> lista1 = uBL.findAll(Usuarios.class.getName());
                        for(Usuarios usuarios : lista1){
                            if(usuarios.getUUsuario() == null ? u.getUUsuario() == null : usuarios.getUUsuario().equals(u.getUUsuario())){
                                out.print("E~Usted ha ingresado un nombre de usuario que ya existe");
                                valida= true;
                            }
                        }
                        if(!valida){
                        //Se guarda el objeto
                            uBL.save(u);
                            json = gson.toJson(u);
                            out.print(json);
                        }

                    
                    break;
                 case "iniciarSesion":
                    List<Usuarios> lista= uBL.findAll(Usuarios.class.getName());
                    String usuario = request.getParameter("usuario");
                    String contra = request.getParameter("contrasena");
 
                    for (Usuarios usuarios : lista){
                        if(usuarios.getUUsuario().equals(usuario) && usuarios.getUContrasena().equals(contra)){
                            u = usuarios;
                        }
                    }
                    String nombre = u.getUNombre();
                    int i = u.getUId();
                    String id= String.valueOf(i);
                            session.setAttribute("usuario", u); 
                            session.setAttribute("nombre", nombre );
                            session.setAttribute("id", id );
                            if (u.getUTipo().equals("usuarioAdmin")) {
                                session.setAttribute("tipo", "Administrador"); 
                            }else{
                                session.setAttribute("tipo", "Cliente"); 
                            }
                    if(u.getUUsuario().equals(usuario) && u.getUContrasena().equals(contra)){
                        out.print("C~Validación correcta... espere esta siendo redireccionado");
                    }else{
                        out.print("E~Usuario o contraseña invalidos");
                    }
                    break;
                 case "login":
                    String usu = request.getParameter("usuario");
                    String con = request.getParameter("contrasena");
                    boolean v = true;
                    while (v){
                        List<Usuarios> li = uBL.findAll(Usuarios.class.getName());
                        for (Usuarios usuarios : li){
                            if(usuarios.getUUsuario().equals(usu) && usuarios.getUContrasena().equals(con)){
                                u = usuarios;
                                v = false;
                            }
                        }
                    }
                    String nombre2 = request.getParameter("nombre");
                    int in = u.getUId();
                    String xid= String.valueOf(in);
                            session.setAttribute("usuario", u); 
                            session.setAttribute("nombre", nombre2 );
                            session.setAttribute("id", xid );
                            if (u.getUTipo().equals("usuarioAdmin")) {
                                session.setAttribute("tipo", "Administrador"); 
                            }else{
                                session.setAttribute("tipo", "Cliente"); 
                            }
                          
                    break;
                     
                    case "cerrarSession":
                        session.removeAttribute("usuario");
                        session.removeAttribute("nombre");
                        session.removeAttribute("tipo");
                        session.removeAttribute("car");
                        session.invalidate();
                        out.print("Cierre de sesión correcto");
                    break;
//                    String usuario = request.getParameter("usuario");
//                    String password = request.getParameter("password");
//                    HttpSession session=request.getSession(true);   //crea la sesión si no existe
//                            session.setAttribute("usuario", usuario); 
//                            //session.setAttribute("loginStatus", "login"); 
//                            if (u.getUTipo()== "usuarioAdmin") {
//                                session.setAttribute("tipo", "Administrador"); 
//                            }else{
//                                session.setAttribute("tipo", "Cliente"); 
//                            }
//                            out.print("C~Validación correcta... espere esta siendo redireccionado");
                        
                    
                default:
                    out.print("E~No se indico la acción que se desea realizar");
                    break;
            }

        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
        }
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
