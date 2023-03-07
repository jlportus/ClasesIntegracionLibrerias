# Librerías Utiles de Backend

Notas: https://web.institutomilitar.com/librerias.html

---

### INDICE

- [Librerías Utiles de Backend](#librerías-utiles-de-backend)
    - [INDICE](#indice)
  - [Jackson](#jackson)
    - [Metodos clave de Jackson I-II](#metodos-clave-de-jackson-i-ii)
    - [Metodos clave de Jackson II-II](#metodos-clave-de-jackson-ii-ii)
    - [Metodos clave de Jackson Listados](#metodos-clave-de-jackson-listados)
    - [Fechas](#fechas)
  - [JDBC](#jdbc)
    - [Ejemplo de conexion](#ejemplo-de-conexion)
  - [APACHE HTTP](#apache-http)
- [Fin de la presentacion](#fin-de-la-presentacion)

---

## Jackson

[Jackson Baeldung Tutorial](https://www.baeldung.com/jackson)
- https://www.baeldung.com/jackson-object-mapper-tutorial
- [escribir](https://www.baeldung.com/jackson-object-mapper-tutorial#1-java-object-to-json) y [leer](https://www.baeldung.com/jackson-object-mapper-tutorial#2-json-to-java-object) json
- https://www.baeldung.com/jackson-json-node-tree-model
- https://www.baeldung.com/jackson-jsonformat
- https://www.baeldung.com/jackson-serialize-dates

[Jenkov Tutorial](https://jenkov.com/tutorials/java-json/index.html)
- intro + instalacion
- Object mapper
- json node
- jsonGenerator
- annotations

---

### Metodos clave de Jackson I-II

```
// Clase que permite acceder a los metodos
ObjectMapper objectMapper = new ObjectMapper(); 

// Lee un string en json 
objectMapper.readTree(json);

// Convierte jsonString en objeto
objectMapper.readValue(jsonString, claseObjetivo.class);

//Convierte Objeto en jsonString
objectMapper.writeValueAsString(objeto):
```

---

### Metodos clave de Jackson II-II

```
//Creo un nodo json vacio
JsonNode nodoJson = objectMapper.createObjectNode();

// Agregar clave:valor
((ObjectNode) nodoJson).put("Clave","valor"); 

//Creo un array json
ArrayNode arrayJson = objectMapper.createArrayNode();

//Agrego un nodo al array	
arrayJson.add(nodoJson);
```

---

### Metodos clave de Jackson Listados

```
//Leer listado desde un array
List<Car> listCar = objectMapper.readValue(
  jsonCarArray, new TypeReference<List<Car>>() {}
);

// TypeReference<List<T>>(){} 
//    --> Clase de Jackson que obtiene los tipos de otra clase 
        (un listado por ejemplo)
//    tambien vale para un Map<String,Object>
```

---

### Fechas

Introduccion a fechas

https://www.arteco-consulting.com/post/introduccion-a-java-time

> Recomendado --> Usar Instant + formatter

```
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
private Instant createdDate;

objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
```
https://stackoverflow.com/a/45674593

---

Ejercicio:

- Escribir json a partir de un objeto Java
- leer json y convertir en objeto java

- Modificar parseo con anotaciones

- crear un nodo a partir de un objeto e incluir campos (clave valor y array)

- Trabajar con fechas
  
---

## JDBC

https://www.baeldung.com/java-jdbc

https://www.marcobehler.com/guides/java-databases

---

### Ejemplo de conexion

1. incluir dependencia de bbdd h2
2. Arrancar BBDD (H2-Local)
```
$HOME\.gradle\caches\modules-2\files-2.1\com.h2database\h2\1.4.200\f7533fe7cb8e99c87a43d325a77b4b678ad9031a\h2-1.4.200.jar"
```
1. Crear una bbdd h2
2. Crear una tabla persona y cargar datos

---

3. Conectar con cliente web
```
jdbc:{driver}:urlBD //:user:pass

jdbc:h2:tcp://localhost/~/test
user:sa
pass:
```

> Crear un metodo como el de la guia y probarlo

Notas:
Es necesario incluir la libreria de h2 a mano en el classpath

---

## APACHE HTTP

https://en.wikipedia.org/wiki/Jakarta_RESTful_Web_Services

https://www.tutorialspoint.com/apache_httpclient/index.htm
https://mkyong.com/webservices/jax-rs/restful-java-client-with-apache-httpclient/

---

# Fin de la presentacion 
<a href="./index.html#/6">Ir al indice de Presentaciones</a>

<a href="./sesion10.html">Ir a la Sesion 10</a>

---
