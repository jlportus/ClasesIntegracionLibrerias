# Repositorios

# Gradle/Maven

---

### INDICE

- [Repositorios](#repositorios)
- [Gradle/Maven](#gradlemaven)
    - [INDICE](#indice)
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
  - [Crear un proyecto gradle](#crear-un-proyecto-gradle)
  - [Crear proyecto gradle por consola](#crear-proyecto-gradle-por-consola)
  - [Declaracion de dependencias en gradle](#declaracion-de-dependencias-en-gradle)
  - [Declarar una libreria de un repositorio proyecto de gitHub](#declarar-una-libreria-de-un-repositorio-proyecto-de-github)
    - [Tipos de inclusion de librerias con gradle](#tipos-de-inclusion-de-librerias-con-gradle)

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
Restricciones/implicaciones de licencias

- Linking - linking of the licensed code with code licensed under a different license (e.g. when the code is provided as a library)
- Distribution - distribution of the code to third parties
- Modification - modification of the code by a licensee
- Patent grant - protection of licensees from patent claims made by code contributors regarding their contribution, and protection of contributors from patent claims made by licensees
- Private use - whether modification to the code must be shared with the community or may be used privately (e.g. internal use by a corporation)
- Sublicensing - whether modified code may be licensed under a different license (for example a copyright) or must retain the same license under which it was provided
- TM grant - use of trademarks associated with the licensed code or its contributors by a licensee

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

default lifecycle phases executed.

    validate: _validate the project is correct and all necessary information is available_
    compile: _compile the source code of the project_
    test: _test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed_

        [...]

    package: _take the compiled code and package it in its distributable format, such as a JAR._
    integration-test: _process and deploy the package if necessary into an environment where integration tests can be run_
    verify: _run any checks to verify the package is valid and meets quality criteria_
    install: _install the package into the local repository, for use as a dependency in other projects locally_
    deploy: _done in an integration or release environment, copies the final package to the remote repository for sharing with other developers and projects._

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
gradle install
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

## Crear un proyecto gradle

- Por consola
- Con un IDE (Eclipse)

Notas:

---

## Crear proyecto gradle por consola

1. Ejecutar

```
# Comporbar version de gradle
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

---

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

---

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

---

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

**Inclusión de una libreria a través de repositorios**
En este modo, se especifica la dependencia en el archivo build.gradle y Gradle se encarga de buscar la librería en los repositorios especificados. Por ejemplo, si se desea agregar la librería Log4j en un proyecto, se puede incluir la siguiente línea en el archivo build.gradle:

groovy

dependencies {
implementation 'org.apache.logging.log4j:log4j-core:2.17.1'
}

Al hacer esto, Gradle buscará la librería Log4j en los repositorios remotos especificados en el archivo settings.gradle. Si la librería se encuentra, Gradle la descargará y la agregará al classpath del proyecto.

**Inclusión e una libreria local**
En este modo, se especifica la ruta de la librería en el sistema de archivos local. Por ejemplo, si se tiene la librería Log4j en la carpeta /lib del proyecto, se puede incluir la siguiente línea en el archivo build.gradle:

groovy

dependencies {
implementation files('lib/log4j-core-2.17.1.jar')
}

Al hacer esto, Gradle agregará la librería al classpath del proyecto y podrá ser utilizada en el mismo.
