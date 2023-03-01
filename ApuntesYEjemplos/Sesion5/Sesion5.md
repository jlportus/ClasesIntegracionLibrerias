# Repositorios

# Trabajando con librerías en local

---

### INDICE

- [Repositorios](#repositorios)
- [Trabajando con librerías en local](#trabajando-con-librerías-en-local)
    - [INDICE](#indice)
  - [Proyecto API-Libreria](#proyecto-api-libreria)
  - [Integrando Librerias](#integrando-librerias)
    - [Integrar Proyecto Local](#integrar-proyecto-local)
- [Fin de la presentacion](#fin-de-la-presentacion)

---

## Proyecto API-Libreria

**Propósito:**
Generar un proyecto-API con SpringBoot

Generar Un proyecto-LIB con Springboot

Utilizar ambos

---

## Integrando Librerias

Voy a utilizar código de otro proyecto en el mio. Podré desarrollar por un lado el proyecto-**API** para realizar la persistencia y la capa REST y en otro proyecto-**LIB** (mi libreria) desarrollaré la lógica de mi negocio (java "puro")

Ambos proyectos deberían ser Proyectos Gradle:

- El de la API con Spring con todas las dependencias para REST y persistencia
- El de la LIB sera un proyecto Gradle Spring, sin dependencias (aunque se le quitarán las anotaciones Spring).

---


<img title="Capas" src="https://www.techopedia.com/images/uploads/3b108f50042e4c398169ec3fa43d9b94.png">

Notas:
https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador
https://www.freecodecamp.org/espanol/news/el-modelo-de-arquitectura-view-controller-pattern/


---

### Integrar Proyecto Local

Prerrequisitos:

- Está generado el proyecto API y la libreria con Spring.
- Están en local (clonados o generados).
- Ambos Proyectos deberian tener su propio **GIT**

---

1. El `proyecto-LIBreria` esta en la misma carpeta donde está mi `proyecto-API` (en carpetas hermanas).
2. Al proyecto **LIB**reria le quito todas las anotaciones e importaciones de Spring
   - En el main
     - @SpringApplication
     - SpringContext = `SpringApplication.run`
   - dependencias y plugins Spring del build.gradle
   - La carpeta de Tests
3. Importar ambos proyectos Gradle en eclipse.
   - Usar valores por defecto
4. En el `build.gradle` del proyecto **LIB**
   - **NO** puede haber plugins de `Springframework`
   - Eclipse Necesita el plugin
     - `id 'java'`
     - `id 'java-library'`
     - `id 'eclipse'`
5. En el **`settings.gradle`** del proyecto **API**
   - Debe coincidir el nombre del directorio con el del preyecto
     `rootProject.name = 'nombreProyectoAPI'` (si esta hecho con Spring lo genera automáticamente)
   - Introduzco una linea nueva con:
     `includeFlat 'proyecto-LIBreria'`
     > Debe ser el mismo nombre que tiene el proyectoLIB en su settings.gradle
6. En el **`build.gradle`** del proyecto **API**
   - Introduzco en el apartado **`dependencias`**
     ```
     dependencies {
       //
       implementation project(':proyecto-LIBreria')
     }
     ```
7. Ejecutar **Refresh gradle project**
   - en propiedades de mi proyecto en java build path → saldrá la librería como una dependencia
8. Ejecutar en eclipse gradle
   **gradle task ide ⇒ generate all eclipse files**

> En propiedades de mi proyecto en java build path (o en la carpeta Project and External Dependencies) → saldrá la librería como una dependencia

> Comprobar llamando desde la API a una clase de la libreria

---

# Fin de la presentacion 
<a href="./index.html#/6">Ir al indice de presentaciones</a>

<a href="./sesion6.html">Ir a la Sesion 6</a>

---