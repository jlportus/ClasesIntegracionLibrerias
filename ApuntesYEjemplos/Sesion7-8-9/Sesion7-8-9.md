# Librerías útiles de backend (Sesión 7-8-9)

Notas: https://web.institutomilitar.com/librerias.html

---

### INDICE

- [Librerías útiles de backend (Sesión 7-8-9)](#librerías-útiles-de-backend-sesión-7-8-9)
    - [INDICE](#indice)
  - [Objetivo didáctico de la sesión](#objetivo-didáctico-de-la-sesión)
  - [Mapa de alineación teoría ↔ ejercicios](#mapa-de-alineación-teoría--ejercicios)
  - [Jackson (bloques 1, 2 y parte de 6)](#jackson-bloques-1-2-y-parte-de-6)
    - [Qué problema resuelve en backend](#qué-problema-resuelve-en-backend)
    - [ObjectMapper: métodos clave](#objectmapper-métodos-clave)
    - [Anotaciones que se usan en el taller](#anotaciones-que-se-usan-en-el-taller)
    - [JsonNode y ArrayNode](#jsonnode-y-arraynode)
    - [Listados con TypeReference](#listados-con-typereference)
    - [Fechas en APIs](#fechas-en-apis)
    - [Errores comunes de alumnos](#errores-comunes-de-alumnos)
  - [Logging (bloque 3)](#logging-bloque-3)
    - [Por qué no usar System.out](#por-qué-no-usar-systemout)
    - [Buenas prácticas mínimas del taller](#buenas-prácticas-mínimas-del-taller)
  - [Validación (bloque 4)](#validación-bloque-4)
    - [Idea clave](#idea-clave)
    - [Anotaciones mínimas para este curso](#anotaciones-mínimas-para-este-curso)
    - [Qué debe observar el alumno en Postman](#qué-debe-observar-el-alumno-en-postman)
  - [JDBC + H2 (bloques 5 y 6)](#jdbc--h2-bloques-5-y-6)
    - [Qué se está aprendiendo realmente](#qué-se-está-aprendiendo-realmente)
    - [Flujo técnico completo del PUT](#flujo-técnico-completo-del-put)
    - [Flujo técnico completo del GET](#flujo-técnico-completo-del-get)
    - [Conexión, schema y datos iniciales](#conexión-schema-y-datos-iniciales)
    - [PreparedStatement y seguridad básica](#preparedstatement-y-seguridad-básica)
  - [JUnit + Mockito (bloque 7)](#junit--mockito-bloque-7)
    - [Objetivo de testing en esta sesión](#objetivo-de-testing-en-esta-sesión)
    - [Qué testear sí o sí](#qué-testear-sí-o-sí)
    - [Qué aporta Mockito aquí](#qué-aporta-mockito-aquí)
  - [Checklist de dominio al cerrar la sesión](#checklist-de-dominio-al-cerrar-la-sesión)
- [Fin de la presentación](#fin-de-la-presentación)

---

## Objetivo didáctico de la sesión

Esta sesión busca que el alumno construya un backend funcional de extremo a extremo y entienda qué librería resuelve cada parte del problema:

- Jackson: contrato JSON de entrada/salida.
- Logging: trazabilidad profesional.
- Validación: control de calidad del input.
- JDBC + H2: persistencia real.
- JUnit + Mockito: confianza en la lógica.

No se profundiza en teoría de Spring; Spring se usa como “infraestructura” para centrar el aprendizaje en librerías transversales.

---

## Mapa de alineación teoría ↔ ejercicios

- Bloque 1: Jackson básico (`writeValueAsString`, flujo entrada).
- Bloque 2: Jackson anotaciones (orden, ocultación, transformación).
- Bloque 3: Logging con SLF4J.
- Bloque 4: Validación con `@Valid` + constraints.
- Bloque 5: Persistencia con JDBC en H2 (`upsert`).
- Bloque 6: Flujo inverso DB -> DTO -> JSON (`GET`).
- Bloque 7: Unit tests con JUnit y Mockito.

Este orden no es casual: cada bloque añade una capa sin romper la anterior.

---

## Jackson (bloques 1, 2 y parte de 6)

[Jackson Baeldung Tutorial](https://www.baeldung.com/jackson)
- https://www.baeldung.com/jackson-object-mapper-tutorial
- https://www.baeldung.com/jackson-json-node-tree-model
- https://www.baeldung.com/jackson-jsonformat
- https://www.baeldung.com/jackson-serialize-dates

[Jackson Databind](https://github.com/FasterXML/jackson-databind)

### Qué problema resuelve en backend

En una API REST, casi todo entra y sale como JSON. Jackson es la librería que convierte:

- JSON -> objeto Java (deserialización).
- objeto Java -> JSON (serialización).

El taller lo muestra en ambos sentidos:

- `PUT`: recibimos JSON y lo inspeccionamos.
- `GET`: devolvemos JSON transformado desde datos de DB.

### ObjectMapper: métodos clave

```java
ObjectMapper objectMapper = new ObjectMapper();

JsonNode nodo = objectMapper.readTree(json);
MiClase obj = objectMapper.readValue(jsonString, MiClase.class);
String out = objectMapper.writeValueAsString(objeto);
```

Relación con el ejercicio:

- Bloque 1: `writeValueAsString(dto)` para ver exactamente el payload que viaja por capas.
- Bloque 6: serialización implícita de `ProductoResponseDto` cuando el controller responde.

### Anotaciones que se usan en el taller

- `@JsonPropertyOrder`: controlar orden de campos para trazas más legibles.
- `@JsonIgnore`: ocultar campos al serializar (ejemplo: `requiereReceta` en logs).

Idea clave:
las anotaciones de Jackson afectan el contrato JSON, no solo “estética”.

### JsonNode y ArrayNode

```java
JsonNode nodoJson = objectMapper.createObjectNode();
((ObjectNode) nodoJson).put("clave", "valor");

ArrayNode arrayJson = objectMapper.createArrayNode();
arrayJson.add(nodoJson);
```

Uso didáctico:
sirve para construir JSON dinámico cuando no existe un DTO cerrado.

### Listados con TypeReference

```java
List<Car> list = objectMapper.readValue(
  jsonCarArray, new TypeReference<List<Car>>() {}
);
```

Sin `TypeReference`, Jackson pierde información de genéricos en tiempo de ejecución.

### Fechas en APIs

Recomendación práctica del curso: usar `Instant` y formato explícito.

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
private Instant createdDate;

objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
```

Objetivo:
evitar inconsistencias de zona horaria y formatos ambiguos.

### Errores comunes de alumnos

- Creer que Jackson solo se usa “dentro de Spring” y no entender el `ObjectMapper`.
- Romper el contrato de salida al usar `@JsonIgnore` sin pensar en consumidores.
- No distinguir DTO de entrada y DTO de salida.

---

## Logging (bloque 3)

[SLF4J](http://www.slf4j.org/manual.html)
[Logback](https://logback.qos.ch/manual/)

### Por qué no usar System.out

- No tiene niveles (`INFO`, `DEBUG`, `ERROR`).
- Es difícil de filtrar y estandarizar.
- En proyectos reales rompe observabilidad.

### Buenas prácticas mínimas del taller

- Logger por clase.
- Mensajes parametrizados con `{}`.
- Loguear contexto útil (`codigo`, acción, resultado), no ruido.

Ejemplo:

```java
log.info("Entrada PUT codigo={} payload={}", codigo, json);
log.info("Persistido producto codigo={}", codigo);
```

---

## Validación (bloque 4)

[Jakarta Bean Validation](https://jakarta.ee/specifications/bean-validation/3.0/)
[Hibernate Validator](https://docs.jboss.org/hibernate/stable/validator/reference/en-US/html_single/)

### Idea clave

La validación protege el sistema en el borde de entrada:
si el request es inválido, se rechaza antes de llegar a la lógica de negocio.

### Anotaciones mínimas para este curso

- `@NotBlank` para texto obligatorio.
- `@Min(0)` para evitar negativos en stock/precios/IVA.
- `@Valid` en el controller para activar el proceso.

### Qué debe observar el alumno en Postman

- Request válido -> avanza y se procesa.
- Request inválido -> HTTP 400 automáticamente.

Mensaje didáctico:
el contrato de entrada no es opcional.

---

## JDBC + H2 (bloques 5 y 6)

[JDBC Baeldung](https://www.baeldung.com/java-jdbc)
[H2 Tutorial](https://www.h2database.com/html/tutorial.html)

### Qué se está aprendiendo realmente

Aunque se usa Spring Boot, el repositorio se implementa “a mano” con JDBC para entender:

- cómo abrir conexión,
- cómo preparar consultas,
- cómo mapear `ResultSet` a DTO.

### Flujo técnico completo del PUT

1. Controller recibe JSON.
2. Service loguea y orquesta.
3. Repository ejecuta `MERGE` (upsert) en H2.
4. Se confirma por logs y en consola H2.

### Flujo técnico completo del GET

1. Controller pide por código.
2. Repository lee fila desde DB.
3. Service transforma a `ProductoResponseDto`.
4. Se responde JSON con IVA formateado y precio final.

### Conexión, schema y datos iniciales

- `application.properties`: datasource + H2 console.
- `schema.sql`: tabla `productos`.
- `data.sql`: carga inicial para pruebas rápidas.

Esto habilita demos inmediatas sin depender de datos manuales previos.

### PreparedStatement y seguridad básica

Se usa `PreparedStatement` por tres motivos:

- evita inyección SQL básica,
- separa SQL y parámetros,
- mejora legibilidad y mantenibilidad.

---

## JUnit + Mockito (bloque 7)

[JUnit 5](https://junit.org/junit5/docs/current/user-guide/)
[Mockito](https://site.mockito.org/)

### Objetivo de testing en esta sesión

Validar la lógica del service sin depender de infraestructura externa.

### Qué testear sí o sí

- Regla de negocio: `calcularPrecioFinal`.
- Transformación de `obtener(...)`: mapeo, formato IVA, precio final.

### Qué aporta Mockito aquí

- simular `ProductoRepository`,
- controlar respuestas (`when(...).thenReturn(...)`),
- verificar interacciones (`verify(...)`).

Resultado esperado:
tests rápidos, deterministas y enfocados en comportamiento.

---

## Checklist de dominio al cerrar la sesión

El alumno domina la sesión si puede:

- explicar por qué hay DTO de entrada y de salida,
- justificar por qué un log profesional reemplaza `System.out`,
- forzar y detectar un `400` por validación,
- mostrar persistencia real en H2 tras un `PUT`,
- devolver un `GET` transformado desde DB,
- ejecutar `mvn test` y defender qué cubren sus tests.

---

# Fin de la presentación
<a href="..\..\README.md">Ir al indice de Presentaciones</a>

<a href="../Sesion12/Sesion12.md">Ir a la Sesion 12</a>

---
