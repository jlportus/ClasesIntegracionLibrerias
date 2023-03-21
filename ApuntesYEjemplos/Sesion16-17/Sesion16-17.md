# Ejercicios de librerias de Backend

La finalidad de estos ejercicios es poner en practica conceptos que se han visto en clase sobre el uso de librerias y que el alumno sea capaz de autoformarse e implementar librerias utiles de uso extendido en proyectos java, usando tutoriales y la documentacion de las librerias.

---

### INDICE

- [Ejercicios de librerias de Backend](#ejercicios-de-librerias-de-backend)
    - [INDICE](#indice)
  - [Instrucciones generales](#instrucciones-generales)
- [Ejercicios](#ejercicios)
  - [Proyecto libreria-api](#proyecto-libreria-api)
  - [Generacion de un war](#generacion-de-un-war)
  - [Usando librerias](#usando-librerias)
      - [haga el ultimo commit, suba sus cambios y haga el pull request](#haga-el-ultimo-commit-suba-sus-cambios-y-haga-el-pull-request)

---

## Instrucciones generales

- Realice un Fork de este proyecto y llamelo `EjercicioLibreriasBack{Su apellido}`, el repositorio debe ser privado.
- Por cada ejercicio terminado debe hacer un commit con el resultado del ejercicio y que en el comentario ponga `---Ejercicio nº---`
- Una vez finalice todos los ejercicios, debera subir todos los commits a su repositorio y hacer un pull request sobre el repositorio origen.

---

# Ejercicios

1. Modifique este archivo e introduzca su nombre en mayusculas en un h1 en la primera linea.

---

## Proyecto libreria-api

2.  Cree una carpeta en la raiz del proyecto que se llame `apiLibreria`
    - Usando SpringInitializer cree dos proyectos java gradle Springboot 2.7
      - group: es.mde.acing
      - artifact:
        - proyectoApi{su apellido} java 11
        - proyectoLib{su Usuario} java 1.8
    - En el proyecto Lib cree una clase en el package utils, llamada `pruebaLibreria` con un metodo `imprime()` que pinte por consola "hola libreria"
    - Revise el build.gradle de la libreria y configurelo para que se pueda utilizar como dependencia (revise los apuntes y la documentacioon de Jitpack _version de java_)
    - publique la libreria en gitHub, haga una release y empleela en su proyecto api usando el numero de commit
      - utilice el metodo implementado en la libreria desde el main de la api

---

## Generacion de un war

3. Genere un war a partir de su proyecto api
   - Arranque su war con la jvm (revise que el archivo tiene permisos de ejecucion)
   - Descargue un servidor ApacheTomcat y despliegue su war iniciandolo por consola mientras comprueba la carpeta webapp del tomcat (revise los apuntes de la sesion 6)
     - Compruebe las carpetas generadas en webapp y conteste aqui a las preguntas
     - ¿Que tipo de archivos y que contenidos estan desplegados en el servidor?
     - ¿Que librerias usa el proyecto?
     - ¿se encuentran en algun sitio los jar?
   - Vuelva a generar un war, pero esta vez:
     - cambie el nombre del war generado a `proyectoApi{Suapellido}web`
     - Incluya una pagina index.html con que muestre "hola api" en el cuerpo
     - Una vez arrancado el proyecto acceda a traves de su navegador al index.html, tome una captura de pantalla e incluyala en la siguiente linea
   - Modifique el git ignore para que los war generados se suban al repositorio

---

## Usando librerias

- Lea los apuntes de las sesiones 7-8-9 y la documentacion de los enlaces

4. Ejercicio de jackson
   - Importe a su proyecto api las dependencias de jackson
   - Realice los siguientes ejercicios
     - Cree un objeto Java persona con nombre y edad
     - cree una clase de utilidades en su api para transformacion de json con los siguientes metodos:
       - metodo que cree un objeto json vacio y lo muestre por consola
       - metodo que agrege al objeto json anterior un par clave:valor `"nombre": "pepe"`
       - metodo que cree un objeto json array vacio y lo muestre por consola
       - metodo que agrege al objeto json array el json anterior y lo muestre por consola en formato pretty
       - metodo que incluya en el primer objeto json un nuevo campo de tipo array con el array anterior y lo muestre por consola en formato normal (no pretty)

---

     - Parseo objeto-json
       - metodo que a partir de un string en formato json, lo pinte en formato pretty por consola
       - metodo que a partir de un string en formato json, genere un objeto de su clase persona. debe pintar por consola el string recibido, y la persona.toString()
       - modifique mediante anotaciones el orden en el que se muestran los campos de la persona
       - modifique mediante anotaciones para que el campo del nombre de la persona se muestre como apellido
       - modifique mediante anotaciones para que no se muestre la edad
     - Listados a partir de json
       - metodo que a partir de un array de json de tipo persona, genere un objeto `List<persona>` y muestre por consola, el string json origen, y pinte cada una de las personas.toString() en lineas separadas

---

5. Lea la documentacion de los apuntes para trabajar con fechas
   - Agregue a su persona el campo fecha de nacimiento
   - Haga que cuando se pinte por consola la fecha de nacimiento se muestre "año-mes-dia hh:mm:ss"

---

6. Ejercicio de conexion a bbdd h2
   - Incluya en su proyecto la dependencia de una bbdd h2, arranque la bbdd ()
     - Cree una bbdd
     - Crear una tabla persona y cargar datos
   - Cree un metodo que se conecte a la bbdd que obtenga los datos de la tabla generada antes y los asigne a un objeto persona
   - Muestre por consola los datos leidos de la bbdd

---

7. Junit
   - cree un test para un metodo que determine si un numero es par o impar
     - pase una bateria de datos de prueba con un listado de numeros [0,1,2,8,9,13]
     - Cree un metodo que determine si un numero es par devuelva true
   - cree otro test para un metodo que determine si un numero es multiplo de 3
     - pase una bateria de datos de prueba con un listado de numeros [0,1,3,8,9,15]
     - Cree un metodo que determine si un numero es multiplo de 3 devuelva un string `"multiplo de 3"`, si no `"no es multiplo"`
   - Compruebe ambos metodos con los test elaborados

---

#### haga el ultimo commit, suba sus cambios y haga el pull request
