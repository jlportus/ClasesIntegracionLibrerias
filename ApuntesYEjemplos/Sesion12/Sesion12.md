# node-npm </br>Repositorios js

---

### INDICE

- [node-npm Repositorios js](#node-npm-repositorios-js)
    - [INDICE](#indice)
  - [Node](#node)
  - [NPM](#npm)
  - [Ejemplo de proyecto node](#ejemplo-de-proyecto-node)
  - [Estructura de proyectos Node](#estructura-de-proyectos-node)
  - [Scripts de Node](#scripts-de-node)
  - [Repositorio NPM](#repositorio-npm)
  - [Librerias Utiles](#librerias-utiles)
- [Fin de la presentacion](#fin-de-la-presentacion)

---

## Node

**NODE** es un entorno de ejecucion de JavaScript opensource y multiplataforma. Usa el motor core de Chrome.

Permite desarrollar la parte de servidor y de cliente de apps para navegadores

Notas:

https://nodejs.dev/en/learn/introduction-to-nodejs/

Instalacion:
https://nodejs.org/en/download

---

## NPM

**Node Package Manager** es el gestor de paquetes (dependencias) por defecto de **_NODE_**

Usa el archivo [package.json](https://github.com/jlportus/ClasesIntegracionLibrerias/tree/main/ApuntesYEjemplos/Sesion12/vue-project/package.json) para declarar las dependencias del proyecto

---

## Ejemplo de proyecto node

>Crear un proyecto vue con la cli de vue

```
cd /mi_proyecto/
# instalar las dependencias
npm install

# Instalar dependencia y salvar en package.json
npm install <package-name>@<version> --save 
```

Notas:

Crear un proyecto con vue https://vuejs.org/guide/quick-start.html#creating-a-vue-application

---

## Estructura de proyectos Node

```
# declaracion de depencencias
package.json

# resolucion de dependencias (despues de npm install)
package-lock.json

# las dependencias en el proyecto
./node_modules

index.html
```

---

## Scripts de Node

```
# Ejecutar un script declarado en package.json
npm run <task-name>

npm run dev

# construir una app --> /dist/[...]
npm run build
+ index.html
    -+ assets/scripts.js
    -+ assets/estilos.css
```

Notas:
El contenido de la carpeta /dist contiene la aplicacion web completa _"compilada"_ con todos los recursos (html+css+js)

---

## Repositorio NPM

[https://www.npmjs.com/](https://www.npmjs.com/)

---

## Librerias Utiles

[Electron](https://www.npmjs.com/package/electron)

[chart.js](https://www.npmjs.com/package/chart.js)

[gridjs](https://gridjs.io/)

---

# Fin de la presentacion 
<a href="./index.html#/6">Ir al indice de Presentaciones</a>

<a href="./sesion15.html">Ir a la Sesion 15</a>