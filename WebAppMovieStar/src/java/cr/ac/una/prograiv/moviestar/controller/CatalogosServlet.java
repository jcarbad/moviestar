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
import cr.ac.una.prograiv.moviestar.domain.Categorias;
import cr.ac.una.prograiv.moviestar.domain.CatalogosAdapter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author byron
 */
public class CatalogosServlet extends HttpServlet {

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
            switch (accion) {
                case "showCatalogos":
                    List<Catalogos> lis = cBL.findAllByOther(request.getParameter("id"));
                    json = gson.toJson(lis);
                    out.print(json);
                    break;
                case "consultarCatalogo":  
                    List<Catalogos> list = cBL.findAll(Catalogos.class.getName());
                    json = gson.toJson(list);
                    out.print(json);
                    break;
                
                case "ultimosCatalogos":
                    List<Catalogos> l = cBL.findAll(Catalogos.class.getName());
                    List<Catalogos> lN = new ArrayList<>();
                    int cont =0;
                    for (int i = l.size()-1; i >= 0 && cont < 8; i--){
                        lN.add(l.get(i));
                        cont++;
                    }
                    json = gson.toJson(lN);
                    out.print(json);
                    break;
                    
                case "eliminarCatalogo":   
                    c.setCId(Integer.parseInt(request.getParameter("codigo")));
                    cBL.delete(c);

                    //Se imprime la respuesta con el response
                    out.print("La pelicula fue eliminada correctamente");
                    break;
                    
                 case "consultarCatalogosPorId":
                    c = cBL.findById(Integer.parseInt(request.getParameter("idCatalogo")));
                    
                    //se pasa la informacion del objeto a formato JSON
                    idDummy = c.getCId();
                    //se pasa la informacion del objeto a formato JSON
                    json = gson.toJson(c);
                    out.print(json);
                    break;     
                    
                case "buscarCatalogo":  
                    List<Catalogos> lista2 = cBL.findAll(Catalogos.class.getName());
                    List<Catalogos> encontrados = new ArrayList<>();
                    String name = request.getParameter("nombreCatalogo");
                    for(int i=0; i< lista2.size(); i++){
                        if(lista2.get(i).getCNombre().contains(name)){
                            encontrados.add(lista2.get(i));
                        }
                    }
                    json = gson.toJson(encontrados);
                    out.print(json);
                    break;
                   
                    
               
                case "agregarCatalogo": case "modificarCatalogo":   //Una pelicula o serie no deberia poder ser modificada
                    
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                    c.setCNombre(request.getParameter("nombre"));
                    c.setCActorPrin(request.getParameter("actor"));
                    c.setCCantidad(Integer.parseInt(request.getParameter("cantidad")));
                    c.setCDirector(request.getParameter("director"));
                    String cater = request.getParameter("categoria");
                    Categorias categorias = new Categorias();
                    categorias.setCId(Integer.parseInt(cater));
                    c.setCategorias(categorias);
                    c.setCPrecAlqu(Float.parseFloat(request.getParameter("precioA")));
                    c.setCPrecComp(Float.parseFloat(request.getParameter("precioV")));
                    c.setCTipo(request.getParameter("tipo"));
                    c.setCUrlImg(request.getParameter("urlImg"));
                    c.setCDescrip(request.getParameter("descripc"));
                    c.setDetalles(null);
                    if (idDummy != -1){
                        c.setCId(idDummy);
                    }
                    boolean validacion= false;
                    if(accion.equals("agregarCatalogo")){ //es insertar catalogos
                        List<Catalogos> lista = cBL.findAll(Catalogos.class.getName());
                        for(Catalogos catalogo : lista){
                            if(catalogo.getCNombre()== null ? c.getCNombre()== null : catalogo.getCNombre().equals(c.getCNombre())){  //Busca en los que ya se han agregado si ya existe eel nombre del que se está agregando
                                out.print("E~Usted ha ingresado un catalogo que ya existe");
                                validacion= true;
                            }
                        }
                        if(!validacion){
                        //Se guarda el objeto
                            cBL.save(c);
                            out.print("C~El catalogo se ha modificado correctamente");
                        }

                        //Se imprime la respuesta con el response
                    
                        
                    }else{//es modificar persona
                        //Se guarda el objeto
                        cBL.merge(c);

                        //Se imprime la respuesta con el response
                        out.print("C~El catalogo se ha modificado correctamente");
                    }
                    
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
