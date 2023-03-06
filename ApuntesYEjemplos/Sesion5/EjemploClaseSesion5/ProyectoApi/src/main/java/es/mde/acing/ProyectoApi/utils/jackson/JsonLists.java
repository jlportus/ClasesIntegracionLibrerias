package es.mde.acing.ProyectoApi.utils.jackson;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import es.mde.acing.ProyectoApi.negocio.Car;

public class JsonLists {

	public static void generandoListados() {

		// me traigo el object mapper static del parseador
		ObjectMapper objectMapper = ParseadorJackson.objectMapper;

		String jsonCarArray = "[{ \"color\" : \"Black\", \"type\" : \"BMW\" }, { \"color\" : \"Red\", \"type\" : \"FIAT\" }]";

		try {
			JsonNode listaJson = objectMapper.readTree(jsonCarArray);
			System.out.println("\n---\nMi arrayString Json: \n" + listaJson);

		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		try {
			List<Car> listCar = objectMapper.readValue(jsonCarArray, new TypeReference<List<Car>>() {
			});

			listCar.forEach(System.out::println);

		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {

			e.printStackTrace();
		}

	}

}
