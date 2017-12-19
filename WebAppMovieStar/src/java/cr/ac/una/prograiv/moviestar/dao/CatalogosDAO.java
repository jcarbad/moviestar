/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.dao;

import cr.ac.una.prograiv.moviestar.domain.Catalogos;
import cr.ac.una.prograiv.moviestar.utils.HibernateUtil;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;

/**
 *
 * @author Byron
 */
public class CatalogosDAO extends HibernateUtil implements IBaseDAO<Catalogos, Integer>{

    public CatalogosDAO() {
    }

    @Override
    public void save(Catalogos o) {
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
    public Catalogos merge(Catalogos o) {
        try {
            iniciaOperacion();
            o = (Catalogos) getSesion().merge(o);
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
    public void delete(Catalogos o) {
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
    public Catalogos findById(Integer id) {
        Catalogos cat = null;

        try {
            iniciaOperacion();
            cat = (Catalogos) getSesion().get(Catalogos.class, id);
        } finally {
            getSesion().close();
        }
        return cat;
    }

    @Override
    public Catalogos findByOther(Catalogos o) {
        Catalogos catalogos = null;

        try {
            iniciaOperacion();
            catalogos = (Catalogos) getSesion().get(Catalogos.class, o);
        } finally {
            getSesion().close();
        }
        return catalogos;
    }

    @Override
    public List<Catalogos> findAll() {
        List<Catalogos> listaCatalogos;
        try {
            iniciaOperacion();
            listaCatalogos = getSesion().createQuery("from Catalogos").list();
            } finally {
            getSesion().close();
        }
        return listaCatalogos;
    }

    @Override
    public List<Catalogos> findAllByOther(String o) {
         List<Catalogos> lista= null;
       try {
            iniciaOperacion();
            Query query = getSesion().createQuery("from Catalogos where c_categoria = '"+ o +"'");
            lista= query.list();
            
        } finally {
            getSesion().close();
        }
       
        return lista;
    }
    
    @Override
    public List<Catalogos> findAllByName(String o) {
        List<Catalogos> lista= null;
       try {
            iniciaOperacion();
            Query query = getSesion().createQuery("from Catalogos where c_nombre = '"+ o +"'");
            lista= query.list();
            
        } finally {
            getSesion().close();
        }
       
        return lista;
//         List<Catalogos> lista= null;
//         List<Catalogos> encontrados = new ArrayList<Catalogos>();
//       try {
//              iniciaOperacion();
//              lista= findAll();
//              for(int i=0; i<= lista.size(); i++){
//                  if(lista.get(i).getCNombre().contains(o)){
//                      encontrados.add(lista.get(i));
//                  }
//              }
//              lista.stream().forEach((cat) -> {
//                 cat.getDetalleses().size();
//              });
//                      
//        } finally {
//            getSesion().close();
//        }
//       
//        return encontrados;
    }

    
    
}
