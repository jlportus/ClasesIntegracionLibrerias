# Guía: Generación e integración de proyecto API + LIB con Maven

### Misión
El estudiante debe aprender a enlazar un proyecto de lógica independiente (LIB) con una aplicación API (Spring Boot) en distintos escenarios: desarrollo local, mediante JitPack y publicando en GitHub Packages. Esta separación entre API y librería refleja una arquitectura común en la que la parte responsable de la lógica de negocio (la "lib" ) se mantiene aislada de la aplicación que ofrece los servicios web. De este modo:

- la misma lógica puede ser reutilizada por varias APIs o aplicaciones (por ejemplo, móvil y web) sin duplicación;
- los desarrolladores de la librería pueden trabajar de forma independiente y publicar nuevas versiones sin tocar la API;
- se pueden escribir tests específicos para la librería sin cargar la infraestructura de Spring;
- en entornos empresariales la librería puede desplegarse en un repositorio corporativo y ser consumida por servicios diversos.

El objetivo es practicar cómo se declara la dependencia, cómo se resuelven versiones y cómo se actualiza el código cuando la librería cambia.

### Propósito de la práctica
Esta guía ofrece un recorrido paso a paso para que comprendas los mecanismos que permiten que una API consuma código de una librería externa. La práctica tiene sentido porque en proyectos reales la lógica de negocio suele evolucionar con mayor frecuencia que la capa de acceso web; si la lógica está en una librería, se puede mejorar o corregir sin desplegar de nuevo toda la aplicación, y se facilita que varios equipos la utilicen. Al separar la librería, la API solo se encarga de recibir peticiones y delegar, lo que hace que sea más fácil de entender y mantener. Al finalizar deberías ser capaz de:

- Organizar proyectos en módulos o carpetas hermanas.
- Instalar artefactos en el repositorio local `.m2` y consumirlos.
- Usar servicios de terceros (JitPack, GitHub Packages) para resolver dependencias.
- Configurar `pom.xml`, `settings.xml` y, si procede, GitHub Actions.

Riesgos asumibles: la compilación puede fallar por versiones incompatibles (manejable con mensajes de Maven), el acceso a repositorios remotos puede requerir tokens y ajustes de URL. La intención es que te familiarices con los comandos y archivos clave sin necesidad de dominar Maven al detalle.

## Índice

1. [Estructura de proyecto recomendada](#1-estructura-de-proyecto-recomendada)
2. [Preparar el proyecto-LIB](#2-preparar-el-proyecto-lib)
3. [Opción A — Integración local (carpetas hermanas)](#3-opción-a--integración-local-carpetas-hermanas)
4. [Opción B — Integración con JitPack (GitHub público)](#4-opción-b--integración-con-jitpack-github-público)
5. [Opción C — Publicar y consumir desde GitHub Packages](#5-opción-c--publicar-y-consumir-desde-github-packages)
6. [Comprobación de la integración](#6-comprobación-de-la-integración)
7. [Errores frecuentes](#7-errores-frecuentes)

---

## 1. Estructura de proyecto recomendada

```
workspace/
├── proyecto-API/          ← Spring Boot (REST + JPA)
│   └── pom.xml
├── proyecto-LIBreria/     ← Java puro (lógica de negocio)
│   └── pom.xml
└── pom.xml                ← parent multi-módulo (opcional pero recomendado)
```

> Ambos proyectos deben tener su propio repositorio Git.  
> Spring Boot 3+ genera proyectos con Java 17 por defecto.  
> JitPack compila con Java 8 por defecto; para Java 17+ añadir `jitpack.yml` (ver sección 4).

---

## 2. Preparar el proyecto-LIB

El proyecto-LIB debe ser **Java puro**, sin dependencias de Spring Boot.

### 2.1 Eliminar Spring del código fuente

Quitar del fichero main (si existe):
```java
// Eliminar estas líneas:
@SpringBootApplication
SpringApplication.run(MiApp.class, args);
```

Eliminar la clase main si ya no tiene utilidad (la librería no arranca sola).

### 2.2 Limpiar el `pom.xml` de la LIB

Eliminar o no incluir:
- Dependencias `spring-boot-starter-*`
- El plugin `spring-boot-maven-plugin`
- La carpeta `src/test/` (los tests se ejecutan desde la API o desde un módulo dedicado)

Configuración mínima del `pom.xml` del proyecto-LIB:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.miempresa</groupId>
  <artifactId>proyecto-LIBreria</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>jar</packaging>

  <properties>
    <java.version>17</java.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
        <configuration>
          <source>17</source>
          <target>17</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

---

## 3. Opción A — Integración local (carpetas hermanas)

### Método 1: `mvn install` + dependencia directa (proyectos independientes)

1. Compilar e instalar la LIB en el repositorio local `.m2`:
   ```bash
   cd proyecto-LIBreria
   mvn clean install
   ```

2. Añadir la dependencia en el `pom.xml` del proyecto-API:
   ```xml
   <dependency>
     <groupId>com.miempresa</groupId>
     <artifactId>proyecto-LIBreria</artifactId>
     <version>0.0.1-SNAPSHOT</version>
   </dependency>
   ```

3. Actualizar y compilar la API:
   ```bash
   cd proyecto-API
   mvn clean spring-boot:run
   ```

   En Eclipse: clic derecho sobre el proyecto → **Maven** → **Update Project…**

### Método 2: `pom.xml` parent multi-módulo (recomendado)

Crear un `pom.xml` en la carpeta raíz que contenga ambos módulos:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.miempresa</groupId>
  <artifactId>workspace-parent</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>

  <modules>
    <module>proyecto-LIBreria</module>
    <module>proyecto-API</module>
  </modules>
</project>
```

> Los nombres de `<module>` deben coincidir **exactamente** con los nombres de carpeta.

Comandos útiles con el parent:
```bash
# Compilar y ejecutar solo la API (Maven resuelve LIB automáticamente)
mvn -am -pl proyecto-API spring-boot:run

# Compilar y empaquetar todo
mvn clean package
```

Abrir en Eclipse: **File → Import… → Maven → Existing Maven Projects** → seleccionar la carpeta raíz → Finish.

---

## 4. Opción B — Integración con JitPack (GitHub público)

JitPack clona el repositorio de GitHub, lo compila y devuelve el JAR como dependencia Maven.

### 4.1 Requisitos del proyecto-LIB en GitHub

- Repositorio **público** en GitHub.
- `pom.xml` válido con `<packaging>jar</packaging>`.
- Al menos un **tag/release** para versiones concretas (p. ej. `v1.0.0`).

### 4.2 Configurar `jitpack.yml` (si la LIB usa Java 17+)

Crear el fichero `jitpack.yml` en la raíz del repositorio:
```yaml
jdk:
  - openjdk17
```

### 4.3 Añadir JitPack en el `pom.xml` de la API

```xml
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
```

### 4.4 Declarar la dependencia

Las coordenadas en JitPack siguen el patrón `com.github.USUARIO:REPOSITORIO:VERSION`.

**Por tag de release** (recomendado para producción):
```xml
<dependency>
  <groupId>com.github.UsuarioPepe</groupId>
  <artifactId>repoLibreria</artifactId>
  <version>v1.2.3</version>
</dependency>
```

**Por hash de commit** (útil para versiones intermedias):
```xml
<dependency>
  <groupId>com.github.UsuarioPepe</groupId>
  <artifactId>repoLibreria</artifactId>
  <version>1a2b3c4d</version>
</dependency>
```

**Último commit de una rama** (snapshot):
```xml
<dependency>
  <groupId>com.github.UsuarioPepe</groupId>
  <artifactId>repoLibreria</artifactId>
  <version>main-SNAPSHOT</version>
</dependency>
```

**Repositorio multi-módulo** (usar `REPO:MODULO`):
```xml
<dependency>
  <groupId>com.github.UsuarioPepe.repoLibreria</groupId>
  <artifactId>modulo-negocio</artifactId>
  <version>v1.0.0</version>
</dependency>
```

### 4.5 Forzar descarga y verificar

```bash
# Forzar actualización de snapshots / versiones
mvn -U clean compile

# Ver log de build de JitPack si falla:
# https://jitpack.io/com/github/USUARIO/REPO/VERSION/build.log
```

---

## 5. Opción C — Publicar y consumir desde GitHub Packages

### 5.1 Preparar `distributionManagement` en el `pom.xml` de la LIB

```xml
<distributionManagement>
  <repository>
    <id>github</id> <!-- debe coincidir con el <server> en settings.xml -->
    <name>GitHub OWNER Apache Maven Packages</name>
    <url>https://maven.pkg.github.com/OWNER/REPOSITORY</url>
  </repository>
</distributionManagement>
```

Reemplazar `OWNER` por el usuario u organización y `REPOSITORY` por el nombre del repositorio.

### 5.2 Crear un Personal Access Token (PAT)

GitHub → Settings → Developer settings → Personal access tokens (classic) → Generate new token:
- Scopes obligatorios: `write:packages`, `read:packages`
- Scope adicional si el repo es privado: `repo`

> Copie el token: no podrá verlo de nuevo.

### 5.3 Configurar credenciales en `~/.m2/settings.xml`

```xml
<settings>
  <servers>
    <server>
      <id>github</id>  <!-- coincide con <id> en distributionManagement -->
      <username>GITHUB_USERNAME</username>
      <password>PERSONAL_ACCESS_TOKEN</password>
    </server>
  </servers>
</settings>
```

### 5.4 Publicar manualmente

```bash
mvn deploy -B -DskipTests
```
Notas:
- `-B` para modo batch (sin interacción).
- `-DskipTests` para omitir tests (opcional, no recomendado en entornos de producción).


Verificar en GitHub → repositorio → pestaña **Packages**.

### 5.5 Publicar automáticamente con GitHub Actions

Crear `.github/workflows/publish.yml`:

```yaml
name: Publish Maven package
on:
  release:
    types: [published]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          server-id: github
          server-username: ${{ github.actor }}
          server-password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and deploy
        run: mvn -B -DskipTests deploy
```

> `server-id` debe ser igual al `<id>` en `distributionManagement`.  
> `GITHUB_TOKEN` publica en el mismo repositorio sin necesitar PAT manual.

### 5.6 Consumir el paquete desde otro proyecto

Añadir el repositorio y la dependencia en el `pom.xml` del proyecto cliente:

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/OWNER/REPOSITORY</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>com.miempresa</groupId>
    <artifactId>proyecto-LIBreria</artifactId>
    <version>1.0.0</version>
  </dependency>
</dependencies>
```

Las credenciales del consumidor también se configuran en `~/.m2/settings.xml` (un PAT con `read:packages`).

---

## 6. Comprobación de la integración

Una vez integrada la dependencia, verificar que la API puede invocar un método de la LIB:

```java
// En un Controller o Service del proyecto-API
import com.miempresa.libreria.MiServicioNegocio;

@RestController
public class TestController {

    private final MiServicioNegocio servicio = new MiServicioNegocio();

    @GetMapping("/test")
    public String test() {
        return servicio.ejecutar();  // método de la librería
    }
}
```

Llamar al endpoint tras arrancar:
```
GET http://localhost:8080/test
```

---

## 7. Errores frecuentes

| Error | Causa | Solución |
|---|---|---|
| `Could not resolve artifact` | LIB no instalada en `.m2` | Ejecutar `mvn install` en proyecto-LIB |
| `401 Unauthorized` (GitHub Packages) | Credenciales incorrectas o `server id` no coincide | Revisar `settings.xml` y `distributionManagement` |
| `404 Not Found` (GitHub Packages) | URL de `distributionManagement` incorrecta | Verificar `OWNER/REPOSITORY` |
| JitPack: `BUILD FAILURE` | Versión Java incompatible | Añadir `jitpack.yml` con `jdk: openjdk17` |
| Eclipse: la librería no aparece | Proyecto no importado como Maven | File → Import → Maven → Existing Maven Projects |
| `package does not exist` tras import | Maven no actualizó el classpath | Click derecho → Maven → Update Project |

---

<a href="./Sesion5.md">← Volver a la presentación Sesión 5</a>
