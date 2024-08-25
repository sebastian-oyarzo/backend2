
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;



app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/canciones', (req, res) => {
    const leer = fs.readFileSync('repertorio.json', 'utf8');
    const array = JSON.parse(leer);
    res.send(array);
 });

app.post('/canciones', (req, res) => {
    const nuevoObjeto = req.body;
    const viejoJson = fs.readFileSync('./repertorio.json', 'utf8');
    const viejoJsonArray = JSON.parse(viejoJson);
    const nuevoJson = [...viejoJsonArray, nuevoObjeto];
    fs.writeFileSync((path.join(__dirname,"repertorio.json") ), JSON.stringify(nuevoJson, null ,2) );
    res.send(nuevoJson);
});



 app.put('/canciones/:id', (req, res) => {
    const idModificar = req.params.id;
    const nuevoObjeto = req.body;
    const leer = fs.readFileSync('repertorio.json', 'utf8');
    const array = JSON.parse(leer);
    const actualizar = array.map((cancion) => cancion.id == idModificar? {...cancion, ...nuevoObjeto} : cancion );
    fs.writeFileSync('repertorio.json', JSON.stringify(actualizar, null, 2), 'utf8');
    res.send(actualizar);
 });

  app.delete('/canciones/:id', (req, res) => {
    const leer = fs.readFileSync('repertorio.json', 'utf8');
    const array = JSON.parse(leer);
    const idBorrar = req.params.id;
    const nuevoArray = array.filter(user => user.id != idBorrar);
    fs.writeFileSync('repertorio.json', JSON.stringify(nuevoArray, null, 2), 'utf8');
    res.send(nuevoArray);
  });


app.listen(port, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

