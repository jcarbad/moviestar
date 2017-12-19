package cr.ac.una.prograiv.moviestar.domain;
// Generated 16-jun-2016 18:35:06 by Hibernate Tools 4.3.1


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Usuarios generated by hbm2java
 */
public class Usuarios  implements java.io.Serializable {


     private int UId;
     private String UUsuario;
     private String UContrasena;
     private String UNombre;
     private String UApellidos;
     private String UCorreo;
     private Date UFechaNac;
     private String UDireccion;
     private String UTelCasa;
     private String UTelCel;
     private String UTipo;
     private Set<Ordenes> ordeneses = new HashSet<Ordenes>(0);

    public Usuarios() {
    }

	
    public Usuarios(int UId, String UUsuario) {
        this.UId = UId;
        this.UUsuario = UUsuario;
    }
    public Usuarios(int UId, String UUsuario, String UContrasena, String UNombre, String UApellidos, String UCorreo, Date UFechaNac, String UDireccion, String UTelCasa, String UTelCel, String UTipo, Set<Ordenes> ordeneses) {
       this.UId = UId;
       this.UUsuario = UUsuario;
       this.UContrasena = UContrasena;
       this.UNombre = UNombre;
       this.UApellidos = UApellidos;
       this.UCorreo = UCorreo;
       this.UFechaNac = UFechaNac;
       this.UDireccion = UDireccion;
       this.UTelCasa = UTelCasa;
       this.UTelCel = UTelCel;
       this.UTipo = UTipo;
       this.ordeneses = ordeneses;
    }
   
    public int getUId() {
        return this.UId;
    }
    
    public void setUId(int UId) {
        this.UId = UId;
    }
    public String getUUsuario() {
        return this.UUsuario;
    }
    
    public void setUUsuario(String UUsuario) {
        this.UUsuario = UUsuario;
    }
    public String getUContrasena() {
        return this.UContrasena;
    }
    
    public void setUContrasena(String UContrasena) {
        this.UContrasena = UContrasena;
    }
    public String getUNombre() {
        return this.UNombre;
    }
    
    public void setUNombre(String UNombre) {
        this.UNombre = UNombre;
    }
    public String getUApellidos() {
        return this.UApellidos;
    }
    
    public void setUApellidos(String UApellidos) {
        this.UApellidos = UApellidos;
    }
    public String getUCorreo() {
        return this.UCorreo;
    }
    
    public void setUCorreo(String UCorreo) {
        this.UCorreo = UCorreo;
    }
    public Date getUFechaNac() {
        return this.UFechaNac;
    }
    
    public void setUFechaNac(Date UFechaNac) {
        this.UFechaNac = UFechaNac;
    }
    public String getUDireccion() {
        return this.UDireccion;
    }
    
    public void setUDireccion(String UDireccion) {
        this.UDireccion = UDireccion;
    }
    public String getUTelCasa() {
        return this.UTelCasa;
    }
    
    public void setUTelCasa(String UTelCasa) {
        this.UTelCasa = UTelCasa;
    }
    public String getUTelCel() {
        return this.UTelCel;
    }
    
    public void setUTelCel(String UTelCel) {
        this.UTelCel = UTelCel;
    }
    public String getUTipo() {
        return this.UTipo;
    }
    
    public void setUTipo(String UTipo) {
        this.UTipo = UTipo;
    }
    public Set<Ordenes> getOrdeneses() {
        return this.ordeneses;
    }
    
    public void setOrdeneses(Set<Ordenes> ordeneses) {
        this.ordeneses = ordeneses;
    }




}


