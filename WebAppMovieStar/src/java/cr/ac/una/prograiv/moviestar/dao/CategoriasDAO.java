/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.dao;

import cr.ac.una.prograiv.moviestar.domain.Categorias;
import cr.ac.una.prograiv.moviestar.utils.HibernateUtil;
import java.util.HashSet;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;

/**
 *
 * @author Byron
 */
public class CategoriasDAO extends HibernateUtil implements IBaseDAO<Categorias, Integer>{

    @Override
    public void save(Categorias o) {
        try {
            iniciaOperacion();
            getSesion().save(o);
            getTransac().commit();
        } catch (HibernateException he) {
            manejaExcepcion(he);
            throw he;
        } finally {
            getSesion().close();
        }
    }

    @Override
    public Categorias merge(Categorias o) {
        try {
            iniciaOperacion();
            o = (Categorias) getSesion().merge(o);
            getTransac().commit();
        } catch (HibernateException he) {
            manejaExcepcion(he);
            throw he;
        } finally {
            getSesion().close();
        }
        return o;
    }

    @Override
    public void delete(Categorias o) {
        try {
            iniciaOperacion();
            getSesion().delete(o);
            getTransac().commit();
        } catch (HibernateException he) {
            manejaExcepcion(he);
            throw he;
        } finally {
            getSesion().close();
        }
    }

    @Override
    public Categorias findByOther(Categorias c) {
        Categorias categoria = null;
        List<Categorias> lista = findAll();
        
        try {
            iniciaOperacion();
            //List<Categorias> lista = findAll();
            for (Categorias categorias : lista) {
                if(categorias.getCNombre() == null ? c.getCNombre() == null : categorias.getCNombre().equals(c.getCNombre()))
                    return categorias;
            }
        } finally {
            getSesion().close();
        }
        for (int i=0; i < lista.size(); i++){
            lista.get(i).setCatalogoses(null);
        }
        return categoria;
    }


    @Override
    public List<Categorias> findAll() {
        List<Categorias> listaCategorias;
        try {
            iniciaOperacion();
            listaCategorias = getSesion().createQuery("from Categorias").list();
            listaCategorias.stream().forEach((cat) -> {
                cat.getCatalogoses().size();
            });
        } finally {
            getSesion().close();
        }
        for (int i=0; i < listaCategorias.size(); i++){
            listaCategorias.get(i).setCatalogoses(null);
        }
        return listaCategorias;
    }
    
    @Override
    public Categorias findById(Integer id) {
        Categorias cat = null;

        try {
            iniciaOperacion();
            cat = (Categorias) getSesion().get(Categorias.class, id);
            cat.getCatalogoses().size();
        } finally {
            getSesion().close();
        }
        return cat;
//         Categorias cat = null;
//         List<Categorias> lista = findAll();
//         for(int i= 0; i<=lista.size(); i++){
//             if(lista.get(i).getCId() == id)
//                 lista.get(i).setCatalogoses(null);
//                 cat = lista.get(i);
//         }
//         return cat;
    }
    

    @Override
    public List<Categorias> findAllByOther(String o) {
         List<Categorias> lista= null;
         int val= Integer.parseInt(o);
       try {
            iniciaOperacion();
            String text = "from Categorias where c_Id= '"+ val +"'";
            Query query = getSesion().createQuery(text);
            lista= query.list();
        } finally {
            getSesion().close();
        }
       
        return lista;
    }

   
    public List<Categorias> findAllByName(String o) {
         List<Categorias> lista= null;
       try {
            iniciaOperacion();
            Query query = getSesion().createQuery("from Categorias where c_nombre = '"+ o +"'");
            lista= query.list();
            lista.stream().forEach((cat) -> {
                cat.getCatalogoses().size();
            });
        } finally {
            getSesion().close();
        }
       
        return lista;
    }
}
