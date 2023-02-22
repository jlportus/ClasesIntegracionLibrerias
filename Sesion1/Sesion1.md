# Conceptos Generales de LibrerÍas

---

### INDICE

- [Conceptos Generales de LibrerÍas](#conceptos-generales-de-librerías)
    - [INDICE](#indice)
    - [Librería](#librería)
    - [Librería vs Biblioteca](#librería-vs-biblioteca)
    - [Características de Librerías](#características-de-librerías)
    - [Características de Librerías II](#características-de-librerías-ii)
    - [Uso de Librería vs Copy\&Paste](#uso-de-librería-vs-copypaste)
    - [Librería vs FRAMEWORK](#librería-vs-framework)
    - [Repositorio](#repositorio)
    - [Gestores de dependencias](#gestores-de-dependencias)

---

### Librería

**Las bibliotecas de código:**

> Son conjuntos de funciones y procedimientos preescritos que pueden ser utilizados para realizar tareas específicas en un programa.

[Biblioteca de código Wikipedia](<https://es.wikipedia.org/wiki/Biblioteca_(inform%C3%A1tica)>)

Notas:
[Guion de la asignatura DIM XLIII](https://web.institutomilitar.com/librerias.html)

---

### Librería vs Biblioteca

> **Library** : En realidad la traducción literal del ingles de _library_ es **BIBLIOTECA** y lo que en castellano es una librería en ingles es una _bookstore_

---

### Características de Librerías

- No están desarrolladas para ejecutarse por si solas, si no en otros programas
- Se pueden utilizar en diferentes proyectos sin tener que escribir el código desde cero.
  - Permiten reutilización
- Permiten ahorrar tiempo y esfuerzo al no tener que escribir funciones comunes desde cero.
- Simplifican mantenimiento
- Están optimizadas (mas eficientes)
- Desarrolladas por otros programadores (_"expertos_")
- **DOCUMENTACIÓN**
- Aumenta la confiabilidad del código ya que las bibliotecas suelen ser ampliamente probadas y utilizadas.

Notas:

### Características de Librerías II

- **Ahorro de tiempo**: Las bibliotecas de código pueden ahorrar mucho tiempo en el desarrollo de software, ya que los desarrolladores no tienen que escribir todo el código desde cero. En lugar de eso, pueden utilizar una biblioteca existente y reutilizar el código que ya ha sido probado y optimizado.

- **Mayor eficiencia**: Las bibliotecas de código suelen estar escritas por expertos y contienen algoritmos y estructuras de datos optimizadas, lo que puede mejorar significativamente el rendimiento y la eficiencia de un programa.

- **Mejora de la calidad del software**: Las bibliotecas de código son ampliamente utilizadas y probadas por una gran comunidad de desarrolladores, lo que aumenta la confiabilidad y la calidad del software que utiliza esas bibliotecas.

- **Facilidad de uso**: Las bibliotecas de código suelen tener una documentación detallada y una API clara y consistente, lo que hace que sea más fácil para los desarrolladores entender y utilizar las bibliotecas.

- **Actualizaciones y mantenimiento**: Las bibliotecas de código suelen ser mantenidas y actualizadas por la comunidad de desarrolladores, lo que significa que los desarrolladores pueden confiar en que las bibliotecas se mantendrán al día y estarán disponibles en el futuro.

- **Soluciones especializadas:** Las bibliotecas de código pueden ofrecer soluciones especializadas a problemas específicos, lo que permite a los desarrolladores enfocarse en la lógica de negocio de su aplicación y no en solucionar problemas comunes y ya resueltos

---

### Uso de Librería vs Copy&Paste

---

### Librería vs FRAMEWORK

**Coincidencias**

1. Ambas son código reusable escrito por terceros generalmente.

**Diferencias**

2. Una librería ofrece generalmente una funcionalidad única y concreta
3. Un framework ofrece un conjunto global de soluciones para hacer una aplicación completa

[**Inversion de Control**](https://en.wikipedia.org/wiki/Inversion_of_control)

---

### Repositorio

> Lugar en el que se almacena, organiza y distribuye código de aplicaciones o programas

|                                                                                           |                                                                       |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Repositorios de proyectos**<br/>- GitHub<br/>- GitLab<br/>- SourceForge<br/>- Bitbucket | **Repositorios de Librerías** <br/>- mavenCentral<br/>- npmRepository |

Notas:
¿cual es la diferencia entre ambos tipos?
abrir  un compilado

---

### Gestores de dependencias

> Herramienta que se encarga de descargar y organizar las dependencias de terceros (librerías) empleadas en un proyecto de manera automática.

|                                                                                                                |                                                          |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Gestores de Backend**<br/>- Maven --> Java<br/>- Gradle --> Java<br/>- Composer --> PHP<br/>- NuGet --> .NET | **Gestores de Frontend**<br/>- Node + npm --> JavaScript |
