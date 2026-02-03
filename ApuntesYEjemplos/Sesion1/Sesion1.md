# Conceptos Generales de Librerías

<a href="..\..\README.md">indice de Presentaciones</a>

---

### INDICE

- [Conceptos Generales de Librerías](#conceptos-generales-de-librerías)
    - [INDICE](#indice)
- [Objetivos de la sesión](#objetivos-de-la-sesión)
    - [¿Qué es una librería?](#qué-es-una-librería)
  - [Librería vs Biblioteca](#librería-vs-biblioteca)
    - [Características de una librería](#características-de-una-librería)
    - [Características de una librería II](#características-de-una-librería-ii)
    - [Uso de librería vs Copy\&Paste](#uso-de-librería-vs-copypaste)
    - [Librería vs Framework](#librería-vs-framework)
    - [Repositorio](#repositorio)
    - [¿Qué aporta un repositorio?](#qué-aporta-un-repositorio)
    - [Gestores de dependencias](#gestores-de-dependencias)
    - [Ejemplo mínimo (solo para idea, sin entrar aún en detalle)](#ejemplo-mínimo-solo-para-idea-sin-entrar-aún-en-detalle)
- [Comprobación de conocimientos](#comprobación-de-conocimientos)
- [Fin de la presentación](#fin-de-la-presentación)

---

# Objetivos de la sesión

- Comprender qué es una librería y cuándo usarla
- Conocer repositorios y gestores de dependencias
- Ser capaz de diferenciar librería vs framework

Notas:
- Entregable: Explicar (breve) una decisión de integración para un caso simple.

---

### ¿Qué es una librería?

**Las bibliotecas de código:**

> Son conjuntos de funciones y procedimientos preescritos que pueden ser utilizados para realizar tareas específicas en un programa.

[Biblioteca de código Wikipedia](https://es.wikipedia.org/wiki/Biblioteca_(inform%C3%A1tica))

Notas:
Una librería (o biblioteca de código) es un componente reutilizable que encapsula funcionalidad ya resuelta (por ejemplo, serialización JSON, logging, validación, acceso a BBDD, utilidades de fechas…). Su valor no es solo “tener código hecho”, sino poder incorporarlo de forma controlada en un proyecto: con una versión, una licencia, documentación y una forma estándar de distribución. En la asignatura, “integrar” significa precisamente eso: incorporar piezas externas de forma reproducible, mantenible y verificable, evitando soluciones frágiles como copiar código sin trazabilidad.

---

## Librería vs Biblioteca

- En la práctica, **“librería”** y **“biblioteca”** se usan como sinónimos
- “Biblioteca” es una traducción muy extendida (library)
- “Librería” es el término más habitual en el contexto de dependencias y publicación

Notas:
No hay una diferencia técnica relevante entre ambos términos en el uso cotidiano: ambos describen un paquete de código reutilizable. Sin embargo, en entornos de desarrollo y documentación técnica se ha popularizado “librería” para hablar del artefacto que consumes como dependencia (por ejemplo, un JAR en Java o un paquete en npm). Es útil saberlo porque en documentación, foros y herramientas encontrarás ambos términos.

---

### Características de una librería

- Está pensada para **reutilizarse** en múltiples proyectos
- Define una **API** (clases, funciones, contratos)
- Puede incluir **documentación**, ejemplos y tests
- Se distribuye como **artefacto** (p. ej. JAR / paquete npm / DLL)

Notas:
Una librería bien construida no es solo un conjunto de ficheros: es un producto técnico. La API es el “contrato” con los consumidores: si cambia, puede romper integraciones. Por eso, además del código, importan la documentación y los ejemplos mínimos ejecutables. Un artefacto es el resultado empaquetado y distribuible. En esta asignatura, se trabajará con artefactos en Java (JAR/WAR) y en JS (paquetes npm), pero los principios son comunes: empaquetar, versionar, publicar, consumir y verificar.

--

### Características de una librería II

- Tiene **versiones** (evoluciona en el tiempo)
- Tiene **dependencias** (directas y transitivas)
- Tiene **licencia** (condiciones de uso)
- Puede tener **riesgos** (compatibilidad, seguridad, mantenimiento)

Notas:
La parte crítica de “integración” aparece aquí: una librería no vive aislada. Sus dependencias transitivas pueden entrar en conflicto con las de tu proyecto. Las versiones pueden introducir cambios incompatibles. La licencia puede imponer restricciones (por ejemplo, en redistribución o copyleft). Además, incluso una librería popular puede tener vulnerabilidades o quedar abandonada. Por eso, integrar librerías no es un acto puntual, sino un proceso que requiere criterio y verificación.

---

### Uso de librería vs Copy&Paste

**Usar librería**

- Versionable y actualizable
- Trazable (sabes de dónde viene)
- Reutilizable y mantenible
- Permite correcciones centralizadas

**Copy&Paste**

- Duplicas código y errores
- Difícil de actualizar y auditar
- Sin control de licencia/origen
- Genera “deuda” invisible

Notas:
El copy&paste suele parecer rápido al inicio, pero crea un problema serio: el código copiado queda desconectado de su fuente original. Cuando aparece un bug o una vulnerabilidad, no tienes una forma limpia de aplicar el parche. En cambio, una dependencia con versión te permite actualizar y documentar el cambio. Además, desde el punto de vista legal, copiar código sin revisar su licencia es especialmente peligroso: puedes introducir obligaciones que afecten al proyecto completo sin darte cuenta.

---

### Librería vs Framework

- **Librería**: tu código llama a la librería
- **Framework**: el framework llama a tu código (inversión de control)

Ejemplo mental:
- Librería: “yo decido cuándo serializar a JSON”
- Framework: “el framework decide el ciclo de vida y yo encajo mis piezas”

Notas:
La distinción es útil porque afecta a la integración y al impacto en arquitectura. Una librería suele ser más sustituible (puedes cambiar la librería de logging, por ejemplo). Un framework suele “envolver” tu aplicación y obligarte a seguir convenciones. Integrar un framework es una decisión más estructural, mientras que integrar una librería suele ser más localizada. Aun así, ambos se gestionan como dependencias y ambos pueden tener conflictos, licencias y riesgos.

---

### Repositorio

- Lugar donde se **almacenan y distribuyen** artefactos/paquetes
- Puede ser:
  - **Local** (en tu máquina)
  - **Corporativo** (Nexus/Artifactory, etc.)
  - **Público** (Maven Central, npm registry, etc.)

Notas:
Un repositorio no es solo “un sitio para descargar cosas”: es el mecanismo que hace que la integración sea reproducible. Si tu proyecto declara dependencias, el build tool debe poder resolverlas desde un repositorio. En entornos profesionales, lo habitual es usar un repositorio corporativo que actúa como proxy/cache y control de lo que se permite introducir. Esto mejora disponibilidad, rendimiento y seguridad (por ejemplo, bloqueando paquetes vulnerables o no aprobados).

--

### ¿Qué aporta un repositorio?

- Repetibilidad: mismas dependencias en cualquier entorno
- Colaboración: todo el equipo usa el mismo origen de artefactos
- Control: políticas de publicación, permisos, auditoría
- Trazabilidad: saber qué versión se usó y cuándo

Notas:
Sin repositorio, cada desarrollador podría integrar “lo que encuentre” de forma distinta. Con repositorio y versiones, puedes reconstruir el estado exacto de un proyecto meses después. Esto es esencial para CI/CD, para depuración de incidencias y para auditorías (técnicas o legales). La integración moderna se apoya en esta base: versiones declaradas + repositorio confiable + build reproducible.

---

### Gestores de dependencias

- Herramientas para **declarar** y **resolver** dependencias
- Automatizan:
  - descarga de artefactos
  - resolución de transitivas
  - compilación/build
  - empaquetado y publicación

Ejemplos:

- Java: **Maven**, **Gradle**
- JS: **npm**, **yarn** (y otros gestores compatibles)
- .NET: **NuGet**

Notas:
Un gestor de dependencias convierte la integración en un proceso declarativo: en vez de “bajar a mano” ficheros y copiarlos, declaras qué necesitas y el sistema lo resuelve. Esto reduce errores, pero introduce conceptos importantes: scopes (qué depende de qué fase), transitivas (dependencias de tus dependencias), conflictos de versiones y mecanismos de control (exclusiones, overrides, lockfiles). En la asignatura, se verá cómo usar estas herramientas y, sobre todo, cómo diagnosticar cuando el proceso falla.

--

### Ejemplo mínimo (solo para idea, sin entrar aún en detalle)

Maven (pom.xml):

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.x.x</version>
</dependency>
```

npm:

```
npm i lodash
import _ from "lodash";
console.log(_.chunk([1, 2, 3, 4], 2));
```

Notas: Estos fragmentos muestran el patrón común: declarar una dependencia y consumirla desde código. En sesiones posteriores se verá cómo elegir versiones concretas, cómo identificar transitivas, cómo resolver conflictos y cómo publicar tu propia librería para que otros la consuman. También se verá que en frontend entra un factor adicional: el bundler, que empaqueta módulos y afecta a cómo se distribuyen librerías (ESM/CJS, tree-shaking, etc.). Aquí solo interesa el concepto: declaras → resuelves → usas.

---

# Comprobación de conocimientos

- Checklist:
  - ¿Qué es una librería? (resumen en 1 frase)
  - Nombra 2 gestores de dependencias
  - Explica por qué evitar Copy&Paste

Notas:
- Preguntas para repasar: escribe en 1 frase la diferencia entre librería y framework; explica qué aporta un repositorio.

---

# Fin de la presentación

<a href="..\..\README.md">Ir al indice de Presentaciones</a>

<a href="../Sesion2/Sesion2.md">Ir a la Sesion 2</a>

Notas: Cierre conceptual: integrar librerías es un conjunto de decisiones y procesos (versionado, repositorios, licencias, verificación y mantenimiento). La siguiente sesión aterriza el tema en Java: artefactos (JAR/WAR) y un “HolaLibrería” con una librería propia y un consumidor. El objetivo es que el alumnado empiece a ver la integración como algo reproducible y entregable (con evidencias: build que compila, ejemplo mínimo y documentación básica).

---
