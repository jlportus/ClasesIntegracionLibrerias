# Repositorios

# Gradle/Maven

<a href="..\..\README.md">indice de Presentaciones</a>

---

### INDICE

- [Repositorios](#repositorios)
- [Gradle/Maven](#gradlemaven)
    - [INDICE](#indice)
- [Objetivos de la sesión](#objetivos-de-la-sesión)
  - [Gradle/Maven - repositorios](#gradlemaven---repositorios)
  - [Conceptos - Repositorios](#conceptos---repositorios)
    - [Repositorios Privados](#repositorios-privados)
  - [Conceptos - Licenciamiento](#conceptos---licenciamiento)
  - [MAVEN](#maven)
    - [Ejemplo pom.xml](#ejemplo-pomxml)
    - [Comandos MAVEN](#comandos-maven)
    - [Fases Maven](#fases-maven)
  - [Conceptos - GRADLE](#conceptos---gradle)
  - [Conceptos - GRADLE II](#conceptos---gradle-ii)
    - [Ejemplo build.gradle](#ejemplo-buildgradle)
    - [Instalacion Gradle](#instalacion-gradle)
    - [Comandos Gradle](#comandos-gradle)
  - [Crear un proyecto](#crear-un-proyecto)
    - [Maven (Spring Boot - Crear e importar un proyecto (Spring Initializr) 🚀)](#maven-spring-boot---crear-e-importar-un-proyecto-spring-initializr-)
    - [Objetivo](#objetivo)
    - [1) Crear el proyecto (Web desde la UI)](#1-crear-el-proyecto-web-desde-la-ui)
    - [2) Crear el proyecto desde la CLI (ejemplo)](#2-crear-el-proyecto-desde-la-cli-ejemplo)
    - [3) Importar en Eclipse (Maven)](#3-importar-en-eclipse-maven)
    - [4) Ejecutar la aplicación](#4-ejecutar-la-aplicación)
    - [5) Estructura y archivos clave a revisar](#5-estructura-y-archivos-clave-a-revisar)
    - [6) Dependencias básicas recomendadas (snippet pom)](#6-dependencias-básicas-recomendadas-snippet-pom)
    - [7) Comandos útiles](#7-comandos-útiles)
    - [8) Buenas prácticas / recomendaciones](#8-buenas-prácticas--recomendaciones)
    - [9) Ejercicio propuesto](#9-ejercicio-propuesto)
    - [Maven (archetype - console)](#maven-archetype---console)
  - [Crear un proyecto Maven](#crear-un-proyecto-maven)
    - [1) Crear proyecto Maven por consola (archetype quickstart)](#1-crear-proyecto-maven-por-consola-archetype-quickstart)
    - [2) Importar en Eclipse (Maven)](#2-importar-en-eclipse-maven)
    - [3) Estructura básica y comandos útiles](#3-estructura-básica-y-comandos-útiles)
    - [4) POM mínimo con dependencias comunes](#4-pom-mínimo-con-dependencias-comunes)
    - [Maven: Scopes de dependencias](#maven-scopes-de-dependencias)
    - [Ejemplo Scopes Maven:](#ejemplo-scopes-maven)
    - [Maven: Plugins comunes y `pluginManagement`](#maven-plugins-comunes-y-pluginmanagement)
    - [Maven: Rangos de versión (version ranges)](#maven-rangos-de-versión-version-ranges)
    - [Maven: `properties` y uso de variables](#maven-properties-y-uso-de-variables)
    - [Maven: `parent` y `dependencyManagement` (BOMs)](#maven-parent-y-dependencymanagement-boms)
    - [Gradle (console)](#gradle-console)
  - [Declaracion de dependencias en gradle](#declaracion-de-dependencias-en-gradle)
  - [Declarar una libreria de un repositorio proyecto de gitHub](#declarar-una-libreria-de-un-repositorio-proyecto-de-github)
    - [Tipos de inclusion de librerias con gradle](#tipos-de-inclusion-de-librerias-con-gradle)
    - [Api vs Dependencia](#api-vs-dependencia)
    - [Precedencia y exportacion de dependencias](#precedencia-y-exportacion-de-dependencias)
    - [Inclusión de una libreria a través de repositorios](#inclusión-de-una-libreria-a-través-de-repositorios)
    - [Inclusión e una libreria local](#inclusión-e-una-libreria-local)
- [Comprobación de conocimientos](#comprobación-de-conocimientos)
- [Fin de la presentacion](#fin-de-la-presentacion)

---

# Objetivos de la sesión

- Conocer repositorios y gestores (Maven/Gradle)
- Aprender a crear e importar proyectos Maven y Gradle (Spring Initializr, archetype)
- Comprender scopes, plugins y gestión de versiones (Maven)

Notas:
- Entregable: crear un proyecto y describir dependencias y comandos básicos

---

## Gradle/Maven - repositorios

**Propósito:**
Conocer herramientas de gestión de librerías de Backend, los repositorios, licencias e inclusion de librerías con Gradle.

---

## Conceptos - Repositorios

[https://mvnrepository.com/](https://mvnrepository.com/)

Notas:

Consejos para la busqueda de librerias

- Numero de descargas/numero de commits
- numero de contribuyentes del repo
- numero de stars
- numero de forks
- Tipo de licencia
- Que no sea dependiente de otras librerias
- Calidad de la documentacion
- no necesariamente escoger la ultima version

Otros repositorios

repositorios de bibliotecas de código Java más extendidos incluyen:

    Maven Central: Es el repositorio de bibliotecas Java más utilizado y es mantenido por la Apache Software Foundation. Contiene más de 6 millones de bibliotecas y es compatible con la mayoría de los IDEs y herramientas de construcción, como Gradle y Apache Ant.

    JCenter: Es un repositorio de bibliotecas Java creado y mantenido por Bintray. Es similar a Maven Central y también es compatible con la mayoría de los IDEs y herramientas de construcción.

    JitPack: Es un repositorio de bibliotecas Java que permite utilizar proyectos de GitHub como dependencias de un proyecto. Es útil si desea utilizar una biblioteca que no está disponible en Maven Central o JCenter.

    Gradle Plugin Portal: Es un repositorio de plugins Gradle mantenido por Gradle Inc. Contiene plugins para diversas tareas de construcción, como Java, Android, Kotlin, etc.

    Spring Plugins: Es un repositorio de plugins Spring mantenido por Pivotal. Contiene plugins específicos para el desarrollo de aplicaciones basadas en Spring Framework.

    Apache Snapshots: Es un repositorio mantenido por la Apache Software Foundation que contiene versiones de desarrollo de bibliotecas Apache.

### Repositorios Privados

[Nexus](https://www.sonatype.com/products/nexus-repository)

> Mirroring + proxyDefensa

---

## Conceptos - Licenciamiento

[https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses](https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses)

[https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)

<img src="data:image/jpeg;base64,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" alt="pic" />

Notas:
Restricciones e implicaciones de las licencias

- Vinculación (linking): vinculación del código licenciado con código bajo otra licencia (p. ej. cuando se proporciona como librería).
- Distribución: distribución del código a terceros.
- Modificación: modificaciones del código por parte del licenciatario.
- Concesión de patentes: protección a los licenciatarios frente a reclamaciones por patentes realizadas por los contribuidores sobre sus aportaciones, y protección a los contribuidores frente a reclamaciones por parte de los licenciatarios.
- Uso privado: si las modificaciones del código deben compartirse con la comunidad o pueden usarse de forma privada (p. ej. uso interno en una empresa).
- Sublicencia: si el código modificado puede licenciarse bajo una licencia distinta (p. ej. un nuevo copyright) o debe conservar la misma licencia original.
- Concesión de marcas (TM grant): uso de marcas registradas asociadas al código o a sus contribuidores por parte del licenciatario.

---

## MAVEN

**Maven** es una herramienta de gestión de proyectos software que se utiliza para construir, gestionar y documentar proyectos de software en Java.

Utiliza archivos de configuración llamados

```
pom.xml (Project Object Model)
```

para definir la estructura del proyecto, las dependencias, los plugins y otros aspectos del ciclo de vida del proyecto.

Notas:

[Instalacion de mvn](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html#installation)

---

### Ejemplo pom.xml

[pom.xml](../Sesion3/pom.xml)

---

### Comandos MAVEN

```
~ mvn install
~ mvn clean install
~ mvn spring-boot:run # Necesita la dependencia _spring-boot-starter-web_
~ mvn compile
```

[maven docs](https://maven.apache.org/guides/)

Notas:
comandos más comunes de Maven:

**mvn install**: instala el paquete generado en el repositorio local de Maven, lo que permite que otros proyectos de Maven lo utilicen como una dependencia.

**mvn clean**: elimina los archivos generados en la última compilación, como los archivos de clase y los archivos JAR.

**mvn compile**: compila los archivos fuente del proyecto.

**mvn test**: ejecuta las pruebas unitarias del proyecto.

**mvn package**: empaqueta el proyecto en un archivo JAR, WAR u otro formato de archivo.

**mvn deploy**: copia el paquete generado en un repositorio remoto, lo que permite que otros desarrolladores o proyectos lo utilicen como una dependencia.

**mvn dependency:tree**: muestra el árbol de dependencias del proyecto, incluyendo las dependencias transitivas.

**mvn clean install**: este es un comando común que combina los comandos clean e install en uno solo.

**mvn archetype:generate**: crea un nuevo proyecto Maven a partir de una plantilla predefinida.

**mvn help**: muestra una lista de todos los comandos de Maven disponibles y su descripción.

---

### Fases Maven

Fases del ciclo de vida por defecto

    validate: _validar que el proyecto es correcto y que toda la información necesaria está disponible_
    compile: _compilar el código fuente del proyecto_
    test: _ejecutar las pruebas sobre el código compilado utilizando un framework de pruebas adecuado. Estas pruebas no deben requerir que el código esté empaquetado o desplegado._

    [...]

    package: _empaquetar el código compilado en su formato distribuible (por ejemplo, un JAR)._ 
    integration-test: _procesar y desplegar el paquete si es necesario en un entorno donde se ejecuten las pruebas de integración._
    verify: _ejecutar comprobaciones que verifiquen que el paquete es válido y cumple criterios de calidad._
    install: _instalar el paquete en el repositorio local para que pueda usarse como dependencia en otros proyectos localmente._
    deploy: _en un entorno de integración o release, copiar el paquete final al repositorio remoto para que otros desarrolladores o proyectos puedan usarlo._

---

## Conceptos - GRADLE

**Gradle** es una herramienta de construcción de software de código abierto que se utiliza para automatizar la construcción, el testing, la documentación y la entrega de proyectos de software

Notas:
[Gradle Docs](https://docs.gradle.org/current/userguide/what_is_gradle.html)

---

## Conceptos - GRADLE II

Utiliza un lenguaje de scripting basado en **Groovy** o **Kotlin** --> scripts personalizados

```
plugins --> Scripts "predefinidos"
```

Utiliza archivos de configuración llamados

```
build.gradle ~ pom.xml
```

para definir la estructura del proyecto, las dependencias, los plugins y otros aspectos del ciclo de vida del proyecto.

Notas:
[Gradle Docs](https://docs.gradle.org/current/userguide/what_is_gradle.html)

---

### Ejemplo build.gradle

[build.gradle](./build.gradle)

---

### Instalacion Gradle

[Guia de instalacion](https://docs.gradle.org/current/userguide/installation.html)

---

### Comandos Gradle

```
gradle init
gradle bootRun # Necesita la dependencia _spring-boot-starter-web_
gradle build
```

[gradle cli docs](https://docs.gradle.org/current/userguide/command_line_interface.html)

Notas:
comandos más comunes de Maven:

**gradle build**: construye el proyecto y genera los archivos de salida, como los archivos JAR, WAR y ZIP.

**gradle test**: ejecuta las pruebas unitarias del proyecto.

**gradle run**: ejecuta la aplicación directamente desde Gradle.

**gradle clean**: elimina los archivos generados en la última compilación, como los archivos de clase y los archivos JAR.

**gradle tasks**: muestra una lista de todas las tareas disponibles en el proyecto.

**gradle dependencies**: muestra una lista de todas las dependencias del proyecto.

**gradle help**: muestra una lista de todos los comandos de Gradle disponibles y su descripción.

**gradle build --info**: muestra información detallada de la compilación, incluyendo las dependencias resueltas, los plugins aplicados y los archivos generados.

**gradle build --scan**: genera un informe de análisis de la compilación en línea que incluye información detallada sobre el proyecto, las dependencias y las tareas.

**gradle init**: crea un nuevo proyecto Gradle a partir de una plantilla predefinida.

---

## Crear un proyecto

--

### Maven (Spring Boot - Crear e importar un proyecto (Spring Initializr) 🚀)

### Objetivo
Crear un proyecto Spring Boot con Spring Initializr, importarlo en Eclipse (Maven) y revisar su estructura básica.

--

### 1) Crear el proyecto (Web desde la UI)
- Accede a https://start.spring.io
- Opciones recomendadas:
  - Project: **Maven Project**
  - Language: **Java**
  - Spring Boot: usa la versión estable (p. ej. 3.x)
  - Packaging: **Jar**
  - Java: 17 (LTS) o la versión que uses en clase
  - Metadata: groupId (ej. com.miempresa), artifactId (ej. miapp)
  - Dependencies sugeridas: **Spring Web**, **Spring Data JPA**, **H2 Database** (dev), **Spring Boot DevTools**, **Lombok** (opcional), **Spring Boot Starter Test**, **Actuator**
- Generar → descargar zip → descomprimir

--

### 2) Crear el proyecto desde la CLI (ejemplo)
```bash
curl "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.1.4&baseDir=miapp&groupId=com.miempresa&artifactId=miapp&name=miapp&packageName=com.miempresa.miapp&dependencies=web,data-jpa,h2,lombok,devtools,actuator" -o miapp.zip
unzip miapp.zip && cd miapp
```

--

### 3) Importar en Eclipse (Maven)
- File → **Import...** → **Maven** → **Existing Maven Projects** → seleccionar la carpeta del proyecto → **Finish**
- Alternativa: **File → Open Projects from File System...** (útil para multi-módulo)
- Asegúrate de tener instalado el plugin **M2Eclipse** y (opcional) el plugin **Lombok** para Eclipse

--

### 4) Ejecutar la aplicación
- Desde Eclipse: **Run As → Spring Boot App**
- Desde terminal (proyecto generado con wrapper):
  - Linux/Mac: `./mvnw spring-boot:run`
  - Windows: `mvnw spring-boot:run`
- Accede a: http://localhost:8080

--

### 5) Estructura y archivos clave a revisar
- `pom.xml` → dependencias y plugins
- `src/main/java/.../Application.java` → clase con `@SpringBootApplication`
- `src/main/resources/application.properties` (o `application.yml`) → configuración
- `src/main/resources/static` → recursos estáticos (js/css)
- `src/main/resources/templates` → plantillas (Thymeleaf)
- `src/test/java` → pruebas unitarias (Spring Boot Starter Test)

--

### 6) Dependencias básicas recomendadas (snippet pom)
```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

--

### 7) Comandos útiles
- `./mvnw spring-boot:run` → ejecutar aplicación en desarrollo
- `./mvnw clean package` → empaquetar JAR
- `java -jar target/<artifact>-0.0.1-SNAPSHOT.jar`
- `mvn dependency:tree` → revisar árbol de dependencias


--

### 8) Buenas prácticas / recomendaciones
- Usar perfiles (`application-dev.properties`, `application-prod.properties`)
- Añadir **Actuator** para métricas y health endpoints
- Activar plugin Lombok en el IDE si se usa
- Mantener tests básicos (controller/service/repository)

--

### 9) Ejercicio propuesto
Crear un proyecto llamado `calculadora-service` con dependencias: **Web**, **Data JPA**, **H2**, **Lombok**. Importarlo en Eclipse, ejecutarlo y exponer:
- `/health` (actuator o endpoint simple)
- `/iva?base=100&tipo=0.21` → devuelve JSON con resultado

---

### Maven (archetype - console)

## Crear un proyecto Maven

Este apartado muestra cómo crear un proyecto Maven por consola y cómo importarlo en Eclipse, con comandos y un POM mínimo.

--

### 1) Crear proyecto Maven por consola (archetype quickstart)

1. Verificar que Maven está instalado:

```bash
mvn -v
```

2. Crear un proyecto con el archetype `maven-archetype-quickstart` (modo no interactivo):

```bash
mvn -B archetype:generate \
  -DarchetypeGroupId=org.apache.maven.archetypes \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DgroupId=com.miempresa \
  -DartifactId=miapp \
  -Dversion=0.0.1-SNAPSHOT
```

--

3. Opcional: generar Maven Wrapper para que el proyecto sea reproducible sin requerir Maven local:

```bash
mvn -N io.takari:maven:wrapper
# luego usar ./mvnw en Unix o mvnw.cmd en Windows
```

--

### 2) Importar en Eclipse (Maven)

- File → **Import...** → **Maven** → **Existing Maven Projects** → seleccionar la carpeta del proyecto → **Finish**
- Asegúrate de tener instalado **M2Eclipse** (Maven integration) en Eclipse

--

### 3) Estructura básica y comandos útiles

- Estructura (creada por el archetype):
```
miapp/
  pom.xml
  src/
    main/java/com/miempresa/miapp/App.java
    test/java/com/miempresa/miapp/AppTest.java
```

- Comandos comunes:
  - `mvn compile` → compilar
  - `mvn test` → ejecutar tests
  - `mvn package` → empaquetar JAR
  - `mvn install` → instalar en repositorio local
  - `mvn dependency:tree` → ver árbol de dependencias

--

### 4) POM mínimo con dependencias comunes

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.miempresa</groupId>
  <artifactId>miapp</artifactId>
  <version>0.0.1-SNAPSHOT</version>

  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <!-- Dependencia de ejemplo: JUnit 5 para tests -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.9.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.0.0-M7</version>
      </plugin>
    </plugins>
  </build>
</project>
```

--

### Maven: Scopes de dependencias

- `compile` (por defecto): dependencia necesaria en compile y runtime.
- `provided`: usada solo en compilación, provista por el contenedor en runtime (p.ej. servlet-api).
- `runtime`: no necesaria para compilar, sí para ejecutar (p.ej. drivers JDBC)
- `test`: solo para tests (JUnit, mockito)
- `system`: obsoleta, evita su uso

--

### Ejemplo Scopes Maven:
```xml
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.28</version>
    <!-- scope omitted => compile -->
  </dependency>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
  </dependency>
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>2.1.214</version>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.9.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

--

### Maven: Plugins comunes y `pluginManagement`

- Plugins importantes:
  - `maven-compiler-plugin` (configurar fuente/target)
  - `maven-surefire-plugin` (tests)
  - `maven-jar-plugin` / `maven-shade-plugin` (empaquetado)
- Use `pluginManagement` en un `parent` para fijar versiones en multi-módulo.

--

Ejemplo (plugins):
```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>3.10.1</version>
      <configuration>
        <source>17</source>
        <target>17</target>
      </configuration>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.0.0-M7</version>
    </plugin>
  </plugins>
</build>
```

Ejemplo (pluginManagement en parent):
```xml
<pluginManagement>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>3.10.1</version>
    </plugin>
  </plugins>
</pluginManagement>
```

--

### Maven: Rangos de versión (version ranges)

- Sintaxis de ejemplo:
  - `[1.0,2.0)` → >=1.0 y <2.0
  - `(,1.5]` → <=1.5
  - `[1.2,]` → >=1.2
- **Aviso**: los rangos pueden causar resoluciones no deterministas; prefiera versiones fijas o gestione versiones vía BOM (`dependencyManagement`).

Ejemplo:
```xml
<dependency>
  <groupId>com.example</groupId>
  <artifactId>mylib</artifactId>
  <version>[1.0,2.0)</version>
</dependency>
```

--

### Maven: `properties` y uso de variables

- Defina propiedades reutilizables (versiones, encoding, java.version)

Ejemplo:
```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <java.version>17</java.version>
  <spring.boot.version>3.1.4</spring.boot.version>
</properties>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter</artifactId>
  <version>${spring.boot.version}</version>
</dependency>
```

--

### Maven: `parent` y `dependencyManagement` (BOMs)

- `parent` es útil para heredar configuración, versionado y pluginManagement (p.ej. `spring-boot-starter-parent`).
- `dependencyManagement` permite declarar versiones centralizadas (BOM) sin inyectarlas automáticamente; las dependencias siguen declarándose sin versión.

Ejemplo usando Spring Boot parent y BOM:
```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.1.4</version>
  <relativePath/> <!-- lookup parent from repo -->
</parent>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-dependencies</artifactId>
      <version>3.1.4</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<!-- ahora se puede declarar dependencies sin versión explicitamente si están en el BOM -->
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>
```

---

### Gradle (console)

1. Ejecutar

```
# Comprobar version de gradle
gradle -version

# ejecutar
gradle init
## Seguir las instrucciones de la interfaz de consola
```

Notas:

Si no aparece la opción "Application" en el Project Template del wizard de creación de proyecto Gradle en Eclipse, puede deberse a que la extensión "Buildship Gradle Integration" no esté instalada en su Eclipse.

Para solucionarlo, siga estos pasos:

```
Abra Eclipse y seleccione "Help" > "Eclipse Marketplace".

En la pestaña "Marketplace", busque "Buildship Gradle Integration" y haga clic en "Go".

Seleccione "Buildship Gradle Integration" y haga clic en "Install".

Siga las instrucciones para instalar la extensión y reinicie Eclipse.
```


--

## Declaracion de dependencias en gradle

En el archivo `build.gradle`

```
dependencies {
    implementation 'grupo:nombre:version'
}

dependencies {
    implementation 'com.google.guava:guava:30.1.1-jre'
}
```

Notas:

**Limitar versiones**
En Gradle, se puede declarar un rango de versiones para una dependencia utilizando la sintaxis de intervalo de versiones. La sintaxis básica es la siguiente:

```
dependencies {
    implementation 'grupo:nombre:[versionInicial, versionFinal)'
}
```

Donde versionInicial y versionFinal corresponden a las versiones entre las cuales se desea incluir la dependencia. El intervalo es inclusivo en la versión inicial y exclusivo en la versión final, lo que significa que se incluirán todas las versiones desde la versión inicial hasta la versión anterior a la versión final.

Por ejemplo, para incluir todas las versiones de la biblioteca Guava de Google desde la versión 30.0.0 hasta la versión 31.0.0, se puede declarar la dependencia de la siguiente manera:

```
dependencies {
    implementation 'com.google.guava:guava:[30.0.0, 31.0.0)'
}
```

También es posible utilizar otros operadores en lugar del intervalo [ ], como ( y ], para cambiar la inclusión de las versiones en el rango. Por ejemplo, para incluir todas las versiones hasta la versión 30.0.0, se puede declarar la dependencia de la siguiente manera:

```
dependencies {
    implementation 'com.google.guava:guava:(, 30.0.0]'
}
```

En este caso, el paréntesis indica que la versión inicial es cualquier versión anterior a la versión especificada, mientras que el corchete indica que la versión final es la versión especificada y todas las versiones posteriores.

--

## Declarar una libreria de un repositorio proyecto de gitHub

Utilizando el complemento maven:

```
repositories {
    maven {
        url 'https://jitpack.io'
    }
}
dependencies {
    implementation 'com.github.usuario:repositorio:version'
}
```

Notas:

Utilizando el complemento maven-publish:

```
plugins {
    id 'maven-publish'
}

repositories {
    maven {
        url 'https://jitpack.io'
    }
}

dependencies {
    implementation 'com.github.usuario:repositorio:version'
}

publishing {
    publications {
        maven(MavenPublication) {
            groupId 'com.github.usuario'
            artifactId 'repositorio'
            version 'version'
        }
    }
    repositories {
        maven {
            url 'https://jitpack.io'
        }
    }
}
```

--

### Tipos de inclusion de librerias con gradle

```
compileOnly
implementation
testImplementation
runtimeOnly
api
```

Notas:

se pueden declarar diferentes tipos de dependencias en el archivo build.gradle. Algunos de los tipos más comunes son:

    compileOnly: Esta dependencia solo se utiliza durante la compilación del proyecto, pero no se incluye en el archivo JAR o WAR resultante. Se utiliza para especificar dependencias que solo se necesitan durante la compilación, pero no se utilizan en tiempo de ejecución.

    implementation: Esta dependencia se utiliza durante la compilación y en tiempo de ejecución del proyecto. Se incluye en el archivo JAR o WAR resultante. Se utiliza para especificar dependencias que se necesitan tanto en tiempo de compilación como en tiempo de ejecución.

    testImplementation: Esta dependencia se utiliza durante la compilación y en tiempo de ejecución de las pruebas unitarias del proyecto. Se incluye en el classpath de las pruebas, pero no se incluye en el archivo JAR o WAR resultante.

    runtimeOnly: Esta dependencia se utiliza solo en tiempo de ejecución del proyecto, pero no durante la compilación. Se incluye en el archivo JAR o WAR resultante, pero no se utiliza durante la compilación del proyecto.

    api: Esta dependencia se utiliza durante la compilación y en tiempo de ejecución del proyecto, y se incluye en el archivo JAR o WAR resultante. Además, todas las dependencias transitivas de esta dependencia también se incluyen en el archivo JAR o WAR. Se utiliza para especificar una dependencia que es parte de la API pública del proyecto y que debe estar disponible para los consumidores de la misma.

Existen otros tipos de dependencias en Gradle, como annotationProcessor, compileClasspath, runtimeClasspath, entre otros, que se utilizan en situaciones específicas.

--

### Api vs Dependencia

- Una api alguien puede utilizar los métodos de la api desde mi librería
- Una dependencia No se puede → solo los puede usar mi librería en local

--

### Precedencia y exportacion de dependencias

Existe precedencia cuando hay conflicto entre clases iguales

- 1° la mas arriba del build path → order export
- **export** ⇒ cualquiera que use mi liberia tendrá acceso a las librerias externas que esa integre.

--

### Inclusión de una libreria a través de repositorios

En este modo, se especifica la dependencia en el archivo build.gradle y Gradle se encarga de buscar la librería en los repositorios especificados.

Ejemplo: se desea agregar la librería Log4j --> incluir la siguiente línea en el archivo build.gradle:

```
dependencies {
    implementation 'org.apache.logging.log4j:log4j-core:2.17.1'
}
```

Gradle buscará la librería Log4j en los repositorios remotos especificados en el archivo settings.gradle, la descargará y la agregará al classpath del proyecto.

--

### Inclusión e una libreria local

En este modo, se especifica la ruta de la librería en el sistema de archivos local. Por ejemplo, si se tiene la librería Log4j en la carpeta /lib del proyecto, se puede incluir la siguiente línea en el archivo build.gradle:

```
dependencies {
    implementation files('lib/log4j-core-2.17.1.jar')
}
```

Al hacer esto, Gradle agregará la librería al classpath del proyecto y podrá ser utilizada en el mismo.

---

# Comprobación de conocimientos

- Checklist:
  - Explica en 1 frase qué hace Spring Initializr
  - Nombra 3 comandos Maven útiles
  - Indica qué scope usarías para JUnit

Notas:
- Preguntas en clase: pedir a 2 alumnos que muestren el pom.xml y expliquen dónde van las dependencias.

---

# Fin de la presentacion

<a href="..\..\README.md">Ir al indice de Presentaciones</a>

<a href="../Sesion4/Sesion4.md">Ir a la Sesion 4</a>