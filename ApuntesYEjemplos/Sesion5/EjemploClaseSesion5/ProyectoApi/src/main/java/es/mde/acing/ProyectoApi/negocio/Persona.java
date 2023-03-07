package es.mde.acing.ProyectoApi.negocio;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


//@JsonPropertyOrder({ "edad", "nombre" })
public class Persona {
	
	
	//@JsonProperty("nombredepila")
	String nombre;
//	@JsonIgnore
	int edad;

//	Date fechaNacimiento;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

//	public Date getFechaNacimiento() {
//		return fechaNacimiento;
//	}
//
//	public void setFechaNacimiento(Date fechaNacimiento) {
//		this.fechaNacimiento = fechaNacimiento;
//	}

	public Persona() {

	}

	public Persona(String nombre, int edad) {
		super();
		this.nombre = nombre;
		this.edad = edad;
//		this.fechaNacimiento = fechaNacimiento;
	}

	@Override
	public String toString() {
		return "Mi Objeto Persona se llama " + nombre 
				+ " y tiene " + edad 
//				+ ", fechaNacimiento=" + fechaNacimiento 
				+ " años.";
	}

	
	
}
