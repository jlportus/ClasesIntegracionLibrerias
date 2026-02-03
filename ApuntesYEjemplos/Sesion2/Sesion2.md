# JAR y WAR. HolaLibrería en Java y JS (Sesión 2)

<a href="..\..\README.md">indice de Presentaciones</a>

---

### INDICE

- [JAR y WAR. HolaLibrería en Java y JS (Sesión 2)](#jar-y-war-holalibrería-en-java-y-js-sesión-2)
    - [INDICE](#indice)
    - [Artefacto](#artefacto)
  - [JAR](#jar)
    - [Ejemplo: ejecutar un JAR (cuando es ejecutable)](#ejemplo-ejecutar-un-jar-cuando-es-ejecutable)
  - [WAR](#war)
    - [Ejemplo: despliegue (idea)](#ejemplo-despliegue-idea)
  - [Estructura típica de un proyecto Java](#estructura-típica-de-un-proyecto-java)
  - [HolaLibrería: diseño de una librería simple](#holalibrería-diseño-de-una-librería-simple)
    - [Código de ejemplo (librería)](#código-de-ejemplo-librería)
    - [Tests mínimos (recomendado)](#tests-mínimos-recomendado)
  - [HolaLibrería: aplicación consumidora](#holalibrería-aplicación-consumidora)
  - [Breve introducción a librerías JavaScript (ESM y CJS)](#breve-introducción-a-librerías-javascript-esm-y-cjs)
  - [Ejercicio Sesión 2](#ejercicio-sesión-2)
    - [Entregable sugerido (estructura)](#entregable-sugerido-estructura)
  - [Criterios de entrega](#criterios-de-entrega)
- [Fin de la presentación](#fin-de-la-presentación)

---

# Objetivos de la sesión

- Entender qué es un artefacto (JAR/WAR)
- Diseñar y empaquetar una librería y su consumidor
- Escribir tests mínimos y README

Notas:
- Entregable: repositorio con librería y consumidor funcional

---

### Artefacto

Un **artefacto** es el resultado empaquetado de un proceso de build que se puede **distribuir** e **integrar** en otros proyectos.

Ejemplos de artefactos:

- Java: `JAR`, `WAR`
- JavaScript: paquete `npm`
- .NET: `DLL`, `NuGet package`

Notas:
En integración de librerías, el artefacto es la “unidad de intercambio”. No trabajamos con “carpetas sueltas” que cada uno copia a mano, sino con paquetes versionados que un gestor de dependencias puede descargar desde un repositorio. Por eso, la asignatura insiste tanto en empaquetado, repositorios y versiones: sin artefacto no hay integración reproducible.

---

## JAR

Un **JAR** (Java ARchive) es un archivo empaquetado (ZIP) que contiene:

- `.class` compilados
- recursos (config, plantillas, etc.)
- metadatos (p. ej. `META-INF`)

Un JAR puede ser:

- **Librería** (para que otros la consuman)
- **Aplicación ejecutable** (si incluye `Main-Class` en el manifiesto)

Notas:
Piensa en el JAR como la “caja” estándar de Java para distribuir código compilado. Cuando integras una librería en Java, normalmente estás añadiendo un JAR como dependencia. Un JAR de librería no necesita ser ejecutable: su objetivo es ofrecer clases que otra aplicación utilizará. En cambio, un “fat jar” o un jar ejecutable sí está pensado para arrancar directamente con `java -jar`. Más adelante veremos cuándo interesa uno u otro, pero hoy nos quedamos con la idea base: un JAR es un artefacto distribuible.

--

### Ejemplo: ejecutar un JAR (cuando es ejecutable)

```bash
java -jar mi-aplicacion.jar
```

Notas:
Esto solo funciona si el JAR tiene configurado el punto de entrada (clase main) en el manifiesto. En librerías puras no suele existir ese punto de entrada porque no “arrancan” por sí mismas: las consume otra aplicación.

---

## WAR

Un **WAR** (Web ARchive) es un artefacto para aplicaciones web Java, pensado para desplegarse en un servidor/contendor (Tomcat, etc.).

Contiene:

* clases compiladas (`WEB-INF/classes`)
* librerías (`WEB-INF/lib`)
* recursos web (html, jsp, etc.)

Notas:
El WAR aparece cuando tu aplicación es “web tradicional” en Java (servlet/JSP o frameworks que terminan desplegándose en contenedor). Un punto clave para integración: dentro del WAR hay una carpeta `WEB-INF/lib` donde terminan muchas dependencias (JARs) que tu aplicación necesita. Esto ayuda a entender por qué a veces “falta una clase” en runtime: o no se empaquetó la dependencia, o se empaquetó una versión distinta, o el contenedor aporta otras librerías que chocan.

--

### Ejemplo: despliegue (idea)

* Copiar el `.war` a la carpeta `webapps/` de Tomcat
* Tomcat lo despliega y crea el contexto de la aplicación

Notas:
En la sesión dedicada a servidor se verá el paso a paso real (carpetas, logs, puertos, permisos). Aquí solo interesa diferenciar que el WAR es un artefacto de despliegue en servidor, no un jar que ejecutas directamente.

---

## Estructura típica de un proyecto Java

Estructura habitual (Maven/Gradle):

```text
mi-proyecto/
  src/
    main/
      java/
      resources/
    test/
      java/
      resources/
  pom.xml  (o build.gradle)
```

Notas:
Esta estructura se repite porque los build tools la esperan por convención. Es importante porque integra varios aspectos: código principal, recursos y tests. Cuando creas una librería, normalmente publicas el resultado compilado (JAR) y puede incluir recursos necesarios. Los tests no se publican como parte de la librería, pero son esenciales para garantizar que la librería funciona y que su API mantiene el contrato esperado.

---

## HolaLibrería: diseño de una librería simple

Objetivo de la librería:

* exponer una API mínima, estable y fácil de consumir
* un caso sencillo: cálculo de totales con IVA y descuentos

Interfaz (ejemplo):

* `totalConIva(base, iva)`
* `totalConDescuento(base, descuento)`
* `totalFinal(base, iva, descuento)`

Notas:
Diseñar una librería no es solo escribir funciones. Es elegir una API coherente: nombres claros, tipos de datos apropiados, manejo de errores y documentación mínima. Aunque sea un ejemplo pequeño, queremos que el alumnado practique el patrón real: separar “lógica reutilizable” en un módulo de librería y consumirla desde un proyecto distinto. Esta separación forzará a entender empaquetado y dependencias.

--

### Código de ejemplo (librería)

`src/main/java/com/curso/libreria/CalculadoraTotales.java`

```java
package com.curso.libreria;

public final class CalculadoraTotales {

  private CalculadoraTotales() {}

  public static double totalConIva(double base, double iva) {
    if (base < 0) throw new IllegalArgumentException("base no puede ser negativa");
    if (iva < 0) throw new IllegalArgumentException("iva no puede ser negativo");
    return base * (1.0 + iva);
  }

  public static double totalConDescuento(double base, double descuento) {
    if (base < 0) throw new IllegalArgumentException("base no puede ser negativa");
    if (descuento < 0) throw new IllegalArgumentException("descuento no puede ser negativo");
    return base * (1.0 - descuento);
  }

  public static double totalFinal(double base, double iva, double descuento) {
    return totalConDescuento(totalConIva(base, iva), descuento);
  }
}
```

Notas:
El ejemplo introduce buenas prácticas mínimas: clase utilitaria `final`, constructor privado, y validaciones básicas. La idea no es “ser perfectos”, sino empezar a interiorizar que una librería es un producto que otros usarán. Si no validas entradas o no documentas comportamiento, el consumidor sufrirá. Además, estas validaciones facilitan escribir tests en la siguiente fase: puedes comprobar que las condiciones se cumplen y que los errores son explícitos.

--

### Tests mínimos (recomendado)

`src/test/java/com/curso/libreria/CalculadoraTotalesTest.java`

```java
package com.curso.libreria;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculadoraTotalesTest {

  @Test
  void totalConIva_calculaCorrecto() {
    assertEquals(121.0, CalculadoraTotales.totalConIva(100.0, 0.21), 0.0001);
  }

  @Test
  void totalFinal_componeOperaciones() {
    assertEquals(108.9, CalculadoraTotales.totalFinal(100.0, 0.21, 0.10), 0.0001);
  }
}
```

Notas:
Aunque JUnit se vea en sesiones posteriores, es importante introducir desde el principio la idea de “librería verificable”. Un consumidor confía más en una librería que aporta tests. Además, cuando cambie una versión, los tests te darán señales claras de si has roto el contrato.

---

## HolaLibrería: aplicación consumidora

Objetivo del consumidor:

* depender de la librería
* ejecutar un ejemplo mínimo y visible

Código de ejemplo:

`src/main/java/com/curso/app/App.java`

```java
package com.curso.app;

import com.curso.libreria.CalculadoraTotales;

public class App {
  public static void main(String[] args) {
    double base = 100.0;
    double iva = 0.21;
    double descuento = 0.10;

    double total = CalculadoraTotales.totalFinal(base, iva, descuento);
    System.out.println("Total final = " + total);
  }
}
```

Notas:
El “consumidor” es un proyecto diferente (o un módulo diferente) que depende de la librería. Esto es clave: si el consumidor compila y ejecuta, significa que la integración está correctamente definida. En la vida real, este consumidor puede ser un backend, una app batch o una web. Aquí basta con una aplicación de consola para demostrar el punto: la librería se integra como dependencia y se usa desde código ajeno.

---

## Breve introducción a librerías JavaScript (ESM y CJS)

En la parte de frontend también aplican los mismos principios: separar lógica reutilizable (librería) de la aplicación que la consume. En JavaScript moderno se usan sobre todo **ES Modules (ESM)**, aunque en entornos Node sigue existiendo **CommonJS (CJS)**.

- ESM: `export` / `import` (navegadores y Node modernos)
- CJS: `module.exports` / `require` (histórico en Node)

--

Ejemplo mínimo (ESM):

`lib/finanzas-esm.js`

```js
export function calcularIva(base, tipoIva) {
  if (base < 0) throw new Error('La base no puede ser negativa');
  if (tipoIva < 0) throw new Error('El tipo de IVA no puede ser negativo');
  return base * tipoIva;
}

export function calcularTotal(base, tipoIva) {
  return base + calcularIva(base, tipoIva);
}
```
--

`app-esm.js`

```js
import { calcularIva, calcularTotal } from './lib/finanzas-esm.js';

console.log('IVA:', calcularIva(100, 0.21));
console.log('Total:', calcularTotal(100, 0.21));
```

Notas:

- Para ejecutar en navegador usa `<script type="module" src="app-esm.js"></script>` y sirve los archivos por HTTP.
- En Node (si es ESM) asegúrate de `"type": "module"` en `package.json` o usa extensión `.mjs`.

Ejercicio propuesto (JS):

- Implementar la `CalculadoraTotales` en JS (ESM) con las mismas funciones que la versión Java.
- Crear una página simple que consuma la librería con un formulario y muestre resultados.

> Para más contenido y ejemplos en JavaScript revisa `EjercicioSesion2/LibreriasJS.md`.

---

## Ejercicio Sesión 2

Crear **dos proyectos** (o dos módulos) en un repositorio:

1. `calculadora-totales-lib`

* contiene la clase `CalculadoraTotales`
* empaqueta como **JAR**

2. `calculadora-totales-app`

* depende de la librería
* ejecuta un `main` que muestre resultados

Requisitos:

* Validar entradas básicas (mínimo: no negativos)
* Incluir un ejemplo ejecutable (main)
* Incluir README con instrucciones de build/ejecución

Notas:
El ejercicio busca separar claramente “lógica reutilizable” y “aplicación”. Esto obliga a interiorizar el concepto de dependencia: la app no copia la clase, la consume. El README es parte de la integración: si otro compañero no puede ejecutar tu ejemplo siguiendo instrucciones, la integración no está completa. No hace falta un proyecto enorme: lo importante es que el flujo sea real y repetible.

--

### Entregable sugerido (estructura)

```text
repo/
  calculadora-totales-lib/
    src/main/java/...
    src/test/java/...
    pom.xml o build.gradle
  calculadora-totales-app/
    src/main/java/...
    pom.xml o build.gradle
  README.md
```

Notas:
Esta organización facilita evaluar y ejecutar. En Maven/Gradle puede ser multi-módulo o repos separados, pero para empezar es preferible un único repo con dos carpetas. En sesiones posteriores se trabajará la publicación en repositorio para que el consumidor no tenga que estar en el mismo repo.

---

## Criterios de entrega

* Se ve claramente qué es **librería** y qué es **consumidor**
* Compila en una máquina limpia siguiendo el README
* No hay Copy&Paste de la clase en el consumidor
* Hay al menos 2 tests que verifiquen cálculos básicos

Notas:
Los criterios reflejan la realidad profesional: si no es reproducible, no es integrable. La separación librería/consumidor demuestra que has entendido el modelo de dependencia. Los tests no son “extra”: son la base para poder evolucionar la librería en futuras sesiones sin romper a los consumidores sin darte cuenta.

---

# Comprobación de conocimientos

- Checklist:
  - ¿Qué es un artefacto? (1 frase)
  - Describe estructura mínima de un proyecto Java
  - ¿Por qué es importante separar librería y consumidor?

Notas:
- Preguntas rápidas: identifica dónde van los tests y qué debe contener el README.

---

# Fin de la presentación

- <a href="./EjercicioSesion2/Enunciado ejercicioSesion2.md">Libreira JAVA</a>
- <a href="./EjercicioSesion2/LibreriasJS.md">Libreira JS</a>

<a href="..\..\README.md">Ir al indice de Presentaciones</a>
<a href="../Sesion3/Sesion3.md">Ir a la Sesion 3</a>

Notas:
Resumen: hoy se han introducido artefactos Java (JAR/WAR) y el patrón mínimo de integración: librería separada + consumidor que depende de ella. Este patrón se repetirá con Maven/Gradle, repositorios y publicación remota. La próxima sesión profundiza en gestores de construcción, su estructura y cómo declaran dependencias para producir artefactos reproducibles.
