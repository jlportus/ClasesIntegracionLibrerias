# Ejercicio Sesion 2

# Guía práctica en Eclipse: de “una clase” a librería JAR + app ejecutable

<a href="..\..\README.md">Ir al indice de Presentaciones</a>

---

### INDICE

- [Ejercicio Sesion 2](#ejercicio-sesion-2)
- [Guía práctica en Eclipse: de “una clase” a librería JAR + app ejecutable](#guía-práctica-en-eclipse-de-una-clase-a-librería-jar--app-ejecutable)
    - [INDICE](#indice)
  - [Objetivo](#objetivo)
- [Fase 1: Un solo proyecto con clase de utilidades](#fase-1-un-solo-proyecto-con-clase-de-utilidades)
    - [1. Crear el proyecto en Eclipse](#1-crear-el-proyecto-en-eclipse)
    - [2. Crear paquetes y clases](#2-crear-paquetes-y-clases)
    - [3. Código de la utilidad (en el mismo proyecto)](#3-código-de-la-utilidad-en-el-mismo-proyecto)
    - [4. Código del consumidor inicial](#4-código-del-consumidor-inicial)
- [Fase 2: Refactor a dos proyectos (librería + consumidor)](#fase-2-refactor-a-dos-proyectos-librería--consumidor)
    - [5. Crear el proyecto de librería](#5-crear-el-proyecto-de-librería)
    - [6. Mover la clase de utilidades al proyecto de librería](#6-mover-la-clase-de-utilidades-al-proyecto-de-librería)
    - [7. Ajustar el consumidor](#7-ajustar-el-consumidor)
    - [8. Añadir el proyecto librería al Build Path del consumidor](#8-añadir-el-proyecto-librería-al-build-path-del-consumidor)
- [Fase 3: Generar el JAR de la librería](#fase-3-generar-el-jar-de-la-librería)
    - [9. Exportar el JAR de la librería](#9-exportar-el-jar-de-la-librería)
- [Fase 4: Eliminar el código de la librería del consumidor y consumir el JAR](#fase-4-eliminar-el-código-de-la-librería-del-consumidor-y-consumir-el-jar)
    - [10. Romper la dependencia entre proyectos (para simular integración real)](#10-romper-la-dependencia-entre-proyectos-para-simular-integración-real)
    - [11. Añadir el JAR externo al consumidor](#11-añadir-el-jar-externo-al-consumidor)
- [Fase 5: Crear un JAR ejecutable (java -jar) con interacción por consola](#fase-5-crear-un-jar-ejecutable-java--jar-con-interacción-por-consola)
    - [12. Mejorar la App para interacción por consola](#12-mejorar-la-app-para-interacción-por-consola)
    - [13. Exportar un “Runnable JAR” en Eclipse](#13-exportar-un-runnable-jar-en-eclipse)
  - [Comprobación final](#comprobación-final)
    - [14. Ejecutar fuera de Eclipse](#14-ejecutar-fuera-de-eclipse)
- [Ejercicio adicional](#ejercicio-adicional)
  - [A) Calculadora básica reutilizando una librería](#a-calculadora-básica-reutilizando-una-librería)
  - [B) Integrar opción de IVA y conversión euros/pesetas](#b-integrar-opción-de-iva-y-conversión-eurospesetas)
- [Fin de la presentación](#fin-de-la-presentación)

---

## Objetivo

Crear una mini solución que evoluciona en 5 fases:

1) Empezar con **un solo proyecto** Java y una clase de utilidades
2) **Refactorizar** a dos proyectos: **librería** y **aplicación consumidora**
3) Generar un **JAR de la librería**
4) Eliminar el código de la librería del consumidor y **consumir el JAR**
5) Generar un **JAR ejecutable** (`java -jar`) con interacción por consola:
   - el alumno introduce una cantidad
   - se calcula el IVA y el total

Notas:
Esta guía está orientada a Eclipse y a entender el flujo real de integración. La idea central es separar “código reutilizable” (librería) de “aplicación” (consumidor) y comprobar que el consumidor funciona incluso cuando el código de la librería ya no está presente, sino que se integra como artefacto JAR. Finalmente, se crea un JAR ejecutable para que el alumnado pueda probarlo sin Eclipse, solo con Java instalado.

---

# Fase 1: Un solo proyecto con clase de utilidades

### 1. Crear el proyecto en Eclipse

1. `File` → `New` → `Java Project`
2. Nombre: `CalculadoraTotalesApp`
3. JRE: seleccionar el que use el centro (por ejemplo, Java 11 o 17)
4. `Finish`

Notas:
En esta fase, todo vive en un solo proyecto para empezar rápido. Lo importante es crear una clase de utilidades que después se extraerá como librería.

--

### 2. Crear paquetes y clases

1. Botón derecho en `src` → `New` → `Package`
   - `com.curso.util`
2. Botón derecho en `com.curso.util` → `New` → `Class`
   - Nombre: `CalculadoraTotales`
   - Marcar `public static void main` **NO** (no es el main)
3. Crear paquete:
   - `com.curso.app`
4. Crear clase:
   - `App` (esta sí tendrá `main`)

Notas:
Separamos por paquetes para que el refactor posterior sea más limpio. `com.curso.util` se convertirá en librería. `com.curso.app` se quedará como consumidor.

--

### 3. Código de la utilidad (en el mismo proyecto)

`com.curso.util/CalculadoraTotales.java`

```java
package com.curso.util;

public final class CalculadoraTotales {

  private CalculadoraTotales() {}

  public static double calcularIva(double base, double tipoIva) {
    if (base < 0) throw new IllegalArgumentException("La base no puede ser negativa");
    if (tipoIva < 0) throw new IllegalArgumentException("El IVA no puede ser negativo");
    return base * tipoIva;
  }

  public static double calcularTotal(double base, double tipoIva) {
    return base + calcularIva(base, tipoIva);
  }
}
```

Notas:
La librería ofrece operaciones simples y reutilizables. Nombres claros y validación mínima. `calcularIva` devuelve el importe de IVA (no el total), y `calcularTotal` devuelve base + IVA. Esta distinción facilita el JAR ejecutable, donde se mostrarán ambos resultados.

--

### 4. Código del consumidor inicial

`com.curso.app/App.java`

```java
package com.curso.app;

import com.curso.util.CalculadoraTotales;

public class App {
  public static void main(String[] args) {
    double base = 100.0;
    double tipoIva = 0.21;

    double iva = CalculadoraTotales.calcularIva(base, tipoIva);
    double total = CalculadoraTotales.calcularTotal(base, tipoIva);

    System.out.println("Base: " + base);
    System.out.println("IVA (" + (tipoIva * 100) + "%): " + iva);
    System.out.println("Total: " + total);
  }
}
```

Notas:
Aquí todavía no hay librería “real”: solo hay una clase en el mismo proyecto. Pero la separación por paquetes y la importación simulan el uso. En la siguiente fase se extraerá el paquete `com.curso.util` a un proyecto de librería.

---

# Fase 2: Refactor a dos proyectos (librería + consumidor)

### 5. Crear el proyecto de librería

1. `File` → `New` → `Java Project`
2. Nombre: `CalculadoraTotalesLib`
3. `Finish`

Notas:
Este proyecto contendrá únicamente la clase reutilizable. Su salida final será un JAR que luego consumirá el proyecto App.

--

### 6. Mover la clase de utilidades al proyecto de librería

Opción A (recomendada, moviendo con refactor):

1. En `CalculadoraTotalesApp`, localizar `com.curso.util/CalculadoraTotales.java`
2. Botón derecho sobre la clase → `Refactor` → `Move...`
3. Elegir destino:

   * Proyecto: `CalculadoraTotalesLib`
   * Paquete: `com.curso.util` (si no existe, créalo)
4. `Finish`

Notas:
El refactor “Move” evita errores y mantiene referencias consistentes. Eclipse ajusta rutas y estructura automáticamente. Si durante el movimiento se cambia el package, habrá que corregir imports; lo ideal es mantener `com.curso.util` para minimizar cambios.

--

### 7. Ajustar el consumidor

En `CalculadoraTotalesApp`, comprobar que `App.java` sigue importando:

```java
import com.curso.util.CalculadoraTotales;
```

En este momento, el consumidor **aún no compilará** hasta que enlacemos ambos proyectos.

Notas:
Al mover la clase fuera del proyecto App, `App.java` sigue intentando importarla, pero ya no está en su classpath. La siguiente acción será añadir la dependencia del proyecto librería al proyecto consumidor dentro de Eclipse.

--

### 8. Añadir el proyecto librería al Build Path del consumidor

1. Botón derecho en `CalculadoraTotalesApp` → `Properties`
2. `Java Build Path` → pestaña `Projects`
3. `Add...` → marcar `CalculadoraTotalesLib`
4. `Apply and Close`

Notas:
Esto crea una dependencia “a nivel workspace”: el consumidor compila usando las clases del proyecto librería sin necesidad de generar un JAR aún. Es el paso intermedio típico antes de empaquetar y distribuir.

---

# Fase 3: Generar el JAR de la librería

### 9. Exportar el JAR de la librería

1. Botón derecho en `CalculadoraTotalesLib` → `Export...`
2. `Java` → `JAR file` → `Next`
3. Seleccionar:

   * Proyecto: `CalculadoraTotalesLib`
   * Asegurar que incluye `src` compilado (Eclipse empaqueta `.class`)
4. Ruta del JAR:

   * por ejemplo: `C:\temp\CalculadoraTotalesLib.jar` (o carpeta del proyecto)
5. `Finish`

Notas:
Aquí creamos el artefacto distribuible. Este JAR es lo que un proyecto externo debería consumir. Es importante guardar el JAR en un lugar conocido porque en la siguiente fase lo añadiremos al consumidor como “external jar”.

---

# Fase 4: Eliminar el código de la librería del consumidor y consumir el JAR

### 10. Romper la dependencia entre proyectos (para simular integración real)

1. Botón derecho `CalculadoraTotalesApp` → `Properties`
2. `Java Build Path` → `Projects`
3. Seleccionar `CalculadoraTotalesLib` → `Remove`
4. `Apply and Close`

Notas:
Este paso es clave: queremos que el consumidor funcione aunque el proyecto librería no esté en el workspace. Si no quitamos esta referencia, en realidad no estaríamos “consumiendo el JAR”, estaríamos consumiendo el código fuente del otro proyecto.

--

### 11. Añadir el JAR externo al consumidor

1. Botón derecho `CalculadoraTotalesApp` → `Properties`
2. `Java Build Path` → pestaña `Libraries`
3. `Add External JARs...`
4. Seleccionar `CalculadoraTotalesLib.jar`
5. `Apply and Close`

Notas:
Ahora el proyecto App integra la librería como dependencia binaria (JAR), que es el escenario real en CI/CD o cuando el JAR viene de un repositorio. Si el código compila y corre, la integración está bien definida.

---

# Fase 5: Crear un JAR ejecutable (java -jar) con interacción por consola

### 12. Mejorar la App para interacción por consola

Editar `com.curso.app/App.java`:

```java
package com.curso.app;

import java.util.Locale;
import java.util.Scanner;
import com.curso.util.CalculadoraTotales;

public class App {

  public static void main(String[] args) {
    Locale.setDefault(Locale.US); // evitar problemas con coma/punto según configuración
    try (Scanner sc = new Scanner(System.in)) {

      System.out.print("Introduce una base imponible (€): ");
      double base = sc.nextDouble();

      System.out.print("Introduce el tipo de IVA (ej. 0.21): ");
      double tipoIva = sc.nextDouble();

      double iva = CalculadoraTotales.calcularIva(base, tipoIva);
      double total = CalculadoraTotales.calcularTotal(base, tipoIva);

      System.out.println();
      System.out.println("Base: " + base + " €");
      System.out.println("IVA (" + (tipoIva * 100) + "%): " + iva + " €");
      System.out.println("Total: " + total + " €");
    }
  }
}
```

Notas:
La interacción por consola permite que el alumnado ejecute la aplicación sin tocar código. Se pide base e IVA. Se muestra tanto el IVA calculado como el total. Se usa `Scanner` para simplificar. La línea `Locale.setDefault(Locale.US)` es una prevención habitual: en algunos entornos europeos el separador decimal es coma y `Scanner.nextDouble()` puede fallar si el alumno escribe “100,5”. Si se desea permitir coma, se puede ajustar el `Locale` o leer como `String` y reemplazar coma por punto.

--

### 13. Exportar un “Runnable JAR” en Eclipse

1. Botón derecho en `CalculadoraTotalesApp` → `Export...`
2. `Java` → `Runnable JAR file` → `Next`
3. `Launch configuration`:

   * elegir `CalculadoraTotalesApp - App` (o la configuración del main `com.curso.app.App`)
4. `Export destination`:

   * por ejemplo: `C:\temp\CalculadoraTotalesApp.jar`
5. `Library handling`:

   * seleccionar **“Package required libraries into generated JAR”**
6. `Finish`

Notas:
Este es el punto más importante: un JAR ejecutable necesita incluir o referenciar las librerías que usa. Como tu aplicación depende de `CalculadoraTotalesLib.jar`, si no lo empaquetas dentro del runnable jar, al ejecutar con `java -jar` fallará con `ClassNotFoundException`. La opción “Package required libraries into generated JAR” crea un JAR “autocontenido” para el alumno.

---

## Comprobación final

### 14. Ejecutar fuera de Eclipse

En una terminal (en la carpeta donde está el jar):

```bash
java -jar CalculadoraTotalesApp.jar
```

Salida esperada (ejemplo):

```text
Introduce una base imponible (€): 100
Introduce el tipo de IVA (ej. 0.21): 0.21

Base: 100.0 €
IVA (21.0%): 21.0 €
Total: 121.0 €
```

Notas:
La validación real del trabajo es esta: que el alumno pueda ejecutar el jar sin Eclipse. Si esto funciona, significa que la integración es correcta y que el jar incluye lo necesario.

---

# Ejercicio adicional

## A) Calculadora básica reutilizando una librería

Objetivo:

* Crear una librería `OperacionesBasicasLib` con operaciones:

  * `sumar(a,b)`, `restar(a,b)`, `multiplicar(a,b)`, `dividir(a,b)`
* Crear una app `CalculadoraConsolaApp` que:

  * muestre un menú
  * permita elegir operación
  * pida números por consola
  * muestre el resultado

Requisitos:

* La app **no** implementa operaciones directamente: debe llamarlas desde la librería
* Generar JAR de librería y consumirlo como dependencia (igual que en la guía)
* Crear un runnable jar ejecutable

Notas:
Este ejercicio refuerza el patrón: librería separada + consumidor + jar. Además introduce diseño de API: cómo nombrar métodos, cómo manejar división por cero, etc. El menú obliga a estructurar el programa de forma algo más realista, pero sigue siendo manejable.

--

## B) Integrar opción de IVA y conversión euros/pesetas

Ampliación:

* Añadir a la librería (o a una librería nueva `FinanzasLib`) métodos:

  * `calcularIva(base, tipoIva)`
  * `calcularTotal(base, tipoIva)`
  * `eurosAPesetas(euros)`
  * `pesetasAEuros(pesetas)`

Sugerencia (factor de conversión fijo):

```java
public static double eurosAPesetas(double euros) {
  return euros * 166.386;
}
public static double pesetasAEuros(double pesetas) {
  return pesetas / 166.386;
}
```

Requisitos:

* En la consola, incluir opciones:

  * cálculo de IVA/total
  * conversión euros↔pesetas
* Reutilizar código: **no duplicar** cálculos en la app

Notas:
Este bloque añade dos ideas: (1) ampliar una librería sin romper consumidores (si ya existe un contrato, ¿cómo evolucionas?) y (2) diseño de menú y flujos de entrada. El factor de conversión euro/peseta es constante y suficiente para el ejercicio. Lo relevante es que el alumnado practique integración y reutilización, no la economía. En evaluación conviene comprobar que las conversiones están en librería y que la app solo orquesta interacción.

---

# Fin de la presentación

`<a href="..\..\README.md">`Ir al indice de Presentaciones`</a>`
`<a href="./EjercicioSesion2/LibreriasJS.md">`Ir a Ejercicio JS`</a>`
`<a href="../Sesion2/Sesion2.md">`Ir a la Sesion 2`</a>`

Notas:
Esta práctica reproduce un flujo profesional simplificado: empezar con código local, extraer a librería, empaquetar como JAR, integrar como binario y finalmente distribuir una aplicación ejecutable. El alumno termina con un `java -jar` que funciona sin IDE, lo que demuestra integración real. El ejercicio adicional refuerza reutilización y evolución de librerías, incorporando más de una funcionalidad (operaciones, IVA y conversión) sin duplicar lógica.
