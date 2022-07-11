const express = require('express');
const contenedor = require('./contenedor.js');
const app = express();
const PORT = 8080;
// GLITCH
// const PORT = process.env.PORT || 3000
const c1 = new contenedor('./productos.txt')

app.get('/', (req, res)=>{
    
    res.send('<h1 style="color:blue;">Bienvenidos al servidor Express para ver los productos </h1>')
})

app.get('/productos', (req, res)=>{
    c1.getAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    })
    //console.log(c_1.getAll())
})

app.get('/productoRandom', (req, res)=>{
    let result = []
    c1.getAll()
    .then(data =>{
        
        for (const property in data) {
            result = result.concat(`${data[property].id}`)
        }
        let max = result.length
        let random = Math.floor(Math.random() * max) + 1
        
        c1.getById(random)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })
        
        console.log(random)
    })
    .catch(err =>{
        console.log(`ERROR ${err}`)
    })
    
  
})

const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error en sevidor ${error}`));
