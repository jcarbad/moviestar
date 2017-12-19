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
import cr.ac.una.prograiv.moviestar.domain.Catalogos;
import cr.ac.una.prograiv.moviestar.domain.CatalogosAdapter;
import cr.ac.una.prograiv.moviestar.domain.Detalles;
import cr.ac.una.prograiv.moviestar.domain.DetallesAdapter;
import cr.ac.una.prograiv.moviestar.domain.Ordenes;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Mery Zúñiga
 */
public class DetallesServlet extends HttpServlet {

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
            GsonBuilder b = new GsonBuilder();
            Gson gson = b.registerTypeAdapter(Detalles.class, new DetallesAdapter()).create();
            //Se crea el objeto Persona
            Detalles d = new Detalles();

            //Se crea el objeto de la logica de negocio
            DetallesBL dBL = new DetallesBL();
            OrdenesBL oBL = new OrdenesBL();

            //Se hace una pausa para ver el modal
            Thread.sleep(1000);
            
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************
            String accion = request.getParameter("accion");
            switch (accion) {
                case "consultarDetalles":
                    List<Detalles> mmmm = dBL.findAll(Detalles.class.getName());
                    json = gson.toJson(mmmm);
                    out.print(json);
                    break;
                case "eliminarOrden":
                    //d.setOrdenes(Integer.parseInt(request.getParameter("idOrden")));  //idCategoria viene siendo como un numero
                    dBL.delete(d);
                    break;
                    
                case "consultarDetallesPorId":
                    List<Detalles> aux = dBL.findAllByOther(request.getParameter("id"));
                    json = gson.toJson(aux);
                    out.print(json);
                    break;
                    
                case "consultarDetallesSegunOrden":    //Se le envía el id de la orden para ver cuantas ordenes tiene
                    Detalles buscado= null;
                    //buscado.setFk_idOrdenes(Integer.parseInt(request.getParameter("idOrden")));
                    d = dBL.findByOther(buscado);
                    json = gson.toJson(d);
                    out.print(json);
                    break;
                
                case "agregarDetalle": case "modificarDetalles":

                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                    
                    //String fechatxt = request.getParameter("fechaLimite");
                    //DateFormat format = new SimpleDateFormat("MM/dd/yyyy", Locale.ENGLISH);
                    if(accion.equals("agregarDetalle")){
                        Date date = new Date();
                        d.setDFechaLimite(date); 
                        d.setDPrecio(Float.valueOf(request.getParameter("precio")));
                        d.setDTipo(request.getParameter("tipo"));
                        List<Ordenes> lo = oBL.findAll(Ordenes.class.getName());
                        try {
                            Thread.sleep(2000);  
                            d.setOrdenes(lo.get(lo.size()-1));
                        } catch(InterruptedException ex) {
                            Thread.currentThread().interrupt();
                        }
                        //d.setFechaLimite(date);
                        //d.setTipo(request.getParameter("tipo"));
                        d.setDEstado("proceso");
                         //es insertar orden 
                           //Se guarda el objeto
                        //d.getCatalogoses().add(request.getParameter("idC"));
                        d.setDCatalogo(Integer.parseInt(request.getParameter("idC")));
                                dBL.save(d);
                                out.print("C~El detalle se guardo correctamente");

                           //Se imprime la respuesta con el response

                    }else{//es modificar persona
                        //Se guarda el objeto
                        int id = Integer.parseInt(request.getParameter("id"));
                        Detalles a = dBL.findById(id);
                        a.setDEstado(request.getParameter("estado"));
                        dBL.merge(a);

                        //Se imprime la respuesta con el response
                        out.print("C~La orden fue modificada correctamente");  //Se dice que la orden fue modificada porque al cambiar el detalle es la orden lo que se modifica
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
