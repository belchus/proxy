1-Modo "FORK":
'nodemon server.js -p 8081 -m FORK'
![imagen1](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/consigna1.png)


2- Modo "CLUSTER":
'nodemon server.js -p 8081 -m CLUSTER'
![imagen2](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/cluster.png)

3-LocalHost con INFO
![imagen3](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/info.png)

4-Iniciar con forever
'forever start server.js'


5-Listar los procesos de forever
'forever list'
![imagen4](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/forever.png)

6-Terminar todos los procesos 
'forever stopall'

7- Mi servidor en modo FORK
'pm2 start server.js --name='ServerFork' --watch -- --p 8080'
![imagen5](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/serverFORK.png)

8- Mi servidor en modo CLUSTER
'pm2 start server.js --name='ServerCluster' --watch -i max -- --p 8082'
![imagen6](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/serverCLUSTER.png)

9-Se configuro Nginx para redirigir las consultas a /api/randoms a un cluster de servidores gestionado desde nginx. 
![imagen7](https://raw.githubusercontent.com/belchus/proxy/master/docs/respuestas/servernginx.png)
