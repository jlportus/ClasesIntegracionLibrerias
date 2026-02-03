### Guía de instalación de Maven y Gradle en Ubuntu usando `apt`

#### 0) Requisitos previos: Java (JDK)

Maven y Gradle necesitan un JDK instalado.

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
```

Verificación:

```bash
java -version
javac -version
```

Si necesitas confirmar el `JAVA_HOME`:

```bash
readlink -f /usr/bin/java | sed "s:/bin/java::"
```

Opcional (persistir `JAVA_HOME` en tu shell, por ejemplo bash):

```bash
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 1) Instalar Maven con `apt`

```bash
sudo apt update
sudo apt install -y maven
```

Verificación:

```bash
mvn -v
```

Ubicación típica:

* Binario: `/usr/bin/mvn`
* Config global: `/etc/maven/` (puede variar)

---

## 2) Instalar Gradle con `apt`

```bash
sudo apt update
sudo apt install -y gradle
```

Verificación:

```bash
gradle -v
```

---

## 3) Comprobar versiones disponibles en tus repositorios (recomendado)

```bash
apt-cache policy maven
apt-cache policy gradle
```

Notas importantes:

* En Ubuntu, **Gradle vía `apt` suele ir por detrás** de la última versión oficial.
* Para proyectos reales, lo normal es usar **Gradle Wrapper** (`./gradlew`) dentro del proyecto, que fija la versión de Gradle y evita diferencias entre máquinas.

---

## 4) Alternativa recomendada para Gradle en proyectos: Gradle Wrapper

Dentro de un proyecto Gradle (si ya tienes `build.gradle`):

```bash
gradle wrapper
./gradlew -v
```

Esto genera:

* `gradlew`, `gradlew.bat`
* `gradle/wrapper/gradle-wrapper.properties`

A partir de ahí, en vez de `gradle build` usas:

```bash
./gradlew build
```

---

## 5) Desinstalar (si lo necesitas)

```bash
sudo apt remove -y maven gradle
sudo apt autoremove -y
```

---

### Problemas típicos y soluciones rápidas

**1) “JAVA_HOME is not set”**

* Asegura que tienes JDK (no solo JRE) y exporta `JAVA_HOME` (bloque del inicio).

**2) Gradle muy antiguo**

* Usa `./gradlew` (wrapper) en el proyecto para fijar la versión.

**3) Proxy corporativo**

* Maven: configurar `~/.m2/settings.xml` con proxy.
* Gradle: configurar `~/.gradle/gradle.properties` con proxy.

Si quieres, adapto la guía a tu versión exacta de Ubuntu (20.04/22.04/24.04) y a si el entorno es sin Internet (repositorio corporativo/proxy).

---

# Fin de la presentación
<a href="..\..\README.md">Ir al indice de Presentaciones</a>
<a href="../Sesion2/Sesion2.md">Ir a la Sesion 2</a>

---