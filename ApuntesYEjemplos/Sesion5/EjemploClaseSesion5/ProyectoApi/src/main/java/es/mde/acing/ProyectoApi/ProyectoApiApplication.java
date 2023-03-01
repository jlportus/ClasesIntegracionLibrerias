package es.mde.acing.ProyectoApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import es.mde.acing.ProyectoLib.utils.ClasePruebaLibreria;



@SpringBootApplication
public class ProyectoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApiApplication.class, args);
		ClasePruebaLibreria.holaLibreria();
		
		
	}

}
