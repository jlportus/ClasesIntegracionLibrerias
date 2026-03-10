# Ejercicio Sesión 10‑11‑12: Librería calculadora TypeScript

### Misión
El alumno debe crear desde cero una pequeña librería llamada `calc-lib` que proporcione funciones para realizar operaciones básicas (sumar, restar, multiplicar, dividir). Esta librería simula un componente reutilizable que podría ser usado por diferentes aplicaciones, por ejemplo, un frontend que muestra resultados o un backend que delega cálculos. Durante el proceso aprenderá a gestionar las dependencias con npm, a escribir tests que validen el código, a asignar una versión a la librería y a consumirla desde otro proyecto. Al terminar, la librería estará lista para ser publicada en un registro (incluso local) y usada por otros.

### Propósito de la práctica
Esta práctica sirve para que entiendas el ciclo completo de una librería: escribir código, empaquetarlo y compartirlo. La idea general es que trabajes con herramientas reales (TypeScript, npm, Jest) y veas cómo se organiza un proyecto profesional. Los objetivos finales que podrás demostrar son:

- Tener un proyecto `calc-lib` que compila y genera un paquete en `dist/`.
- Generar y ejecutar pruebas automáticas que cubran las operaciones de la calculadora.
- Modificar el `package.json` para indicar la entrada (`main`), tipos (`types`), y scripts de build/test.
- Instalar el paquete en un proyecto de ejemplo y usarlo correctamente.

Los riesgos asumibles son simples: el código de la calculadora puede ser incorrecto o no compilar, pero eso se solucionará con los tests; los comandos de npm pueden fallar si no se usa la versión correcta de Node, así que se proporcionarán instrucciones paso a paso. No se espera que el alumno domine cada herramienta desde el principio, el objetivo es practicar y entender los pasos.

### Objetivo general
Al finalizar esta práctica, el alumno deberá disponer de un paquete npm (`calc-lib`) que:

- compila sin errores y genera artefactos en `dist/`;
- contiene funciones de cálculo testadas automáticamente;
- se puede instalar desde otro proyecto y utilizar correctamente.

La finalidad no es crear la calculadora más completa, sino dominar el ciclo de vida de una librería: diseño, empaquetado, prueba y consumo.
---

## Paso 1 – Inicializar el proyecto

1. Crea una carpeta llamada `calc-lib` y sitúate en ella:
   ```bash
   mkdir calc-lib
   cd calc-lib
   ```
   Notas: comenzamos con un directorio limpio para entender cada archivo que aparece.

2. Ejecuta `npm init -y` para generar un `package.json` básico.
   - Abre el fichero y observa los campos creados automáticamente.
   - Modifica `name` a `calc-lib` (o algún nombre propio) y `version` a `0.1.0`.
   Notas: `name` será la forma en que otros proyectos importen tu paquete; debe ser único en el registro donde publiques.

---

## Paso 2 – Configurar TypeScript

1. Instala TypeScript como dependencia de desarrollo:
   ```bash
   npm install --save-dev typescript
   ```
   Notas: se coloca en `devDependencies` porque no es necesario en tiempo de ejecución para quien consuma la librería.

2. Genera un archivo de configuración:
   ```bash
   npx tsc --init
   ```
   - Abre `tsconfig.json` y ajusta las opciones:
     ```json
     {
       "compilerOptions": {
         "declaration": true,
         "outDir": "dist",
         "module": "commonjs",
         "target": "es2017"
       }
     }
     ```
   Notas: `declaration` produce archivos `.d.ts` que los consumidores usan para tipado; `outDir` es donde se coloca el código compilado.

---

## Paso 3 – Implementar la lógica

1. Crea el directorio `src` y dentro un archivo `index.ts`.
2. Escribe funciones básicas:
   ```ts
   export function sumar(a: number, b: number): number { return a + b; }
   export function restar(a: number, b: number): number { return a - b; }
   export function multiplicar(a: number, b: number): number { return a * b; }
   export function dividir(a: number, b: number): number { if (b === 0) throw new Error('división por cero'); return a / b; }
   ```
   Notas: cada función está exportada para que el consumidor pueda importarla.

3. Compila el proyecto con `npx tsc` y observa que aparece la carpeta `dist` con `.js` y `.d.ts`.
   Notas: estos son los artefactos que se publicarán.

---

## Paso 4 – Añadir dependencias y devDependencies

1. Supón que quieres usar `lodash` en tu librería. Es una colección de funciones utilitarias que resuelven operaciones comunes (manipulación de arrays, objetos, números, strings, etc.) de forma más segura y consistente que escribirlas tú mismo. Instálalo del siguiente modo:
   ```bash
   npm install lodash
   npm install --save-dev @types/lodash
   ```
   Notas: `lodash` se añade como dependencia normal porque tu código lo usa en producción; los tipos van en `devDependencies` para que el compilador TypeScript sepa manejar los tipos de las funciones sin obligar al consumidor a instalar los tipos.

   Explicación adicional: en proyectos reales, aprovechar una librería como `lodash` evita volver a reinventar la rueda y te ahorra el mantenimiento de pequeños fragmentos de código. Además, cuando usas una dependencia, tus usuarios también se benefician de las correcciones y mejoras que se publiquen en la librería.

2. Instala un framework de tests, por ejemplo Jest con soporte TypeScript:
   ```bash
   npm install --save-dev jest ts-jest @types/jest
   ```
   Notas: estas dependencias son sólo necesarias para desarrollar y probar la librería.

---

## Paso 5 – Escribir tests

1. Crea carpeta `tests` y un archivo `calculator.test.ts`:
   ```ts
   import { sumar, restar, multiplicar, dividir } from '../src/index';

   test('suma simple', () => expect(sumar(1,2)).toBe(3));
   // añade más pruebas para cada función
   ```
   **Explicación de la semántica de Jest:**
   - `test('nombre', fn)` es sinónimo de `it('nombre', fn)` y describe un caso de prueba concreto.
   - La función `expect(valor)` crea una aserción; `toBe(3)` es un *matcher* que comprueba igualdad estricta.
   - Puedes agrupar pruebas relacionadas usando `describe('grupo', () => { ... })`.
   - Jest soporta pruebas asíncronas (retornando una `Promise` o usando `async/await`) y tiene muchos matchers (`toEqual`, `toHaveLength`, `toThrow`, etc.).

   Notas: los tests validan la lógica antes de publicar y sirven de documentación; para alumnos con menos experiencia, los tests actúan como ejemplos de uso real de la librería.

2. Añade un script en `package.json`:
   ```json
   "scripts": {
     "build": "tsc",
     "test": "jest"
   }
   ```

3. Ejecuta `npm run test` y corrige cualquier fallo.

---

## Paso 6 – Preparar para publicación

1. Edita `package.json` para incluir:
   ```json
   "main": "dist/index.js",
   "types": "dist/index.d.ts",
   "prepublishOnly": "npm run build && npm run test"
   ```
   Notas: `main` y `types` señalan los archivos exportados; `prepublishOnly` garantiza que se compile y pruebe antes de publicar.

2. Incrementa la versión:
   ```bash
   npm version patch
   ```
   Notas: esto actualiza el campo `version`, crea un commit/etiqueta si usas git.

3. Crea `.gitignore` con `node_modules` y `dist` y haz un commit inicial.

4. Para publicar localmente sin subir a npm, puedes ejecutar `npm pack` y luego instalar el tarball en otro proyecto. El comando `npm pack` crea un archivo `.tgz` que contiene tu paquete empaquetado como se subiría al registro. Por ejemplo:
   ```bash
   npm pack
   # calcula un nombre como calc-lib-0.1.0.tgz
   ```
   Luego, en otro proyecto, puedes instalarlo usando:
   ```bash
   npm install ../calc-lib/calc-lib-0.1.0.tgz
   ```
   Alternativamente npm permite referenciar directorios locales directamente con la sintaxis `file:`:
   ```bash
   npm install file:../calc-lib
   ```
   Esto crea un enlace directo al directorio, útil durante el desarrollo porque los cambios se reflejan sin volver a empaquetar.
   Notas: también puedes configurar un registro privado y usar `npm publish` con autenticación.

---

## Paso 7 – Consumir la librería

1. En un directorio paralelo `demo-app`, inicializa un nuevo proyecto (`npm init -y`).
2. Instala la librería localmente:
   ```bash
   npm install ../calc-lib
   ```
   Notas: npm crea un enlace simbólico en `node_modules` que apunta al paquete.

3. Crea un `index.ts` o `index.js` donde importes:
   ```ts
   import { sumar } from 'calc-lib';
   console.log(sumar(2,3));
   ```
   Notas: esto demuestra cómo un consumidor usa la API de la librería.

4. Reflexiona: si la lógica necesitara datos de un backend, se podría definir la función `sumar` para llamar a `/api/sumar` con `fetch` o `axios` en lugar de realizar la operación local; los tests del lado de la librería se adaptarían usando mocks.

---

### Notas finales

- Puedes mejorar este ejercicio agregando un bundler para crear archivos específicos para navegador (UMD/ESM).
- Automatizar la publicación con GitHub Actions es un ejercicio adicional.

---

**Entregable:** el repositorio `calc-lib` completado y el proyecto `demo-app` que lo consume.

> Fin del enunciado
