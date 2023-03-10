const fs = require ('fs')
const {faker} = require ('@faker-js/faker')
faker.locale = 'es'

const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;


const util = require('util')

module.exports = class databs {
    constructor(options, tabla) {
        this.knex = require('knex')(options)
        this.tabla = tabla
    }

    async myChat() {
        const fileStructure= `
        [
            {
                "id": "mensajes",
                "mensajes": [

                ]
            }
        ]
        `
        if(!fs.existsSync("./DB/chats.txt")){
            try{
            await fs.promises.writeFile('./DB/chats.txt', fileStructure)
            } catch(error) {
            console.log('error!: ',error)
            }
        }
    }

    async saveMsn (object) {
        await this.myChat()
        try{
            const datos = await fs.promises.readFile("./DB/chats.txt", 'utf-8')
            const data = JSON.parse(datos)
            const ids = data[0].mensajes.map((mensajes) => mensajes.id);
            const idMaximo = Math.max(...ids);
            object.id = idMaximo + 1
            data[0].mensajes.push(object)
            await fs.promises.writeFile("./DB/chats.txt", JSON.stringify(data, null, 2))
        } catch(error) {
            console.log('error!: ',error)
        }
    }

    async getChat () {
        await this.myChat()
        try{
            const datos = await fs.promises.readFile("./DB/chats.txt", 'utf-8')
            const data = JSON.parse(datos)


            const author = new schema.Entity('authors',{},{
                idAttribute: "id"
            })
            const mensaje = new schema.Entity('mensajes',{
                author: author,
            })
            const chat = new schema.Entity('chat', {
                mensajes: [mensaje]
            })
            const normalizedData = normalize(data[0], chat)
            const normalizedDataJSON = JSON.stringify(normalizedData)
            return normalizedDataJSON
        } catch(error) {
            console.log('error!: ',error)
        }
    }

    print (objeto) {
        console.log(util.inspect(objeto, true, 12, true))
    }



    async saveProduct(object) {
        try {
            await this.knex(this.tabla).insert(object)
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }

    async getAll() {
        try {
            let result = await this.knex.from(this.tabla).select("*")
            return result
        } catch (error) {
            console.log('Error en la base de datos', error)
        }
    }



    async randomProducts(cant = 5) {
        let objetos = []
        for (let i = 0; i < cant; i++) {
            let titulo = faker.commerce.productName();
            let precio = (Math.floor(Math.random() * 15) + 5).toFixed(2)
            let imgUrl = faker.image.technics(150, 150, true);
            objetos.push({title: titulo, price: precio, thumbnail: imgUrl})
        }
        return objetos
    }

}