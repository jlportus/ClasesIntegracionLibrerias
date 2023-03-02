package es.mde.acing.ProyectoApi.utils.jackson;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import es.mde.acing.ProyectoApi.negocio.Persona;

public class ParseadorJackson {

	static ObjectMapper objectMapper = new ObjectMapper();

	public static void parseadorJsonAObjeto(String json, Persona claseObjetivo) {
		try {

			JsonNode jsonNode = objectMapper.readTree(json);
			System.out.println("La persona sin parsear\n" + claseObjetivo.toString());
			
			Persona objeto = objectMapper.readValue(json, claseObjetivo.getClass());
			System.out.println("La persona leida desde un string\n" + objeto.toString());
			
			
			System.out.println("La persona usando el orden determinado\n" 
							+ objectMapper.writeValueAsString(objeto));
			
			//vuelvo a trastear el string
			JsonNode objetoJson =  objectMapper.readTree(json);
			System.out.println("La persona en json bonito desde el string\n" + objetoJson.toString());

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
