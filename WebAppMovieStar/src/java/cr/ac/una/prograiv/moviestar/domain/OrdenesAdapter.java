/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.domain;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 *
 * @author Mery Zúñiga
 */
public class OrdenesAdapter implements JsonSerializer<Ordenes>{

    @Override
    public JsonElement serialize(Ordenes ordenes, java.lang.reflect.Type type, JsonSerializationContext jsc) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", ordenes.getOId());
        jsonObject.addProperty("fecha", ordenes.getOFecha().toString());
        jsonObject.addProperty("usuario", ordenes.getUsuarios().getUId());
        if (ordenes.getDetalleses() != null){
            jsonObject.addProperty("detalleses", ordenes.getDetalleses().toString());
        }
        return jsonObject;
    }
    
}
