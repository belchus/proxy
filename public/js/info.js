const socket = io.connect()

const args = document.getElementById('args')
const plat = document.getElementById('plat')
const exe = document.getElementById('exe')
const id = document.getElementById('id')
const path = document.getElementById('path')
const version = document.getElementById('version')
const memoria = document.getElementById('memoria')


socket.on('info', data => {
    args.innerHTML = `Argumentos de entrada: <br> ${data.args}`
    plat.innerHTML = `Nombre de la plataforma: <br> ${data.plat}`
    exe.innerHTML = `Path de ejecución: <br> ${data.exe}`
    id.innerHTML = `Id del proceso: <br> ${data.id}`
    path.innerHTML = `Carpeta del proyecto: <br> ${data.path}`

    version.innerHTML = `Versión de Node: <br> ${data.version}`
    memoria.innerHTML = `Memoria total reservada: <br> ${data.memoria}`


})


