/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.moviestar.bl.CatalogosBL;
import cr.ac.una.prograiv.moviestar.domain.Catalogos;
import cr.ac.una.prograiv.moviestar.domain.CatalogosAdapter;
import cr.ac.una.prograiv.moviestar.domain.Categorias;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Byron
 */
public class CarritoServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            //String para guardar el JSON generaro por al libreria GSON
            String json;
            //Se crea el objeto Persona
            Catalogos c = new Catalogos();
            
            GsonBuilder b = new GsonBuilder();
            
            
            Gson gson = b.registerTypeAdapter(Catalogos.class, new CatalogosAdapter()).create();

            //Se crea el objeto de la logica de negocio
            CatalogosBL cBL = new CatalogosBL();

            //Se hace una pausa para ver el modal
            Thread.sleep(1000);
            
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************

            String accion = request.getParameter("accion");
            HttpSession sesion = request.getSession();
            switch (accion) {       
                case "add":   //Una pelicula o serie no deberia poder ser modificada
                    c.setCId(Integer.parseInt(request.getParameter("id")));
                    c.setCNombre(request.getParameter("nombre"));
                    c.setCPrecAlqu(Float.parseFloat(request.getParameter("precioAlq")));
                    c.setCPrecComp(Float.parseFloat(request.getParameter("precioCom")));
                    synchronized(sesion){
                        List<Catalogos> list = (List<Catalogos>)sesion.getAttribute("car");
                        if (list == null){
                            list = new ArrayList<>();
                            sesion.setAttribute("car", list);
                        }
                        list.add(c);
                        out.print("El elemento se añadió al carrito");
                    }
                    break;
                case "get":
                    List<Catalogos> l = (List<Catalogos>)sesion.getAttribute("car");
                    
                    json = new Gson().toJson(l);
                    out.print(json);
                    break;
                case "delete":
                    String id = request.getParameter("id");
                    List<Catalogos> li = (List<Catalogos>)sesion.getAttribute("car");
                    for (Catalogos ca : li){
                        if (ca.getCId() == Integer.parseInt(id))
                            if (li.remove(ca)){
                                out.print("Se eliminó correctamente");
                                break;
                            }
                    }
                    break;
                default:
                    out.print("E~No se indico la acción que se desea realizar");
                    break;
            }

        } catch (NumberFormatException | InterruptedException e) {
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
