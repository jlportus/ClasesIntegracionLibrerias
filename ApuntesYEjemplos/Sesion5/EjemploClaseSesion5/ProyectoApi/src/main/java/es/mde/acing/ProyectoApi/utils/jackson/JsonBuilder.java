package es.mde.acing.ProyectoApi.utils.jackson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonBuilder {

	/*
	 * Metodo que genera json y arraysJson
	 */
	@SuppressWarnings("deprecation")
	public static void generadorJson() {
		
		//me traigo el object mapper static del parseador
		ObjectMapper objectMapper = ParseadorJackson.objectMapper;
		
		//Creo un nodo json vacio
		JsonNode nodoJson = objectMapper.createObjectNode();
		System.out.println("\n---\nMi primer objeto json: " + nodoJson);
		
		//Agregando un campo:valor al nodo
		((ObjectNode) nodoJson).put("Clave","valor");
		System.out.println("\nRellenando el objeto json: " + nodoJson.toPrettyString());
		
		//Creo un array json
		ArrayNode arrayJson = objectMapper.createArrayNode();
		System.out.println("\n---\nMi primer array json: " + arrayJson);
		
		//Agrego un nodo al array	
		arrayJson.add(nodoJson);
		arrayJson.add(nodoJson);
		System.out.println("\n---\nMi array json relleno:\n" + arrayJson.toPrettyString());
		
		//Agrego un Campo array al nodo	
		try {
			JsonNode arrayString = objectMapper.readTree(arrayJson.toString());
			((ObjectNode) nodoJson).set("miArray", arrayString);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		System.out.println("\n---\nMi json con clave valor y campo de tipo array:\n" + nodoJson.toPrettyString());
		
	}
	
	
	
	
	
}
