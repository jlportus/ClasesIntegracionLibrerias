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
			System.out.println("Json leido desde un string: " + jsonNode);
			System.out.println("Json leido desde un string en formato pretty:\n" + jsonNode.toPrettyString());

			System.out.println("La persona sin parsear (aun no lo he leido del estring)\n" + claseObjetivo.toString());

			System.out.println("Asigno a la clase el string para que lo parsee con readValue()");

			Persona objeto = objectMapper.readValue(json, claseObjetivo.getClass());
			System.out.println("La persona leida desde un string (Uso el toString de Persona)\n" + objeto.toString());

			/*
			 * Usando anotaciones para modificar los json, ir a la entidad e ir comentando y
			 * descomentando segun se necesite
			 */
			System.out.println("\nUso las anotaciones para modificar el orden y eliminar campos");
			System.out.println("La persona usando el orden determinado\n" + objectMapper.writeValueAsString(objeto));

			// vuelvo a trastear el string
			JsonNode objetoJson = objectMapper.readTree(json);
			System.out.println("La persona en json bonito desde el string\n" + objetoJson.toPrettyString());

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
