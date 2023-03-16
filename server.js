
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}


const express = require('express');
const app = express();
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { engine } = require('express-handlebars');
const passport = require('passport')
const flash = require('express-flash')
const yargs = require('yargs/yargs')(process.argv.slice(2))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const cluster = require ('cluster')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mariaDB = require('./options/options');
const sqlite3 = require('./options/options2')
const numCPUs = require ('os').cpus().length


app.engine('handlebars', engine({
    defaultLayout: false
}))

app.set("view engine", "handlebars");
app.set("views", "./views")
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://belshus:belen1234@cluster0.vu0bw1i.mongodb.net/test',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:
    {
        maxAge:30000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

const { PORT, mode } = yargs
    .alias({
        p: 'PORT',
        m: 'mode'

    })
    .default({
        PORT: 8080,
        mode: 'FORK'
    })
    .argv

    if(mode == "CLUSTER") {
        if(cluster.isMaster) {
            for(let i = 0; i < numCPUs; i++) {
                cluster.fork()
            }
            console.log(`process ${process.pid}`)
            cluster.on('exit', (worker, code, signal) => {
                console.log(` worker ${worker.process.pid} fue cerrado con exito`)
            })
        } else {
            iniciarServidor()
        }
    } else {
        iniciarServidor()
    }

    function iniciarServidor() {
        const connectServer = httpServer.listen(PORT, () => console.log(`Servidor Express con WebSocket iniciado en modo ${mode} escuchando el puerto ${connectServer.address().port} - Proceso N° ${process.pid}`))
        connectServer.on("error", error => console.log(`Error en servidor ${error}`))
    }
const mongoUrl = process.env.MONGOURL

const users = require('./classes/dataUser')
const db = require('./classes/databs')
const chat = new db(sqlite3.options, 'mensajes')
const prod = new db(mariaDB.options, 'productos')
const usr = new users(mongoUrl)

io.on('connection', async (socket) => {
    console.log('Cliente en linea')
    socket.emit('mensajes', await chat.getChat())
    socket.emit('mensaje', await chat.getChat())
    socket.emit('productos', await prod.getAll())
    socket.emit('producto', await prod.getAll())
    socket.emit('productos-random', await prod.randomProducts())
    socket.emit('info', getInfo())
    socket.on('new-message', async (data) => {
        await chat.saveMsn(data)
        io.sockets.emit('mensaje', await chat.getChat())
    })
    socket.on('new-producto', async (data) => {
        await prod.saveProduct(data)
        io.sockets.emit('producto', await prod.getAll())
    })
})

const initializePassport = require('./config/passport.js')
initializePassport(
    passport,
    email => usr.findUserByMail(email),
    id => usr.findUserById(id),
)

app.get('/api/productos-test', auth, async (req, res) => {
    const { cant } = req.query
    res.render('test', { titulo: 'Pruebas de Productos aleatorios', lista: await prod.randomProducts(parseInt(cant)) })
})

app.get('/', auth, async (req, res) => {
    res.render('main', { email: req.user.email, titulo: 'Index', lista: prod.getAll(), mensajes: chat.getAll() })

})

app.get('/login', notAuth, (req, res) => {
    res.render('login', { titulo: 'Login de usuario' })
})

app.post('/login', notAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


app.get('/register', notAuth, (req, res) => {
    res.render('register', { titulo: 'Registro de usuario nuevo' })
})

app.post('/register', notAuth, async (req, res) => {
    if (usr.findUserById(req.body.email)) {
        res.render('register', { titulo: 'Registro de usuario nuevo', error: 'El usuario ya existe' })
    } else {
        try {
            usr.saveUser(req.body.email, req.body.password)
            res.redirect('/login')
        } catch {
            res.redirect('/register')
        }
    }
})

app.get('/logout', auth, (req, res) => {
    res.render('logout', { usuario: req.user.email, titulo: 'cierre de sesión' })
})

app.get('/exit', auth, (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
})

app.get('/info', (req, res) => {
    res.render('info', { titulo: 'Info del Proceso' })
})

const routes = require ('./routers/rutas.js')

app.use('/api/randoms', routes)


function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login')
    }

}

function notAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}

function getInfo() {
    const args = process.argv.slice(2)
    const plat = process.platform
    const version = process.version
    const memoria = process.memoryUsage().rss
    const exe = __dirname
    const path = process.cwd()
    const id = process.pid
    const info = {
        args, plat, version, memoria, exe, id, path, numCPUs
    }
    return info
}