# node-npm - repositorios
---

### INDICE

- [node-npm - repositorios](#node-npm---repositorios)
    - [INDICE](#indice)
  - [Node](#node)
  - [NPM](#npm)
  - [Instalar un Tomcat como servicio](#instalar-un-tomcat-como-servicio)


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


**Node Package Manager** es el gestor de paquetes (dependencias) por defecto de node

Usa el archivo [package.json](https://github.com/jlportus/ClasesIntegracionLibrerias/tree/main/ApuntesYEjemplos/Sesion12/vue-project/package.json)

Notas:
Crear un proyecto con vue https://vuejs.org/guide/quick-start.html#creating-a-vue-application

---

## Instalar un Tomcat como servicio

Puede instalar el servidor Tomcat en Ubuntu siguiendo estos pasos:

Abra una terminal en su sistema Ubuntu.

Actualice la lista de paquetes apt usando el siguiente comando:

```
sudo apt update
```
Instale el servidor Tomcat con el siguiente comando:
```
sudo apt install tomcat9
```

---

Una vez que la instalación esté completa, el servicio Tomcat se iniciará automáticamente. Para asegurarse de que Tomcat se esté ejecutando, puede usar el siguiente comando:

```
sudo systemctl status tomcat9
```
Puede ajustar la configuración de Tomcat en el archivo /etc/tomcat9/server.xml. Por ejemplo, puede cambiar el puerto predeterminado de 8080 a 80 para permitir el acceso a través del navegador utilizando el siguiente comando:

```
sudo sed -i 's/Connector port="8080"/Connector port="80"/g' /etc/tomcat9/server.xml
```

---

Reinicie el servicio Tomcat para que se tomen en cuenta los cambios de configuración:
```
sudo systemctl restart tomcat9
```
Ahora su servidor Tomcat está instalado y en ejecución en su sistema Ubuntu. Puede acceder al servidor a través del navegador web en http://localhost:80/.

