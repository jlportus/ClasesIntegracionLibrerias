package es.mde.acing.ProyectoApi;

import java.sql.*;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.StaticApplicationContext;

import es.mde.acing.ProyectoApi.negocio.Persona;
import es.mde.acing.ProyectoApi.utils.jackson.JsonBuilder;
import es.mde.acing.ProyectoApi.utils.jackson.JsonLists;
import es.mde.acing.ProyectoApi.utils.jackson.ParseadorJackson;
import es.mde.acing.ProyectoApi.utils.jdbc.ConexionJDBC;
import es.mde.acing.ProyectoLib.utils.ClasePruebaLibreria;

@SpringBootApplication
public class ProyectoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApiApplication.class, args);
		ClasePruebaLibreria.holaLibreria();

//		String personaStringJson ="{ \"nombre\" : \"Manolo\", \"edad\" : 5 }";
//		
//		ParseadorJackson.parseadorJsonAObjeto(personaStringJson, new Persona());
//		
//		JsonBuilder.generadorJson();
//		
//		JsonLists.generandoListados();

		// Probando mi base de datos
		ConexionJDBC.probarBD();
	}

}
