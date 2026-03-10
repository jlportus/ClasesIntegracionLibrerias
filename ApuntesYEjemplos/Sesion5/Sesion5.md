# Librerías y APIs: Separación de responsabilidades

<a href="..\..\README.md">indice de Presentaciones</a>

---

## ¿Qué es una librería?

Un conjunto de clases y funciones **reutilizables**, sin punto de entrada propio.

- Se distribuye como artefacto (`.jar`)
- Contiene **lógica de negocio** pura (sin framework)
- Otros proyectos la declaran como **dependencia**

Notas:
Una librería no arranca sola: no tiene `main`, no expone puertos, no conecta a bases de datos.
Su único propósito es encapsular lógica reutilizable. Puede importarse en múltiples proyectos sin duplicar código.

---

## Patrón API + LIB

```
┌──────────────────────────────────┐
│         proyecto-API             │
│  Spring Boot · REST · JPA        │
│  └── depende de proyecto-LIB     │
│  └── Contiene Main() y tests     │
└──────────────┬───────────────────┘
               │ import
┌──────────────▼───────────────────┐
│         proyecto-LIB             │
│  Java puro · lógica de negocio   │
│  packaging = jar                 │
│  debiera tener test internos     │
└──────────────────────────────────┘
```

Notas:
La API orquesta: expone endpoints, gestiona persistencia y delega la lógica al LIB.
El LIB nunca importa Spring; es Java puro para máxima portabilidad y testabilidad.
Ambos son proyectos Maven independientes con su propio Git.

---

## Arquitectura en capas

![Arquitectura 3 capas](./Recursos/Capas.drawio.png)

Notas:
- Capa de presentación / REST → proyecto-API (Controllers)
- Capa de servicio / negocio → proyecto-LIB (Services, Domain)
- Capa de persistencia → proyecto-API (Repositories, JPA)
Referencias:
https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador
https://www.freecodecamp.org/espanol/news/el-modelo-de-arquitectura-view-controller-pattern/

---

## Modos de integración

| Escenario | Mecanismo |
|---|---|
| Proyectos en local (carpetas hermanas) | `mvn install` + dependencia en `pom.xml` |
| Repo público en GitHub | JitPack compila el fuente bajo demanda |
| Repo privado / corporativo | GitHub Packages · Nexus · Artifactory |

Notas:
- **Local**: ideal durante el desarrollo. Se instala el JAR en el repositorio `.m2` local con `mvn install`.
- **JitPack**: sin necesidad de publicar un artefacto; JitPack clona y compila el repo de GitHub automáticamente.
- **GitHub Packages / Nexus**: para entornos de equipo o CI/CD; requiere autenticación y configuración de `distributionManagement`.

---

## Flujo de integración local

```
proyecto-LIB/
  └─ mvn install  ──►  ~/.m2/repository/...

proyecto-API/
  └─ pom.xml declara dependencia a LIB
  └─ mvn spring-boot:run  ✓
```

→ Guía detallada: [GuiaIntegracionProyectoAPI-LIB.md](./GuiaIntegracionProyectoAPI-LIB.md)

Notas:
El repositorio local `.m2` actúa como caché. Una vez instalado el JAR, la API lo resuelve como cualquier otra dependencia de Maven.
Alternativa multi-módulo: un `pom.xml` padre agrupa ambos proyectos y Maven los compila en orden.

---

## Flujo de integración con JitPack

![Integracion en CLOUD](./Recursos/Jitpack.drawio.png)

---

Instrucciones para usar JitPack:

```
pom.xml de la API:
  <repository> jitpack.io </repository>
  <dependency> com.github.User : Repo : Tag </dependency>
```

Notas:
JitPack actúa como proxy: al resolver la dependencia, clona el repositorio de GitHub, ejecuta `mvn package` y devuelve el JAR.
Versiones soportadas: tag de release, hash de commit, `branch-SNAPSHOT`.
JitPack compila con Java 8 por defecto; para Java 17+ añadir `jitpack.yml`.
Log de build: `https://jitpack.io/com/github/USER/REPO/VERSION/build.log`

---

## Publicación en GitHub Packages

```
pom.xml:
  <distributionManagement>
    <url>https://maven.pkg.github.com/OWNER/REPO</url>
  </distributionManagement>

~/.m2/settings.xml:
  <server>
    <id>github</id>
    <password>TOKEN</password>
  </server>

mvn deploy
```

Notas:
Pasos completos en la guía: [GuiaIntegracionProyectoAPI-LIB.md](./GuiaIntegracionProyectoAPI-LIB.md)
- PAT necesita scopes: `write:packages`, `read:packages` y opcionalmente `repo` (si el repo es privado).
- En GitHub Actions usar `GITHUB_TOKEN` (no necesita PAT manual).
- Errores comunes: 401 → credenciales; 404 → URL de `distributionManagement` incorrecta.

---

# Fin de la presentacion

- <a href="./EjercicioSesion5/Enunciado ejercicioSesion5.md">Ejercicio Sesion 5</a>
- <a href="./GuiaIntegracionProyectoAPI-LIB.md">Guía detallada API-LIB</a>

<a href="..\..\README.md">Ir al indice de Presentaciones</a>

<a href="../Sesion6/Sesion6.md">Ir a la Sesion 6</a>
