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
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Mery Zúñiga
 */
public class OrdenesServlet extends HttpServlet {

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
            GsonBuilder b = new GsonBuilder();
            Gson gson = b.registerTypeAdapter(Ordenes.class, new OrdenesAdapter()).create();
            
            //Se crea el objeto Persona
            Ordenes o = new Ordenes();
            

            //Se crea el objeto de la logica de negocio
            OrdenesBL oBL = new OrdenesBL();
            UsuariosBL uBL= new UsuariosBL();

            //Se hace una pausa para ver el modal
            Thread.sleep(1000);
            
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************
            String accion = request.getParameter("accion");
            switch (accion) {
                case "consultarOrdenes":
                    json = gson.toJson(oBL.findAll(Ordenes.class.getName()));
                    out.print(json);
                    break;
                case "eliminarOrden":
                    o.setOId(Integer.parseInt(request.getParameter("idOrden")));
                     //Se elimina el objeto
                    oBL.delete(o);

                    //Se imprime la respuesta con el response
                    out.print("La orden fue eliminada correctamente");
                    break;
                    
                case "consultarOrdenesPorPersona":   //Se le envía el nombre de usuario para ver cuantas ordenes tiene
                    
                    //se pasa la informacion del objeto a formato JSON
                    String id = request.getParameter("id");
                    json = gson.toJson(oBL.findAllByName(id));
                    out.print(json); 
                    break;
                    
                case "consultarOrdenesPorEstado":   //Se envia un tipo de estado para buscar todas ls ordenes con ese estado
                    json = new Gson().toJson(oBL.findAllByOther("estado"));
                    out.print(json);
                    break; 
                case "agregarOrden":
                    String fechatxt = request.getParameter("fecha");
                    DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    o.setOFecha(date);
                    Usuarios u= uBL.findById(Integer.parseInt(request.getParameter("usuario")));
                    o.setUsuarios(u);
                    //o.setDetalleses(null);
                    if (idDummy != -1)
                        o.setOId(idDummy);
                    boolean validacion= false;
                    if(accion.equals("agregarOrden")){ 
                        
                        oBL.save(o);
                        List<Ordenes> orders = oBL.findAll(Ordenes.class.getName());
                        Ordenes oAux = orders.get(orders.size()-1);
                        oAux.setOId(oAux.getOId() + 1);
                        //oAux.getDetalleses().size();
                        json = gson.toJson(oAux);
                        out.print(json);
                        HttpSession sesion = request.getSession();
                        sesion.removeAttribute("car");
                    }else{
                        oBL.merge(o);
                        out.print("C~La orden se ha modificado correctamente");
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
