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
public class CategoriasAdapter implements JsonSerializer<Categorias>{
    @Override
    public JsonElement serialize(Categorias categorias, java.lang.reflect.Type type, JsonSerializationContext jsc) {
            JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("CId", categorias.getCId());
        jsonObject.addProperty("CNombre", categorias.getCNombre());
        jsonObject.addProperty("CObs", categorias.getCObs());
        jsonObject.addProperty("catalogoses", categorias.getCatalogoses().toString());
        return jsonObject;
    }
}
