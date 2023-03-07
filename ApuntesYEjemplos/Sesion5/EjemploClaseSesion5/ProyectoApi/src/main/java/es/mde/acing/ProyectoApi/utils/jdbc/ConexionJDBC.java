package es.mde.acing.ProyectoApi.utils.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.plaf.ProgressBarUI;

import es.mde.acing.ProyectoApi.negocio.Persona;

public class ConexionJDBC {

	public static Connection conexion(String urlConexion, String usuario, String pass) {
	
		try {
			System.out.println("Conectando BBDD");
			Class.forName("org.h2.Driver");
			return DriverManager.getConnection(urlConexion, usuario, pass);
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static ResultSet ejecutarQuery(String sql, Connection conexion) {

		try {
			return conexion.prepareStatement(sql).executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

	}

	public static List<Persona> cargarListadoPersonas(ResultSet resultadoQuery) {
		List<Persona> listado = new ArrayList<>();
		try {
			while (resultadoQuery.next()) {

				Integer edad = resultadoQuery.getInt("EDAD");
				String nombre = resultadoQuery.getString("NOMBRE");
				Persona persona = new Persona(nombre, edad);

				listado.add(persona);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return listado;
	}
	
	public static void probarBD() {
		// Probando mi base de datos
		Connection conexion = conexion("jdbc:h2:tcp://localhost/~/test", "sa", "");
		String sql = "SELECT * FROM PERSONA";

		List<Persona> listado = cargarListadoPersonas(ejecutarQuery(sql, conexion));
		try {
			conexion.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		listado.forEach(System.out::println);
		
	}

}
