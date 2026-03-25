# Ejercicio final: Calculadora modular con API + LIB + WAR

@2026

---

## Instrucciones

- Esta prueba es individual, aunque la solución debe integrarse con librerías de otros compañeros.
- La duración total es de 2 sesiones de 50 minutos.
- Debes partir del [repositorio base](https://git.institutomilitar.com/jlportus/libreriasproyectofinal) mediante una copia privada del proyecto (`fork`) en `GitLab`.
- La API se trabajará en tu copia privada en `GitLab` y consumirá librerías publicadas en `GitHub`.
- Tu librería propia debe publicarse en `GitHub` para poder ser consumida desde la API mediante `JitPack`.
- Debes consumir, además, al menos los proyectos de compañeros como paquetes publicados.
- La entrega debe incluir evidencia visual, enlaces a repositorios y una explicación mínima del flujo de integración.

## Propósito

El objetivo de esta prueba final es comprobar que eres capaz de integrar correctamente un proyecto API con una librería externa, publicar y consumir artefactos desde repositorios remotos, empaquetar una aplicación basada en `Spring Boot` como WAR y añadir un frontal sencillo que permita invocar la lógica de negocio, ejecutando todo en un servidor web Tomcat.

Al terminar, deberás demostrar que entiendes el flujo completo de trabajo visto en [Guía de integración API + LIB](../ApuntesYEjemplos/Sesion5/GuiaIntegracionProyectoAPI-LIB.md) y en [la Sesión 6](../ApuntesYEjemplos/Sesion6/Sesion6.md): desarrollo de la librería, publicación, consumo desde la API, empaquetado WAR y despliegue local. 

Deberas trabajar con maven en local, con jitpack para resolver la librería propia y con GitHub Packages para consumir las librerías de compañeros. Tambien deberas demostrar que sabes publicar en GitHub y que sabes documentar tu proyecto con un README completo y con javadoc.

---

## Enunciado

Vas a construir una calculadora modular en Java formada por tres piezas:

1. Una **librería** con la lógica de negocio de la calculadora.
2. Una **API** basada en `Spring Boot` que consuma la librería propia y, además, librerías de compañeros publicadas como paquetes.
3. Un **frontal web** sencillo, integrado en el WAR, que permita seleccionar la operación y enviar dos operandos al backend.

La API debe trabajar con dos remotos:

- **`GitLab` privado**: tu copia privada del repositorio base, donde vivirán la API y el una guia para construir el war final.
- **`GitHub`**: el repositorio público de la API, con el mismo codigo que en el repositorio privado (dos remotos).
- **`GitHub`**: el repositorio público de la librería, desde el que la API la consumirá con `JitPack`.

El backend debe mostrar por consola el resultado de cada operación para que pueda verificarse en la captura final.

---

## Reparto de métodos

Cada alumno desarrollará un método distinto dentro de la librería. El profesor podrá redistribuir los nombres si el grupo no es de 8 personas, pero la idea es mantener 8 operaciones claramente separadas.

| Alumno | Método principal | Función esperada |
|---|---|---|
| Alumno 1 | `sumar` | Suma de dos números |
| Alumno 2 | `restar` | Resta de dos números |
| Alumno 3 | `multiplicar` | Multiplicación de dos números |
| Alumno 4 | `dividir` | División de dos números con control de división por cero |
| Alumno 5 | `modulo` | Resto de una división |
| Alumno 6 | `potencia` | Potencia entre base y exponente |
| Alumno 7 | `maximo` | Devuelve el mayor de dos números |
| Alumno 8 | `minimo` | Devuelve el menor de dos números |

Todos los métodos deben ser consumidos desde la API, y la interfaz debe permitir elegir la operación en tiempo de ejecución.

---

## Requisitos técnicos obligatorios

- La librería debe ser Java puro, sin dependencias innecesarias de Spring.
- La API debe ser `Spring Boot` 3.5 y Maven.
- La librería propia debe poder consumirse desde la API mediante JitPack.
- Debes consumir al menos 2 librerías de compañeros como dependencias publicadas.
- La aplicación final debe empaquetarse como WAR.
- El frontend debe estar integrado dentro del WAR y servirse como recurso estático.
- El frontal debe permitir elegir operación, introducir 2 operandos y lanzar el cálculo.
- La API debe registrar el resultado por consola.
- El proyecto debe documentarse en el README con enlaces y evidencias.

---

## Plan de trabajo por sesiones

### Parte 1

1. Hacer la copia privada (`fork`) del repositorio base en `GitLab`.
2. Revisar la estructura inicial del proyecto y separar claramente API y LIB.
3. Crear o completar la librería con el método asignado.
4. Publicar la librería en GitHub para que pueda ser resuelta por JitPack.
5. Consumir la librería propia desde la API y comprobar una primera operación funcionando.
6. Publicar la libreria en GitHub como paquete para que pueda ser consumida por otros proyectos.

### Parte 2

1. Consumir las librerías de compañeros como paquetes publicados.
2. Integrar el frontal HTML + TypeScript dentro del WAR.
3. Empaquetar y ejecutar la aplicación en local.
4. Instalar un tomcat local y desplegar el WAR para comprobar que funciona sin necesidad de `mvn spring-boot:run`.
5. Verificar que los logs del tomcat muestran el resultado de la operación.
6. Completar el README con capturas, enlaces y explicación breve de la solución.

---

## Entregables

Tu entrega final debe incluir, como mínimo:

- La copia privada en `GitLab` con la API completa.
- El repositorio público de GitHub con tu librería.
- La API consumiendo tu librería mediante JitPack.
- La API consumiendo al menos las librerías de compañeros.
- LAs instrucciones para generar el WAR.
- Un frontal web funcional que permita elegir la operación y enviar los operandos.
- Un README con evidencia visual y enlaces a los repositorios.

> Tanto los metodos de la libreria como la API deben estar documentados con JavaDoc para facilitar su consumo.

En el README debes incluir:

- Un pantallazo donde se vea el frontal en el navegador.
- Un pantallazo donde se vea la API ejecutándose en el tomcat (logs del tomcat).
- La consola del backend mostrando el resultado de la operación (logs del tomcat).
- Enlaces al repositorio de la API y al repositorio de la librería.
- Una breve explicación de qué librerías de compañeros has consumido.

**El entregable es un merge request (pull request) al repositorio de GitLab del que hiciste el fork, con el código completo de la API y el README documentado.**

> Nota: puede basarse en proyectos anteriores, como el del ejemplo de sesiones anteriores, pero debe cumplir con los requisitos técnicos y de integración descritos. No se aceptarán soluciones que no demuestren el flujo completo de trabajo.

---

## Boceto del frontal

No entregues una interfaz completa con todo el código resuelto. Debes plantear un boceto funcional, suficiente para demostrar que sabes conectar el frontend con el backend local.

### Estructura HTML orientativa

```html
<!-- Boceto orientativo -->
<section>
	<h1>Calculadora</h1>

	<select id="operacion">
		<option value="sumar">Suma</option>
		<option value="restar">Resta</option>
		<option value="multiplicar">Multiplicación</option>
		<option value="dividir">División</option>
		<option value="modulo">Módulo</option>
		<option value="potencia">Potencia</option>
		<option value="maximo">Máximo</option>
		<option value="minimo">Mínimo</option>
	</select>

	<input id="operandoA" type="number" placeholder="Operando 1" />
	<input id="operandoB" type="number" placeholder="Operando 2" />

	<button id="btnCalcular">Calcular</button>
	<p id="resultado"></p>
</section>
```

### Lógica TypeScript orientativa

```ts
// Pseudocódigo, no solución completa
// 1. Obtener referencias al select, los dos inputs, el botón y el contenedor de resultado.
// 2. Escuchar el evento de clic en el botón.
// 3. Leer la operación seleccionada y los dos operandos.
// 4. Validar que ambos operandos sean números válidos.
// 5. Construir la petición contra la API local, por ejemplo:
//    http://localhost:8080/api/calculadora/calcular
// 6. Enviar la operación y los operandos al backend.
// 7. Pintar la respuesta en pantalla.
// 8. Mostrar errores de validación o de red.
```

El frontal puede ser una maqueta sencilla, pero debe demostrar el flujo completo de interacción con la API local.

---

## Criterios de validación

Se considerará superada la prueba cuando se pueda comprobar lo siguiente:

- La librería propia compila y puede consumirse desde la API mediante JitPack.
- La API compila, arranca y utiliza correctamente la librería propia.
- La API también consume al menos 2 librerías de compañeros publicadas.
- La aplicación final se empaqueta como WAR.
- La aplicación se puede desplegar en un tomcat local sin necesidad de `mvn spring-boot:run`.
- El frontal permite seleccionar una operación y enviar dos números.
- El backend muestra por consola el resultado de la operación.
- El README contiene capturas y enlaces a los repositorios.

---

## Observaciones finales

- Si la librería usa Java 17, asegúrate de publicar una versión compatible para `JitPack`.
- Si el frontal se construye con `TypeScript`, genera su versión en JS y copia el resultado al directorio estático del proyecto `Spring Boot`.
- Si una operación falla, el frontal debe mostrar un mensaje claro y la consola del backend debe dejar trazabilidad del error.
- La solución debe ser funcional en local, sin depender de pasos manuales no documentados.

