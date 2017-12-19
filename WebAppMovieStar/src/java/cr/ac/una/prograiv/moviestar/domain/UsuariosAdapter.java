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
 * @author Irving Picado Obando
 */
public class UsuariosAdapter implements JsonSerializer<Usuarios>{

    @Override
    public JsonElement serialize(Usuarios usuarios, java.lang.reflect.Type type, JsonSerializationContext jsc) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", usuarios.getUId());
        jsonObject.addProperty("apellidos", usuarios.getUApellidos());
        jsonObject.addProperty("contrasena", usuarios.getUContrasena());
        jsonObject.addProperty("correo", usuarios.getUCorreo());
        jsonObject.addProperty("direccion", usuarios.getUDireccion());
        jsonObject.addProperty("nombre", usuarios.getUNombre());
        jsonObject.addProperty("telCasa", usuarios.getUTelCasa());
        jsonObject.addProperty("user", usuarios.getUUsuario()); 
        jsonObject.addProperty("cumple", usuarios.getUFechaNac().toString()); 
        jsonObject.addProperty("telCel", usuarios.getUTelCel()); 
        return jsonObject;
    }
}
