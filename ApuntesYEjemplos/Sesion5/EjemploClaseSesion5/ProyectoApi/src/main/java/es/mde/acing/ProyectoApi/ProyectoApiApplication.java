package es.mde.acing.ProyectoApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import es.mde.acing.ProyectoApi.negocio.Persona;
import es.mde.acing.ProyectoApi.utils.jackson.JsonBuilder;
import es.mde.acing.ProyectoApi.utils.jackson.ParseadorJackson;
import es.mde.acing.ProyectoLib.utils.ClasePruebaLibreria;



@SpringBootApplication
public class ProyectoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApiApplication.class, args);
		ClasePruebaLibreria.holaLibreria();
		
		String personaStringJson ="{ \"nombre\" : \"Manolo\", \"edad\" : 5 }";
		
		ParseadorJackson.parseadorJsonAObjeto(personaStringJson, new Persona());
		
		JsonBuilder.generadorJson();
	}

}
