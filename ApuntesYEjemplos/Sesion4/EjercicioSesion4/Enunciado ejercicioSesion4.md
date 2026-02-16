# Ejercicio Sesion 4 (Maven — Ubuntu)

<a href="..\..\README.md">Ir al indice de Presentaciones </a>

---

Objetivo: realizar los mismos ejercicios de la sesión pero usando **Maven** y comandos para **Ubuntu** (basado en la Sesión 3).

1) Cree un proyecto **Maven** usando el wizard de Eclipse

- Desde Eclipse: File → **New** → **Maven Project** → seleccionar archetype (p. ej. `maven-archetype-quickstart`) → completar `groupId` / `artifactId` → Finish.
- Verifique que `pom.xml` contiene las secciones básicas (`dependencies`, `maven-compiler-plugin`).
- Comandos útiles (Ubuntu):
  - `mvn -v`
  - `mvn clean compile`

--

2) Cree un proyecto **Maven** por la CLI con dependencias y luego impórtelo en Eclipse

- Crear con archetype (ejemplo):
  - `mvn -B archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart -DgroupId=com.miempresa -DartifactId=miapp -Dversion=0.0.1-SNAPSHOT`
- Importar en Eclipse: File → **Import...** → **Maven** → **Existing Maven Projects** → seleccionar carpeta → Finish.
- Comandos para Ubuntu:
  - `./mvnw spring-boot:run` (si existe `mvnw`), o `mvn spring-boot:run`
  - `mvn package`

--

3) Cree un proyecto **Spring Boot** (Maven) con el wizard de Eclipse o Spring Initializr

- Desde Spring Initializr (web o CLI) seleccione **Maven Project** y dependencias: `Spring Web`, `Spring Data JPA`, `H2`, `DevTools`.
- Ejecutar en Ubuntu:
  - `./mvnw spring-boot:run`  (o `mvn spring-boot:run`)
  - `mvn dependency:tree`

--

4) Importe el proyecto del año pasado: `revista-ejercito`

- Clonar e importar:
  - `git clone https://git.institutomilitar.com/A50tc0/revista-ejercito.git`
  - `cd revista-ejercito && ./mvn spring-boot:run` (Ubuntu)
- Abra el proyecto en Eclipse como **Maven** project.

--

5) Entregable — Comparación

- Compare los tres proyectos (archetype CLI, wizard Eclipse, Spring Boot): estructura de carpetas, `pom.xml` (plugins y dependencias), comandos para compilar/ejecutar en Ubuntu y diferencias en el ciclo de vida de construcción.
- Puntos a comentar (una breve tabla o lista):
  - Origen / creación (wizard vs CLI)
  - Estructura `src/` y `pom.xml`
  - Comandos de ejecución en Ubuntu (`mvn`, `./mvnw`)
  - Plugins / profiles / scopes (ej. `provided`, `test`)

---

# Fin de la presentación

<a href="..\..\README.md">Ir al indice de Presentaciones </a>

<a href="../Sesion5/Sesion5.md">Ir a la Sesion 5</a>
