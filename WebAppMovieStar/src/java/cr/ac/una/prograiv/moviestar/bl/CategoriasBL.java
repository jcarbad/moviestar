/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.bl;

import cr.ac.una.prograiv.moviestar.domain.Categorias;
import java.util.List;

/**
 *
 * @author Byron
 */
public class CategoriasBL extends BaseBL implements IBaseBL<Categorias, Integer>{

    public CategoriasBL() {
        super();
    }

    @Override
    public void save(Categorias o) {
        this.getDao(o.getClass().getName()).save(o);
    }

    @Override
    public Categorias merge(Categorias o) {
        return (Categorias) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Categorias o) {
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Categorias findByOther(Categorias o) {
        return (Categorias) this.getDao(o.getClass().getName()).findByOther(o);
    }
    
    @Override
    public Categorias findById(Integer o) {
        return (Categorias) this.getDao(Categorias.class.getName()).findById(o);
    }

    @Override
    public List<Categorias> findAllByOther(String o) {
        return this.getDao(Categorias.class.getName()).findAllByOther(o);
    }
    
    @Override
    public List<Categorias> findAll(String o) {
        return this.getDao(o).findAll();
    }
    
    @Override
    public List<Categorias> findAllByName(String className) {
        return this.getDao(Categorias.class.getName()).findAllByName(className);
    }
    
}
