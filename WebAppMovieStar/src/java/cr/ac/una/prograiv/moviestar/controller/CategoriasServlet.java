/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.moviestar.bl.CategoriasBL;
import cr.ac.una.prograiv.moviestar.domain.Catalogos;
import cr.ac.una.prograiv.moviestar.domain.CatalogosAdapter;
import cr.ac.una.prograiv.moviestar.domain.Categorias;
import cr.ac.una.prograiv.moviestar.domain.CategoriasAdapter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.List;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Mery Zúñiga
 */
@WebServlet(name = "CategoriasServlet", urlPatterns = {"/CategoriasServlet"})
public class CategoriasServlet extends HttpServlet {

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
            
            //Se crea el objeto Categorías
            Categorias c = new Categorias();
            
            GsonBuilder b = new GsonBuilder();
            
            
            Gson gson = b.registerTypeAdapter(Categorias.class, new CategoriasAdapter()).create();
            //Se crea el objeto de la logica de negocio
            CategoriasBL cBL = new CategoriasBL();

            //Se hace una pausa para ver el modal
            Thread.sleep(1000);
            
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************
            String accion = request.getParameter("accion");
            switch (accion) {
                case "consultarCategorias":
                    json = new Gson().toJson(cBL.findAll(Categorias.class.getName()));
                    out.print(json);
                    break;
                case "eliminarCategorias":  //que no debería necesitarse eliminar categorias, pero igual se implementa por si se necesitara
                    c.setCId(Integer.parseInt(request.getParameter("idCategoria")));  //idCategoria viene siendo como un numero
                     //Se elimina el objeto
                    cBL.delete(c);
                    

                    //Se imprime la respuesta con el response
                    out.print("La categoría fue eliminada correctamente");
                    break;
                    
                case "consultarCategoriasPorNombre":   
                    Categorias consultada= new Categorias();
                    consultada.setCNombre(request.getParameter("nombreCategoria"));
                    c = cBL.findByOther(consultada);
                    
                    //se pasa la informacion del objeto a formato JSON
                    json = new Gson().toJson(c);
                    out.print(json);
                    break;
                    
                case "consultarCategoriasPorId": 
                    c = cBL.findById(Integer.parseInt(request.getParameter("idCategoria")));
                    //se pasa la informacion del objeto a formato JSON
                    
                    idDummy = c.getCId();
                    json = gson.toJson(c);
                    out.print(json);
                    break;
                    
               
                case "agregarCategoria": case "modificarCategoria":  //Un modificar categoria no se usa

                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                    c.setCNombre(request.getParameter("nombre"));
                    c.setCObs(request.getParameter("observaciones"));
                    if (idDummy != -1)
                        c.setCId(idDummy);
                    boolean validacion= false;
                    if(accion.equals("agregarCategoria")){ //es insertar categorias
                        List<Categorias> lista = cBL.findAll(Categorias.class.getName());
                        for(Categorias categorias : lista){
                            if(categorias.getCNombre()== null ? c.getCNombre()== null : categorias.getCNombre().equals(c.getCNombre())){  //Compara si en lista ya se ha ingresado una categoría con el mismo nombre
                                out.print("E~Usted ha ingresado una categoría que ya existe");
                                validacion= true;
                            }
                        }
                        if(!validacion){
                        //Se guarda el objeto
                            cBL.save(c);
                            out.print("C~La categoría fue ingresada correctamente");
                        }

                        //Se imprime la respuesta con el response
                    
                        
                    }else{//es modificar persona
                        //Se guarda el objeto
                        cBL.merge(c);

                        //Se imprime la respuesta con el response
                        out.print("C~La categoria fue modificada correctamente");
                    }
                    
                    break;
                    
                case "carrusel": case "catalogos":
                    String text = request.getParameter("categoria");
                    
                    json = gson.toJson(cBL.findAllByOther(text));
                    // Hay que serializar a pata como trolazo
                    out.print(json);
                    break;
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
        private int idDummy = -1;
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
