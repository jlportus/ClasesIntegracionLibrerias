# Taller guiado (3h): Inventario de farmacia con Spring Boot Maven (desde Sesión 4)
**Punto de partida real: proyecto Spring creado con Initializr en la Sesión 4**

<a href="..\..\README.md">Ir al indice de Presentaciones </a>

---

### INDICE

- [Taller guiado (3h): Inventario de farmacia con Spring Boot Maven (desde Sesión 4)](#taller-guiado-3h-inventario-de-farmacia-con-spring-boot-maven-desde-sesión-4)
    - [INDICE](#indice)
  - [Objetivo y dinámica](#objetivo-y-dinámica)
  - [Punto de partida obligatorio (Sesión 4)](#punto-de-partida-obligatorio-sesión-4)
    - [Paso 0 — Crear proyecto base con Spring Initializr (Maven)](#paso-0--crear-proyecto-base-con-spring-initializr-maven)
    - [Paso 1 — Verificar arranque](#paso-1--verificar-arranque)
    - [Paso 2 — Estructura mínima a crear en el proyecto](#paso-2--estructura-mínima-a-crear-en-el-proyecto)
  - [Bloque 1 — Jackson: recibir JSON y serializar](#bloque-1--jackson-recibir-json-y-serializar)
  - [Bloque 2 — Transformaciones: ocultar campos y preparar salida](#bloque-2--transformaciones-ocultar-campos-y-preparar-salida)
  - [Bloque 3 — Logging: pasar de System.out a logger](#bloque-3--logging-pasar-de-systemout-a-logger)
  - [Bloque 4 — Validación: rechazar datos inválidos](#bloque-4--validación-rechazar-datos-inválidos)
    - [Paso previo de dependencia (si falta)](#paso-previo-de-dependencia-si-falta)
  - [Bloque 5 — Persistencia: guardar en H2 con JDBC](#bloque-5--persistencia-guardar-en-h2-con-jdbc)
    - [Paso previo de dependencias (si faltan)](#paso-previo-de-dependencias-si-faltan)
  - [Bloque 6 — Flujo inverso: cargar datos iniciales, leer de DB y devolver](#bloque-6--flujo-inverso-cargar-datos-iniciales-leer-de-db-y-devolver)
  - [Bloque 7 — Lógica de negocio y tests](#bloque-7--lógica-de-negocio-y-tests)
    - [Paso previo de dependencia de tests (si falta)](#paso-previo-de-dependencia-de-tests-si-falta)
  - [Resolución de bloqueos frecuentes (añadido)](#resolución-de-bloqueos-frecuentes-añadido)
  - [Entrega por bloques](#entrega-por-bloques)
- [Fin de la presentación](#fin-de-la-presentación)

Notas:
Este taller ya no asume proyecto entregado. Se construye encima del proyecto Maven Spring de Sesión 4.

---

## Objetivo y dinámica

**Objetivo final**
- Enviar un producto por `PUT` desde Postman.
- Pasar por Controller -> Service -> Repository.
- Guardar en H2.
- Leer por `GET` y devolver JSON transformado.
- Ver trazas en logs.
- Rechazar entradas inválidas.
- Testear lógica con JUnit + Mockito.

**Timing recomendado**
- 0:00-0:20 Arranque desde Sesión 4 (initializer + estructura mínima).
- 0:20-0:45 Bloque 1 Jackson.
- 0:45-1:05 Bloque 2 Transformaciones.
- 1:05-1:20 Bloque 3 Logging.
- 1:20-1:40 Bloque 4 Validación.
- 1:40-2:25 Bloque 5 JDBC + H2.
- 2:25-2:45 Bloque 6 Flujo inverso.
- 2:45-3:00 Bloque 7 Tests.

---

## Punto de partida obligatorio (Sesión 4)

### Paso 0 — Crear proyecto base con Spring Initializr (Maven)

Tareas del alumno:
- Crea un proyecto nuevo en Spring Initializr con `Maven`.
- Configura `Group`, `Artifact`, `Packaging` y versión de Java.
- Marca dependencias iniciales (`Spring Web`, `DevTools`).
- Genera el proyecto y ábrelo en tu IDE.

Crear un proyecto Spring Boot Maven (web) con estos datos:

- `Group`: `com.curso`
- `Artifact`: `farmacia-inventario`
- `Packaging`: `jar`
- `Java`: 17 (o la versión usada en clase)
- Dependencias iniciales: `Spring Web`, `Spring Boot DevTools`

Dependencias que **pueden añadirse ahora o en su bloque correspondiente**:

- Para validación: `spring-boot-starter-validation`
- Para H2/JDBC: `spring-boot-starter-jdbc`, `h2`
- Para tests: `spring-boot-starter-test`, `mockito-core` (opcional si no viene transitiva)

Comando de arranque:

```bash
mvn spring-boot:run
```

### Paso 1 — Verificar arranque

Tareas del alumno:
- Abre una terminal en la raíz del proyecto.
- Ejecuta `mvn spring-boot:run`.
- Comprueba que no hay errores de arranque en consola.
- Verifica que responde en `http://localhost:8080`.

Comprobar en consola que la aplicación arranca en `http://localhost:8080`.

Si no arranca:
- revisar versión de Java,
- revisar `pom.xml`,
- ejecutar `mvn clean test` para validar build.

### Paso 2 — Estructura mínima a crear en el proyecto

Tareas del alumno:
- Crea los paquetes `controller`, `service`, `persistence` y `model`.
- Crea las clases vacías con los nombres indicados.
- Crea también la clase de test en `src/test/java`.
- Confirma que la estructura de carpetas coincide con la guía.

Crear paquetes y clases:

```text
src/main/java/com/curso/farmacia/
  FarmaciaInventarioApplication.java
  controller/ProductoController.java
  service/ProductoService.java
  persistence/ProductoRepository.java
  model/ProductoRequestDto.java
  model/ProductoResponseDto.java

src/main/resources/
  application.properties

src/test/java/com/curso/farmacia/service/
  ProductoServiceTest.java
```

Endpoints objetivo del taller:

- `PUT /api/productos/{codigo}`
- `GET /api/productos/{codigo}`

---

## Bloque 1 — Jackson: recibir JSON y serializar

### Tarea

1. Enviar JSON por `PUT`.
2. Pasar DTO del controller al service.
3. Serializar con Jackson en el service.

### Paso 1 — DTO de entrada

Tareas del alumno:
- Crea el archivo `ProductoRequestDto.java` dentro de `model`.
- Pega el código del DTO exactamente como aparece.
- Guarda el archivo y revisa imports/paquete.
- Comprueba que el proyecto compila.

`model/ProductoRequestDto.java`

```java
package com.curso.farmacia.model;

public class ProductoRequestDto {
  public String nombre;
  public double precioBase;
  public double tipoIva; // 0.10 = 10%
  public int stock;
  public boolean requiereReceta;
}
```

### Paso 2 — Service básico con Jackson

Tareas del alumno:
- Crea el archivo `ProductoService.java` en `service`.
- Pega el código con `ObjectMapper` y método `registrar`.
- Verifica que la clase tiene `@Service`.
- Comprueba compilación antes de seguir.

`service/ProductoService.java`

```java
package com.curso.farmacia.service;

import com.curso.farmacia.model.ProductoRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
  private final ObjectMapper mapper = new ObjectMapper();

  public void registrar(String codigo, ProductoRequestDto dto) throws Exception {
    String json = mapper.writeValueAsString(dto);
    System.out.println("DEBUG Jackson entrada codigo=" + codigo + " payload=" + json);
  }
}
```

### Paso 3 — Controller con PUT

Tareas del alumno:
- Crea el archivo `ProductoController.java` en `controller`.
- Pega el endpoint `PUT /api/productos/{codigo}`.
- Inyecta `ProductoService` por constructor.
- Comprueba que no faltan imports de Spring MVC.

`controller/ProductoController.java`

```java
package com.curso.farmacia.controller;

import com.curso.farmacia.model.ProductoRequestDto;
import com.curso.farmacia.service.ProductoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

  private final ProductoService service;

  public ProductoController(ProductoService service) {
    this.service = service;
  }

  @PutMapping("/{codigo}")
  public void put(@PathVariable String codigo, @RequestBody ProductoRequestDto dto) throws Exception {
    service.registrar(codigo, dto);
  }
}
```

### Paso 4 — Probar en Postman

Tareas del alumno:
- Abre Postman y crea una petición `PUT`.
- Usa la URL del ejercicio y pega el JSON de ejemplo.
- Envía la petición con la app arrancada.
- Comprueba en consola que se imprime el payload serializado.

`PUT http://localhost:8080/api/productos/IBU600`

```json
{
  "nombre": "Ibuprofeno 600mg",
  "precioBase": 3.50,
  "tipoIva": 0.10,
  "stock": 25,
  "requiereReceta": false
}
```

**Entregable Bloque 1**
- PUT responde sin error.
- Se imprime payload serializado.

---

## Bloque 2 — Transformaciones: ocultar campos y preparar salida

### Tarea

1. Ordenar campos JSON.
2. Ocultar un campo al serializar.
3. Crear DTO de salida para `GET`.

### Paso 1 — Anotaciones Jackson en request DTO

Tareas del alumno:
- Abre `ProductoRequestDto.java`.
- Añade `@JsonPropertyOrder` y `@JsonIgnore` como en el ejemplo.
- Guarda y recompila.
- Repite el `PUT` en Postman y observa el cambio en salida serializada.

```java
package com.curso.farmacia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "nombre", "precioBase", "tipoIva", "stock", "requiereReceta" })
public class ProductoRequestDto {
  public String nombre;
  public double precioBase;
  public double tipoIva;
  public int stock;

  @JsonIgnore
  public boolean requiereReceta;
}
```

### Paso 2 — Crear DTO de respuesta

Tareas del alumno:
- Crea el archivo `ProductoResponseDto.java` en `model`.
- Pega el código con los campos de salida.
- Guarda el archivo.
- Verifica que compila y que queda listo para usar en `GET`.

`model/ProductoResponseDto.java`

```java
package com.curso.farmacia.model;

public class ProductoResponseDto {
  public String codigo;
  public String nombre;
  public double precioBase;
  public String iva;
  public double precioFinal;
  public int stock;
}
```

**Entregable Bloque 2**
- Se ven cambios de serialización en logs.
- DTO de salida disponible para bloques 6 y 7.

---

## Bloque 3 — Logging: pasar de System.out a logger

### Tarea

1. Sustituir `System.out`.
2. Usar logger parametrizado.

### Paso 1 — Migrar en service

Tareas del alumno:
- Abre `ProductoService.java`.
- Sustituye `System.out.println` por `Logger`.
- Usa logging parametrizado con `{}`.
- Ejecuta un `PUT` y confirma que el log sale con nivel `INFO`.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductoService {
  private static final Logger log = LoggerFactory.getLogger(ProductoService.class);

  public void registrar(String codigo, ProductoRequestDto dto) throws Exception {
    String json = mapper.writeValueAsString(dto);
    log.info("Entrada PUT codigo={} payload={}", codigo, json);
  }
}
```

**Entregable Bloque 3**
- No queda `System.out.println`.
- Se ve `INFO` por consola.

---

## Bloque 4 — Validación: rechazar datos inválidos

### Paso previo de dependencia (si falta)

Tareas del alumno:
- Abre `pom.xml`.
- Añade la dependencia de validación si no existe.
- Ejecuta `mvn clean compile`.
- Corrige cualquier error de dependencias antes de continuar.

En `pom.xml`, añadir:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### Tarea

1. Anotar DTO con validaciones.
2. Activar `@Valid` en controller.
3. Probar error `400`.

### Paso 1 — Añadir constraints

Tareas del alumno:
- Abre `ProductoRequestDto.java`.
- Añade anotaciones `@NotBlank` y `@Min` en los campos.
- Revisa imports `jakarta.validation`.
- Guarda y compila para validar que no hay errores.

```java
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ProductoRequestDto {
  @NotBlank
  public String nombre;

  @Min(0)
  public double precioBase;

  @Min(0)
  public double tipoIva;

  @Min(0)
  public int stock;

  public boolean requiereReceta;
}
```

### Paso 2 — Activar validación en PUT

Tareas del alumno:
- Abre `ProductoController.java`.
- Añade `@Valid` al `@RequestBody` del método `put`.
- Importa `jakarta.validation.Valid`.
- Ejecuta la app y deja listo Postman para prueba negativa.

```java
import jakarta.validation.Valid;

@PutMapping("/{codigo}")
public void put(@PathVariable String codigo, @Valid @RequestBody ProductoRequestDto dto) throws Exception {
  service.registrar(codigo, dto);
}
```

### Paso 3 — Enviar request inválido

Tareas del alumno:
- En Postman, reutiliza el `PUT` del bloque 1.
- Pega el JSON inválido del ejemplo.
- Envía la petición.
- Comprueba que la respuesta HTTP es `400`.

```json
{
  "nombre": "",
  "precioBase": -1,
  "tipoIva": 0.10,
  "stock": -5,
  "requiereReceta": false
}
```

**Entregable Bloque 4**
- Requests inválidos devuelven `400`.
- Requests válidos continúan al service.

---

## Bloque 5 — Persistencia: guardar en H2 con JDBC

### Paso previo de dependencias (si faltan)

Tareas del alumno:
- Abre `pom.xml`.
- Añade `spring-boot-starter-jdbc` y `h2` si faltan.
- Ejecuta `mvn clean compile`.
- Verifica que el proyecto sigue arrancando.

En `pom.xml`, añadir:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
```

### Tarea

1. Configurar H2 en memoria.
2. Crear tabla inicial.
3. Implementar repository JDBC (upsert + find).
4. Conectar service con repository.

### Paso 1 — Configurar `application.properties`

Tareas del alumno:
- Abre o crea `src/main/resources/application.properties`.
- Pega la configuración de H2 y datasource.
- Guarda los cambios.
- Reinicia la aplicación para aplicar configuración.

```properties
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.datasource.url=jdbc:h2:mem:farmacia;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

### Paso 2 — Crear `schema.sql`

Tareas del alumno:
- Crea el archivo `src/main/resources/schema.sql`.
- Pega el SQL de creación de tabla.
- Reinicia la aplicación.
- Comprueba en `h2-console` que la tabla `productos` existe.

`src/main/resources/schema.sql`

```sql
CREATE TABLE IF NOT EXISTS productos (
  codigo VARCHAR(40) PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  precio_base DOUBLE NOT NULL,
  tipo_iva DOUBLE NOT NULL,
  stock INT NOT NULL,
  requiere_receta BOOLEAN NOT NULL
);
```

### Paso 3 — Implementar repository

Tareas del alumno:
- Crea `ProductoRepository.java` en `persistence`.
- Pega el código con métodos `upsert` y `findByCodigo`.
- Revisa imports de `DataSource` y `PreparedStatement`.
- Compila y confirma que no hay errores.

`persistence/ProductoRepository.java`

```java
package com.curso.farmacia.persistence;

import com.curso.farmacia.model.ProductoRequestDto;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;

@Repository
public class ProductoRepository {

  private final DataSource ds;

  public ProductoRepository(DataSource ds) {
    this.ds = ds;
  }

  public void upsert(String codigo, ProductoRequestDto dto) throws Exception {
    try (var c = ds.getConnection();
         PreparedStatement ps = c.prepareStatement("""
           MERGE INTO productos (codigo, nombre, precio_base, tipo_iva, stock, requiere_receta)
           KEY (codigo)
           VALUES (?, ?, ?, ?, ?, ?)
         """)) {
      ps.setString(1, codigo);
      ps.setString(2, dto.nombre);
      ps.setDouble(3, dto.precioBase);
      ps.setDouble(4, dto.tipoIva);
      ps.setInt(5, dto.stock);
      ps.setBoolean(6, dto.requiereReceta);
      ps.executeUpdate();
    }
  }

  public ProductoRequestDto findByCodigo(String codigo) throws Exception {
    try (var c = ds.getConnection();
         PreparedStatement ps = c.prepareStatement("""
           SELECT nombre, precio_base, tipo_iva, stock, requiere_receta
           FROM productos
           WHERE codigo = ?
         """)) {
      ps.setString(1, codigo);
      try (var rs = ps.executeQuery()) {
        if (!rs.next()) return null;
        ProductoRequestDto dto = new ProductoRequestDto();
        dto.nombre = rs.getString("nombre");
        dto.precioBase = rs.getDouble("precio_base");
        dto.tipoIva = rs.getDouble("tipo_iva");
        dto.stock = rs.getInt("stock");
        dto.requiereReceta = rs.getBoolean("requiere_receta");
        return dto;
      }
    }
  }
}
```

### Paso 4 — Inyectar repository en service

Tareas del alumno:
- Abre `ProductoService.java`.
- Añade el campo `repo` y constructor con inyección.
- Llama a `repo.upsert(codigo, dto)` dentro de `registrar`.
- Ejecuta `PUT` y comprueba en H2 Console que persiste.

```java
import com.curso.farmacia.persistence.ProductoRepository;

public class ProductoService {
  private final ProductoRepository repo;

  public ProductoService(ProductoRepository repo) {
    this.repo = repo;
  }

  public void registrar(String codigo, ProductoRequestDto dto) throws Exception {
    String json = mapper.writeValueAsString(dto);
    log.info("Entrada PUT codigo={} payload={}", codigo, json);
    repo.upsert(codigo, dto);
    log.info("Persistido producto codigo={}", codigo);
  }
}
```

**Entregable Bloque 5**
- `PUT` inserta/actualiza en H2.
- Se comprueba en `http://localhost:8080/h2-console`.

---

## Bloque 6 — Flujo inverso: cargar datos iniciales, leer de DB y devolver

### Tarea

1. Cargar `data.sql`.
2. Implementar método `obtener`.
3. Exponer endpoint `GET`.

### Paso 1 — Crear `data.sql`

Tareas del alumno:
- Crea el archivo `src/main/resources/data.sql`.
- Pega los `INSERT` de ejemplo.
- Reinicia la aplicación.
- Verifica en H2 Console que los datos se cargaron al arrancar.

```sql
INSERT INTO productos (codigo, nombre, precio_base, tipo_iva, stock, requiere_receta)
VALUES ('PARA1G', 'Paracetamol 1g', 2.10, 0.10, 40, false);

INSERT INTO productos (codigo, nombre, precio_base, tipo_iva, stock, requiere_receta)
VALUES ('AMOX500', 'Amoxicilina 500mg', 5.80, 0.10, 10, true);
```

### Paso 2 — Añadir método `obtener` en service

Tareas del alumno:
- Abre `ProductoService.java`.
- Crea el método `obtener(String codigo)`.
- Mapea `ProductoRequestDto` a `ProductoResponseDto` y calcula salida.
- Guarda y compila.

```java
import com.curso.farmacia.model.ProductoResponseDto;

public ProductoResponseDto obtener(String codigo) throws Exception {
  var dto = repo.findByCodigo(codigo);
  if (dto == null) return null;

  log.info("Leido de DB codigo={} nombre={} base={} iva={}", codigo, dto.nombre, dto.precioBase, dto.tipoIva);

  ProductoResponseDto out = new ProductoResponseDto();
  out.codigo = codigo;
  out.nombre = dto.nombre;
  out.precioBase = dto.precioBase;
  out.iva = (int)Math.round(dto.tipoIva * 100) + "%";
  out.precioFinal = dto.precioBase * (1.0 + dto.tipoIva);
  out.stock = dto.stock;

  return out;
}
```

### Paso 3 — Añadir GET en controller

Tareas del alumno:
- Abre `ProductoController.java`.
- Añade el endpoint `GET /api/productos/{codigo}`.
- Devuelve `404` cuando no exista producto.
- Devuelve `200` con body cuando exista.

```java
import com.curso.farmacia.model.ProductoResponseDto;
import org.springframework.http.ResponseEntity;

@GetMapping("/{codigo}")
public ResponseEntity<ProductoResponseDto> get(@PathVariable String codigo) throws Exception {
  var out = service.obtener(codigo);
  if (out == null) return ResponseEntity.notFound().build();
  return ResponseEntity.ok(out);
}
```

### Paso 4 — Probar en Postman

Tareas del alumno:
- Crea una petición `GET` en Postman.
- Usa la URL del ejemplo con un código existente.
- Envía y revisa el JSON de salida.
- Comprueba que `iva` y `precioFinal` están transformados.

`GET http://localhost:8080/api/productos/PARA1G`

Esperado:

```json
{
  "codigo": "PARA1G",
  "nombre": "Paracetamol 1g",
  "precioBase": 2.1,
  "iva": "10%",
  "precioFinal": 2.31,
  "stock": 40
}
```

**Entregable Bloque 6**
- GET devuelve datos desde DB con transformación.

---

## Bloque 7 — Lógica de negocio y tests

### Paso previo de dependencia de tests (si falta)

Tareas del alumno:
- Abre `pom.xml`.
- Verifica dependencia `spring-boot-starter-test`.
- Añade `mockito-core` solo si tu proyecto no lo trae.
- Ejecuta `mvn -q test -DskipTests` para validar configuración.

En `pom.xml`, confirmar:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

Si Mockito no está disponible en vuestro proyecto, añadir:

```xml
<dependency>
  <groupId>org.mockito</groupId>
  <artifactId>mockito-core</artifactId>
  <scope>test</scope>
</dependency>
```

### Tarea

1. Extraer regla de cálculo de precio final.
2. Crear tests unitarios del service.
3. Ejecutar `mvn test`.

### Paso 1 — Extraer método de negocio

Tareas del alumno:
- Abre `ProductoService.java`.
- Crea el método `calcularPrecioFinal`.
- Reemplaza el cálculo inline por una llamada al método.
- Asegúrate de que el método sea testeable (no privado).

```java
double calcularPrecioFinal(double precioBase, double tipoIva) {
  return precioBase * (1.0 + tipoIva);
}
```

Usar en `obtener(...)`:

```java
out.precioFinal = calcularPrecioFinal(dto.precioBase, dto.tipoIva);
```

### Paso 2 — Crear test unitario

Tareas del alumno:
- Crea `ProductoServiceTest.java` en `src/test/java`.
- Pega los dos tests del ejemplo.
- Revisa imports de JUnit y Mockito.
- Ejecuta compilación de tests.

`src/test/java/com/curso/farmacia/service/ProductoServiceTest.java`

```java
package com.curso.farmacia.service;

import com.curso.farmacia.model.ProductoRequestDto;
import com.curso.farmacia.persistence.ProductoRepository;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductoServiceTest {

  @Test
  void calcularPrecioFinal_aplicaIva() {
    ProductoRepository repo = mock(ProductoRepository.class);
    ProductoService service = new ProductoService(repo);

    double total = service.calcularPrecioFinal(100.0, 0.10);
    assertEquals(110.0, total, 0.0001);
  }

  @Test
  void obtener_devuelveDtoTransformado() throws Exception {
    ProductoRepository repo = mock(ProductoRepository.class);
    ProductoService service = new ProductoService(repo);

    ProductoRequestDto dto = new ProductoRequestDto();
    dto.nombre = "Ibuprofeno 600mg";
    dto.precioBase = 3.50;
    dto.tipoIva = 0.10;
    dto.stock = 25;
    dto.requiereReceta = false;

    when(repo.findByCodigo("IBU600")).thenReturn(dto);

    var out = service.obtener("IBU600");
    assertNotNull(out);
    assertEquals("IBU600", out.codigo);
    assertEquals("Ibuprofeno 600mg", out.nombre);
    assertEquals("10%", out.iva);
    assertEquals(3.85, out.precioFinal, 0.0001);

    verify(repo, times(1)).findByCodigo("IBU600");
    verifyNoMoreInteractions(repo);
  }
}
```

### Paso 3 — Ejecutar tests

Tareas del alumno:
- Abre terminal en la raíz del proyecto.
- Ejecuta `mvn test`.
- Confirma que todos los tests pasan en verde.
- Si falla alguno, corrige y vuelve a ejecutar hasta tener resultado estable.

```bash
mvn test
```

**Entregable Bloque 7**
- Tests en verde.
- Regla de IVA y transformación cubiertas.

---

## Resolución de bloqueos frecuentes (añadido)

1. Error `package jakarta.validation does not exist`
- Falta `spring-boot-starter-validation`.

2. Error `No qualifying bean of type DataSource`
- Falta `spring-boot-starter-jdbc` o la configuración de datasource.

3. Error en `h2-console` por URL
- Usar exactamente `jdbc:h2:mem:farmacia`.

4. `schema.sql` o `data.sql` no se ejecutan
- Verificar ubicación: `src/main/resources/`.
- Reiniciar app tras cambios.

5. Test no compila por acceso a `calcularPrecioFinal`
- Dejar método con visibilidad package-private (sin `private`) para test unitario.

---

## Entrega por bloques

**Bloque 0 (arranque Sesión 4)**
- Proyecto Spring Maven creado y arrancado.

**Bloque 1 (Jackson)**
- PUT serializa payload.

**Bloque 2 (Transformaciones)**
- Anotaciones Jackson aplicadas y DTO respuesta creado.

**Bloque 3 (Logging)**
- `System.out` sustituido por logger.

**Bloque 4 (Validación)**
- PUT inválido devuelve `400`.

**Bloque 5 (JDBC + H2)**
- PUT persiste en H2.

**Bloque 6 (Flujo inverso)**
- GET devuelve desde DB.

**Bloque 7 (Tests)**
- `mvn test` correcto con Mockito.

---

# Fin de la presentación

- <a href=".\EjercicioSesion12\Sesion12.md">Sesion 12</a>

<a href="..\..\README.md">Ir al indice de Presentaciones </a>

<a href="../Sesion6/Sesion6.md">Ir a la Sesion 6</a>
