package cr.ac.una.prograiv.moviestar.domain;
// Generated 17/06/2016 04:31:10 PM by Hibernate Tools 4.3.1


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Ordenes generated by hbm2java
 */
public class Ordenes  implements java.io.Serializable {


     private Integer OId;
     private Usuarios usuarios;
     private Date OFecha;
     private Set detalleses = new HashSet(0);

    public Ordenes() {
    }

    public Ordenes(Usuarios usuarios, Date OFecha, Set detalleses) {
       this.usuarios = usuarios;
       this.OFecha = OFecha;
       this.detalleses = detalleses;
    }
   
    public Integer getOId() {
        return this.OId;
    }
    
    public void setOId(Integer OId) {
        this.OId = OId;
    }
    public Usuarios getUsuarios() {
        return this.usuarios;
    }
    
    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }
    public Date getOFecha() {
        return this.OFecha;
    }
    
    public void setOFecha(Date OFecha) {
        this.OFecha = OFecha;
    }
    public Set getDetalleses() {
        return this.detalleses;
    }
    
    public void setDetalleses(Set detalleses) {
        this.detalleses = detalleses;
    }




}


