package cr.ac.una.prograiv.moviestar.domain;
// Generated 17/06/2016 04:31:10 PM by Hibernate Tools 4.3.1


import java.util.HashSet;
import java.util.Set;

/**
 * Categorias generated by hbm2java
 */
public class Categorias  implements java.io.Serializable {


     private Integer CId;
     private String CNombre;
     private String CObs;
     private Set catalogoses = new HashSet(0);

    public Categorias() {
    }

	
    public Categorias(String CNombre, String CObs) {
        this.CNombre = CNombre;
        this.CObs = CObs;
    }
    public Categorias(String CNombre, String CObs, Set catalogoses) {
       this.CNombre = CNombre;
       this.CObs = CObs;
       this.catalogoses = catalogoses;
    }
   
    public Integer getCId() {
        return this.CId;
    }
    
    public void setCId(Integer CId) {
        this.CId = CId;
    }
    public String getCNombre() {
        return this.CNombre;
    }
    
    public void setCNombre(String CNombre) {
        this.CNombre = CNombre;
    }
    public String getCObs() {
        return this.CObs;
    }
    
    public void setCObs(String CObs) {
        this.CObs = CObs;
    }
    public Set getCatalogoses() {
        return this.catalogoses;
    }
    
    public void setCatalogoses(Set catalogoses) {
        this.catalogoses = catalogoses;
    }




}

