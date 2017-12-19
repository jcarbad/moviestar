/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author Byron
 */
public class CarritoCompras implements java.io.Serializable{
    ArrayList<Catalogos> itemList = new ArrayList<>();

    public CarritoCompras() {
    }

    public void add(Catalogos c){
        itemList.add(c);
    }
    
    
}
