const express = require ('express')
const router = express.Router()
const {fork} = require ('child_process')

router.get('/', async (req, res) => {
    const { cant } = req.query
    const child = fork ('./numsAleatorios.js')
    child.send(parseInt(cant))
    child.on('message', mensaje =>{
        res.render('randoms', {titulo: 'Numeros Aleatorios', lista: mensaje})
    })
})

module.exports = router;