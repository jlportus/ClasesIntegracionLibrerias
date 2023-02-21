# JAVA - HolaLibrería

- [JAVA - HolaLibrería](#java---holalibrería)
  - [JAVA - HolaLibrería](#java---holalibrería-1)
  - [Conceptos - JAR](#conceptos---jar)
  - [Conceptos - WAR](#conceptos---war)
  - [Procedimiento para generar un JAR](#procedimiento-para-generar-un-jar)
- [Preparar el entorno](#preparar-el-entorno)
- [Generar la libreria](#generar-la-libreria)
- [Intentar abrir el archivo](#intentar-abrir-el-archivo)
- [Importar un jar en el proyecto](#importar-un-jar-en-el-proyecto)

---

## JAVA - HolaLibrería

**Proposito:**
Generar una librería de un código ya existente y reutilizarlo en otro proyecto

---

## Conceptos - JAR

**JAR** _"tarro"_,  JAR (Java Archive): archivo que contiene uno o más archivos **compilados** de Java, (clases, recursos y metadatos) comprimidos en un único archivo. 

Se utilizan para distribuir bibliotecas y aplicaciones Java.

~= archivo ZIP (*.class + MANIFEST.MF)

[jar-The Java Archive Tool](https://docs.oracle.com/javase/6/docs/technotes/tools/solaris/jar.html#options)

Notas:
El archivo JAR es un archivo ZIP con una estructura específica para Java. Contiene archivos .class compilados, archivos de recursos (como imágenes, sonidos y archivos de configuración) y un archivo MANIFEST.MF que especifica la información del paquete, como el nombre del paquete, la versión, los autores y los requisitos de librerías externas.

El archivo JAR es muy útil para distribuir bibliotecas de código Java, ya que permite empaquetar varias clases y recursos en un único archivo. Además, el archivo JAR puede ser fácilmente importado y utilizado en otros proyectos de Java a través de un administrador de dependencias, como Maven o Gradle.

---

## Conceptos - WAR

**WAR**  (Web Application Archive): archivo que contiene todos los archivos necesarios para desplegar una aplicación web Java en un servidor web (tomcat...) 

~= archivo ZIP (*.class (+ main) 
    + jsp/(html+js) 
    + index.html 
    + recursos(properties, imagenes...)
    + **XML deployment descriptor**)

_JSP (JavaServer Pages) y servlet(HTTP)_ <-- Obsoleto

[War Files docs](https://docs.oracle.com/cd/E19199-01/816-6774-10/a_war.html)

Notas:
Servidores web Java como Apache Tomcat o JBoss. Los archivos contenidos en el archivo WAR se despliegan en la estructura de directorios del servidor web, lo que permite al servidor web cargar y ejecutar la aplicación.

El archivo WAR se crea típicamente a través de una herramienta de construcción, como Apache Maven o Gradle, que compila y empaqueta la aplicación web en un archivo WAR. El archivo WAR se puede desplegar manualmente en el servidor web o a través de una herramienta de implementación automatizada, como Jenkins o TravisCI.

JSP (JavaServer Pages) es una tecnología de Java para crear páginas web dinámicas que se pueden generar dinámicamente en el servidor. Un JSP es un archivo que combina código HTML o XML y código Java, y que se utiliza para crear una página web que se puede enviar al navegador del usuario.
- **HTML** o XML se utiliza para definir la **estructura** de la página web
- código **Java** se utiliza para generar el **contenido** de la página web.
- Cuando un usuario solicita una página web JSP, **el servidor web genera dinámicamente la página** utilizando el código Java en el archivo JSP y envía el resultado al navegador del usuario
- **servlet** es una clase Java que se utiliza para procesar solicitudes HTTP en el servidor. Un servlet actúa como un intermediario entre el cliente y el servidor, y puede ser utilizado para realizar diversas tareas, como recibir datos de un formulario HTML, acceder a bases de datos, autenticar usuarios y generar respuestas dinámicas en función de la solicitud del cliente.
---

## Procedimiento para generar un JAR

Por consola --> ver documentación de los enlaces

Con un gestor de dependencias 

**Con el IDE (Eclipse)**

Notas:

# Preparar el entorno
1. New Java Project
2. Browse location
3. Seleccionar JDK (comprobar JDK instalado y configurado en eclipse)
4. Crear main (`package es.mde.et.acing`)
5. Probar con un `hola mundo`

1.  hacer un método en el main `saludo();`
2.  hacer una clase persona
3.  extraer saludo a una clase + metodo `static`

1. Mover a un package la clase saludo
2. cambiar a `public`

# Generar la libreria

1. Sobre la clase o paquete, exportar a JAR
2. Seleccionar recursos
3. Seleccionar directorio Browse
4. Next > Finish

# Intentar abrir el archivo
-> No se ve nada porque esta compilado

# Importar un jar en el proyecto

1. Abra su proyecto Java en Eclipse.
1. Haga clic derecho en el proyecto y seleccione "Propiedades" en el menú contextual.
2. En el cuadro de diálogo "Propiedades", seleccione "Java Build Path" en el panel de la izquierda.
3. Seleccione la pestaña "Librerías" en la parte superior de la ventana.
4. Haga clic en el botón "Agregar JARs..." o "Agregar archivos JAR externos..." según corresponda.
5. Busque y seleccione el archivo JAR que desea importar y haga clic en "Abrir".
6. Asegúrese de que el archivo JAR seleccionado se haya agregado a la lista de librerías y haga clic en "Aplicar" y luego en "Aceptar".

Una vez que haya importado el archivo JAR en su proyecto de Eclipse, puede utilizar las clases y los métodos del archivo JAR en su código Java. Asegúrese de importar las clases necesarias en su código utilizando la declaración "import" correspondiente.