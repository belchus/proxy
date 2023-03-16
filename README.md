# Desafío de Clase 30

El proyecto consta de seguir las pautas especificadas en las rúbricas del desafío a fin de demostrar capacidades y criterio en el uso de instancias de servidor tanto en modo fork así también como el uso de un servidor proxy inverso (NGINX)

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas del desafío de la clase n°30 del curso de Backend de coderhouse. comisión 40280
url: "https://github.com/robercepp/desafios-Backend"

### Pre-requisitos 📋

- Visual studio code (ultima version estable).
- git.
- node (ultima versión estable).
- nodemon (instalado de forma global).
- pm2
- forever
- nginx (v. 1.23.3 minimo)

basicamente se trata de descargar el repositorio ya sea desde un pull desde la consola de git o manualmente y luego descomprimiendo.

### Instalación 🔧

Tras haber descargado el repositorio: 
- Ejecutar Visual studio code,
- Abrir carpeta raíz del proyecto en visual studio code,
- Abrir una consola nueva,
- Tipear "npm install" en la terminal, para descargar todas las dependencias relacionadas con el proyecto.

## Ejecutando las pruebas ⚙️

- las pruebas se realizan de la siguiente forma: 

- desde gitbash o powershell (o algúna otra consola dependiendo del sistema operativo) posicionandose en la carpeta del proyecto:

Para iniciar en modo "fork":
```nodemon server.js -p 8081 -m FORK```
esto toma los parametros -p para puerto (8081 en este caso) y -m (modo de ejecución FORK)

Para iniciar en modo "cluster":
```nodemon server.js -p 8081 -m CLUSTER```

nota: si no se especifica nada, los parametros por defecto son de modo fork en puerto 8080

véase imagen 1:
![imagen1](https://raw.githubusercontent.com/robercepp/desafios-Backend/main/docs/consignas/consigna1a.jpg)

en la siguiente imágen se puede apreciar el servidor corriendo en modo fork y modo cluster en diferentes terminales.
![imagen1b](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna1c.jpg)

- Se agrega una ventana de "info" con el número de procesadores del sistema en la dirección (http://localhost:8081/info) (cambiar puerto según el caso)

véase imagen 2:
![imagen2](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna1b.jpg)

- Este servidor tambíen posee capacidades para ser iniciado en instancias de "Forever" que veremos a continuación. 

Para iniciar con forever
```forever start server.js```

nota: no olvidar de cerrar forever al terminar de usar el servidor con: 
```forever stopall```

véase imagen 3 para su demostración:
![imagen3](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna1d.jpg)

- se listan los procesos de forever para verificar su correcta aplicación: 

comandos a ejecutar: 
```forever list```

en otra terminal ejecutar
```netstat -ano | findstr 8080```
(aplicable para windows)

```lsof -i :8080```
(aplicable para linux)

nota: esto permite ver las aplicaciones que se encuentran actualmente ejecutandose en dicho puerto. para este ejemplo es el 8080

- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos FORK Y CLUSTER. Listar los procesos por PM2 y por sistema operativo

Modo fork: 
```pm2 start server.js --name="ServerRobertFork" --watch -- --p 8080```
nota: es aconsejable utilizar una terminal tipo BASH para la correcta ejecución de los parametros (se han encontrado incompatibilidades en POWERSHELL de windows 10)

Modo cluster: 
```pm2 start server.js --name="ServerRobertCluster" --watch -i max -- --p 8082```
nota: idem modo fork.

véase imagen 4:
![imagen4](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna%201e.jpg)

- Consigna 2:

Se configura Nginx para balancear cargas del servidor.
Se redirigen las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. (cluster creado desde nodemon usando el móludo nativo)

véase imagen 5 del archivo de configuración (también disponible en la carpeta "docs")
![imagen5](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna2a.jpg)

Luego se modifica la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiendolas equitativamente  entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente. 

nota: ejecutar el servidor en los puertos de la siguiente forma. 
- servidor modo FORK en puerto 8080
- servidor modo CLUSTER en puerto 8082
- servidor modo CLUSTER en puerto 8083
- servidor modo CLUSTER en puerto 8084
- servidor modo CLUSTER en puerto 8085

véase imágen 6 del archivo de configuración de nginx:
![imagen6](https://github.com/robercepp/desafios-Backend/blob/main/docs/consignas/consigna2b.jpg)

El resto de las consultas a los otros endpoints del servidor se encuentran redirigidos a la intancia del servidor FORK del puerto 8080.

## Construido con 🛠️

Visual studio code
express v.4.18.2,
@faker-js/faker v.7.6.0,
bcryptjs v.2.4.3,
connect-mongo v.4.6.0,
cookie-parser v.1.4.6,
express-flash v.0.0.2,
express-hanbdlebars v.6.0.6,
express-session v.1.17.3,
knex v.2.4.0,
mongoose v.6.9.1,
mysql v.2.18.1,
normalizr v.3.6.2,
passport v.0.6.0,
passport-local v.1.0.0,
socket.io v.5.1.4,
yargs v.17.7.0

## Autores ✒️

* **Robertino Cepparo** - *Trabajo Inicial* - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
