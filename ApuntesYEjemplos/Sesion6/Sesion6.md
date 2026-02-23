# Despliegue de una WebApp con Spring Boot 3.5 + Maven

<a href="..\..\README.md">indice de Presentaciones</a>

---

## ¿Qué genera Maven al construir?

```
target/
├── mi-app-1.0.0.war          ← artefacto desplegable
├── mi-app-1.0.0.war.original ← JAR sin el wrapper de Spring
└── classes/                  ← bytecode compilado
```
---

Dos modos de ejecución:
- **Embebido** → `java -jar mi-app.war` (Tomcat interno)
- **Externo** → copiar `.war` a `/webapps/` de Tomcat

Notas:
Spring Boot 3.5 requiere Java 17 como mínimo (se recomienda Java 21 LTS).
El fichero `.war.original` es el JAR sin el launcher de Spring Boot; se usa para despliegue en contenedor externo.
El Tomcat embebido es la opción más habitual en desarrollo y producción cloud.
Para generar WAR en lugar de JAR hay que cambiar `<packaging>war</packaging>` y marcar el starter de Tomcat como `provided`.

---

## Configurar el proyecto para generar WAR

`pom.xml`:
```xml
<packaging>war</packaging>

<dependencies>
  <!-- Tomcat embebido: provided para no duplicarlo en el WAR externo -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
  </dependency>
</dependencies>
```
---

## Clase principal:

```java
@SpringBootApplication
public class MiApp extends SpringBootServletInitializer {
  @Override
  protected SpringApplicationBuilder configure(
      SpringApplicationBuilder app) {
    return app.sources(MiApp.class);
  }
  public static void main(String[] args) {
    SpringApplication.run(MiApp.class, args);
  }
}
```

Notas:
- `SpringBootServletInitializer` es el punto de entrada para servidores externos (Tomcat, WildFly, etc.). Sustituye al antiguo `web.xml`.
- `scope=provided` indica que Tomcat estará disponible en el servidor destino y no debe empaquetarse dentro del WAR.
- Si solo se va a usar el Tomcat embebido (JAR ejecutable), no es necesario extender `SpringBootServletInitializer`.
- En Spring Boot 3.x la clase `SpringBootServletInitializer` sigue en `spring-boot-starter-web`.

---

## Carpetas de recursos estáticos

Spring Boot 3.5 sirve recursos estáticos desde (en orden de prioridad):

|Orden| Ruta en `src/main/resources` | URL pública |
|-|---|---|
|1º| `static/` | `/` (raíz) |
|2º| `public/` | `/` (raíz) |
|3º| `resources/` | `/` (raíz) |
|4º| `META-INF/resources/` | `/` (raíz) |
|5º| `templates/` | Solo Thymeleaf / motores de plantillas |

Notas:
- Todas las carpetas sirven recursos estáticos (HTML, CSS, JS, imágenes) de la misma forma.
- Convención recomendada: usar `src/main/resources/static/` para el frontend construido.
- El orden de prioridad importa: si existe el mismo fichero en `static/` y `public/`, gana `static/`.
- `templates/` NO sirve ficheros estáticos directamente; es para vistas procesadas por Thymeleaf u otro motor.
- Para la raíz `/` Spring Boot busca `index.html` en estas carpetas automáticamente (welcome file).
- Referencia: `WebMvcAutoConfiguration` → `addResourceHandlers`.

---

## Incluir el frontend construido en el WAR

```
src/main/resources/static/
└── index.html          ← entrada de la SPA
└── assets/
    ├── app.js
    └── styles.css
```

---

Pipeline recomendado:
```
npm run build  →  dist/  →  copiar a  →  src/main/resources/static/
mvn clean package
```
---

Plugin Maven para automatizarlo (`pom.xml`):
```xml
<plugin>
  <groupId>com.github.eirslett</groupId>
  <artifactId>frontend-maven-plugin</artifactId>
  <version>1.15.0</version>
  <configuration>
    <workingDirectory>frontend/</workingDirectory>
  </configuration>
</plugin>
```

Notas:
- La carpeta `src/main/webapp/` también es válida para recursos web (convención Java EE), pero en Spring Boot se prefiere `src/main/resources/static/` porque funciona igual para JAR y WAR.
- `src/main/webapp/` solo está disponible en despliegue WAR externo, no al ejecutar con `java -jar`.
- `frontend-maven-plugin` instala Node/npm, ejecuta `npm install` y `npm run build` como parte del ciclo Maven antes de empaquetar.
- Alternativa sencilla: copiar el `dist/` con el plugin `maven-resources-plugin` usando `<outputDirectory>`.

---

## Filtrado de recursos en el build

Permite que Maven sustituya variables `${...}` en ficheros de configuración al construir.

`pom.xml`:
```xml
<build>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <filtering>true</filtering>
      <includes>
        <include>**/*.properties</include>
        <include>**/*.yml</include>
        <include>**/*.yaml</include>
      </includes>
    </resource>
    <resource>
      <directory>src/main/resources</directory>
      <filtering>false</filtering>
      <excludes>
        <exclude>**/*.properties</exclude>
        <exclude>**/*.yml</exclude>
        <exclude>**/*.yaml</exclude>
      </excludes>
    </resource>
  </resources>
</build>
```

Notas:
- El filtrado reemplaza expresiones `${propiedad}` con valores definidos en `<properties>` del `pom.xml` o en perfiles Maven.
- IMPORTANTE: nunca activar `filtering=true` sobre binarios (imágenes, fuentes, keystores). Los bytes 0x24 (`$`) y 0x7B (`{`) pueden corromperse.
- Por eso se usan dos bloques `<resource>`: uno con filtrado para textos y otro sin filtrado para el resto.
- Spring Boot usa `@` como delimitador por defecto para evitar conflictos con la sintaxis `${...}` de Spring: `@maven.build.timestamp@`.
- Uso típico: inyectar la versión del artefacto en `application.properties`: `app.version=@project.version@`

---

## Estructura interna del WAR generado

```
mi-app-1.0.0.war
├── META-INF/
│   ├── MANIFEST.MF          ← clase principal y versiones
│   └── maven/               ← pom.xml y pom.properties
├── WEB-INF/
│   ├── classes/             ← bytecode (.class) y resources
│   │   ├── com/miempresa/   ← paquetes Java compilados
│   │   └── application.yml  ← configuración de la app
│   ├── lib/                 ← JARs de dependencias (runtime)
│   └── lib-provided/        ← JARs con scope=provided (Tomcat)
└── (raíz del WAR)
    ├── index.html            ← frontend estático
    └── assets/
```

Notas:
Descripción de cada carpeta:
- META-INF/MANIFEST.MF: contiene la clase `Main-Class` y `Start-Class` para el launcher de Spring Boot, así como el `Classpath`.
- META-INF/maven/: metadatos del artefacto Maven (groupId, artifactId, version). Permite saber exactamente qué versión está desplegada.
- WEB-INF/classes/: equivale al `target/classes/` local. Aquí van las clases compiladas y los ficheros de `src/main/resources` (properties, YAML, templates).
- WEB-INF/lib/: todas las dependencias Maven con scope `compile` o `runtime`. Son los JARs que necesita la aplicación para funcionar.
- WEB-INF/lib-provided/: dependencias con scope `provided` (por ejemplo, `spring-boot-starter-tomcat`). Están presentes para compilar pero no se incluyen en el classpath del servidor externo porque el servidor ya las tiene.
- Raíz del WAR: recursos web accesibles directamente por el servidor (equivalente a `src/main/webapp/` o al contenido de `src/main/resources/static/` copiado aquí).

---

## Construir y ejecutar

```bash
# Construir el WAR
mvn clean package

# Ejecutar con Tomcat embebido
java -jar target/mi-app-1.0.0.war

# Especificar perfil
java -jar target/mi-app-1.0.0.war --spring.profiles.active=produccion

# Desplegar en Tomcat externo
cp target/mi-app-1.0.0.war $TOMCAT_HOME/webapps/
$TOMCAT_HOME/bin/startup.sh
# → http://localhost:8080/mi-app-1.0.0/
```

Notas:
- Con Tomcat embebido el contexto raíz es `/`; con Tomcat externo el contexto es el nombre del WAR (`/mi-app-1.0.0`).
- Para forzar contexto raíz en Tomcat externo: renombrar el WAR a `ROOT.war`.
- Configurar `server.port` y `server.servlet.context-path` en `application.properties` para el embebido.
- Spring Boot 3.5 incluye Tomcat 10.1 (Jakarta EE 10). Asegúrese de que el Tomcat externo sea 10.x o superior (incompatible con Tomcat 9.x que usa `javax.*`).

---

## Tomcat externo: instalación y servicio

```bash
# Ubuntu — instalar Tomcat 10
sudo apt update
sudo apt install tomcat10

# Desplegar WAR
sudo cp mi-app.war /var/lib/tomcat10/webapps/ROOT.war

# Control del servicio
sudo systemctl start  tomcat10
sudo systemctl stop   tomcat10
sudo systemctl status tomcat10

# Cambiar puerto en /etc/tomcat10/server.xml
sudo sed -i 's/port="8080"/port="9090"/' /etc/tomcat10/server.xml
sudo systemctl restart tomcat10
```

Notas:
- Tomcat 9 usa la API `javax.servlet.*` (Java EE 8). NO es compatible con Spring Boot 3.x que usa `jakarta.servlet.*` (Jakarta EE 10).
- Tomcat 10.1 es la versión mínima requerida para Spring Boot 3.
- En producción añadir usuario manager en `conf/tomcat-users.xml` para usar el Manager web:
  ```xml
  <role rolename="manager-gui"/>
  <user username="admin" password="secreto" roles="manager-gui"/>
  ```
- Los logs del servidor están en `/var/log/tomcat10/` (Ubuntu) o en `$TOMCAT_HOME/logs/`.

---

# Fin de la presentacion

<a href="..\..\README.md">Ir al indice de Presentaciones</a>

<a href="../Sesion7-8-9/Sesion7-8-9.md">Ir a la Sesion 7-8-9</a>
