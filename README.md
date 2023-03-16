1-Modo "FORK":
'nodemon server.js -p 8081 -m FORK'
https://raw.githubusercontent.com/belchus/proxy/master/docs/consigna1.png
2- Modo "CLUSTER":
'nodemon server.js -p 8081 -m CLUSTER'

3-LocalHost con INFO

4-Iniciar con forever
'forever start server.js'

5-Listar los procesos de forever
'forever list'

6-Terminar todos los procesos 
'forever stopall'

7- Mi servidor en modo FORK
'pm2 start server.js --name='ServerFork' --watch -- --p 8080'


8- Mi servidor en modo CLUSTER
'pm2 start server.js --name='ServerCluster' --watch -i max -- --p 8082'


9-Se configuro Nginx para redirigir las consultas a /api/randoms a un cluster de servidores gestionado desde nginx. 
