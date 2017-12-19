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
 * @author Byron
 */
public class DetallesAdapter implements JsonSerializer<Detalles>{
    
    @Override
    public JsonElement serialize(Detalles detalles, java.lang.reflect.Type type, JsonSerializationContext jsc) {
            JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", detalles.getDId());
        jsonObject.addProperty("ordenes", detalles.getOrdenes().toString());
        jsonObject.addProperty("tipo", detalles.getDTipo());
        jsonObject.addProperty("fechaL", detalles.getDFechaLimite().toString());
        jsonObject.addProperty("precio", detalles.getDPrecio());
        jsonObject.addProperty("estado", detalles.getDEstado());
        jsonObject.addProperty("catalogo", detalles.getDCatalogo());
        if (detalles.getCatalogoses() != null)
            jsonObject.addProperty("detalles", detalles.getCatalogoses().toString());
        return jsonObject;
    }
}
