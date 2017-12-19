/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.moviestar.domain;

import com.google.gson.*;
import com.google.gson.JsonSerializer;

/**
 *
 * @author byron
 */
public class CatalogosAdapter implements JsonSerializer<Catalogos> {

    @Override
    public JsonElement serialize(Catalogos catalogos, java.lang.reflect.Type type, JsonSerializationContext jsc) {
            JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("CId", catalogos.getCId());
        jsonObject.addProperty("categorias", catalogos.getCategorias().getCId());
        jsonObject.addProperty("CNombre", catalogos.getCNombre());
        jsonObject.addProperty("CDirector", catalogos.getCDirector());
        jsonObject.addProperty("CActorPrin", catalogos.getCActorPrin());
        jsonObject.addProperty("CCantidad", catalogos.getCCantidad());
        jsonObject.addProperty("CTipo", catalogos.getCTipo());
        jsonObject.addProperty("CPrecAlqu", catalogos.getCPrecAlqu());
        jsonObject.addProperty("CPrecComp", catalogos.getCPrecComp());
        jsonObject.addProperty("CUrlImg", catalogos.getCUrlImg());
        jsonObject.addProperty("CDescrip", catalogos.getCDescrip());
        if (catalogos.getDetalles() != null)
            jsonObject.addProperty("detalles", catalogos.getDetalles().toString());
        return jsonObject;
    }
}