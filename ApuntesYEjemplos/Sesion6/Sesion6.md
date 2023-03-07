# Uso de Servidores Web

---

### INDICE

- [Uso de Servidores Web](#uso-de-servidores-web)
    - [INDICE](#indice)
  - [Instalar un Tomcat](#instalar-un-tomcat)
  - [Construir una WebAPP](#construir-una-webapp)

---

## Instalar un Tomcat

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

---

## Construir una WebAPP

Desde el proyecto gradle ejecutar
```
gradle clean build
```

Ejecutar war por consola con jvm
```
cd build\libs
java -jar .\ProyectoApi-0.0.1.war
```
Incluir frontEnd en el war
```
// En la carpeta src\main\webapp 
// Incluir el proyecto front construido
arranca --> index.html
```