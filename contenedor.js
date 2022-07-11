const fs = require("fs")

class contenedor {
    constructor (archivo){
        this.archivo = archivo
    }


    async save(obj){
    try{
        const contenido = await fs.promises.readFile(this.archivo, "utf-8")

        const contenidoObj = JSON.parse(contenido)
        let result = []
        if (contenidoObj.length == 0){
            const idNuevo = 1;
            const newProduct = {
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail,
                id: idNuevo
            };
            console.log(idNuevo)
            contenidoObj.push(newProduct)
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj, null, 2));
        } else{
        for (const property in contenidoObj) {
            result = result.concat(`${contenidoObj[property].id}`)
        }
        const ultimoId = result[result.length -1]
        let idNuevo = parseInt(ultimoId, 10)+1
        const newProduct = {
            title: obj.title,
            price: obj.price,
            thumbnail: obj.thumbnail,
            id: idNuevo
        };
        console.log(idNuevo)
        contenidoObj.push(newProduct)
        await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj, null, 2));
    }} catch(err){
        console.log(`Error,no se puede leer el archivo: ${err.message}`);
    }
    }

    async getById(num){
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const contenidoObj = JSON.parse(contenido)
            // console.log(contenidoObj)
            const byId = contenidoObj.find(byId => byId.id === num)
            //console.log(byId)
            return byId

        }catch(err){
            console.log(`Error,no se puede leer el archivo: ${err.message}`);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const contenidoObj = JSON.parse(contenido)
            return contenidoObj;
        }catch (err) {
            throw new Error(`Error ${err.message}`)
        }
       //return contenidoObj; 
    }

    async deleteById(num){
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const contenidoObj = JSON.parse(contenido)
           
            const byId = contenidoObj.filter(item => item.id !== num)
            await fs.promises.writeFile(this.archivo, JSON.stringify(byId, null, 2), (err) => { });
            console.log("Producto Eliminado")

        }catch(err){
            console.log(`Error,no se puede leer el archivo: ${err.message}`);
        }
        
    }

    async deleteAll(){
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const contenidoObj = JSON.parse(contenido)
            const byId = contenidoObj.filter(item => item.id === "X")
            await fs.promises.writeFile(this.archivo, JSON.stringify(byId, null, 2), (err) => { });
            console.log("Eliminados todos los productos")

        }catch(err){
            console.log(`Error,no se puede leer el archivo: ${err.message}`);
        }
        
    }

}

module.exports = contenedor
//const c = new contenedor('./productos.txt')
// c.save(
// {
//     title: 'Compass',
//     price: 123.42,
//     thumbnail: 'https://www.iconfinder.com/icons/2263043/compass_divider_drafting_drawing_geometry_icon'
// })
//  c.getById(3)
//  c.deleteById(2)
// c.getAll()
// c.deleteAll()
