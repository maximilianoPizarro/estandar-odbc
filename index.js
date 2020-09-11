
const path = require('path');
const express = require('express');
const controller = require('./module.js');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicRoot });
});

app.get('/util.js', (req, res) => {
  res.sendFile('util.js',{ root: publicRoot });
});

app.use(bodyParser.json()); 
//Route
app.post('/alta', controller.alta);
app.post('/ciudadesById', controller.ciudadesById);
app.post('/ciudades', controller.ciudades);
app.post('/clientes', controller.clientes);
app.get('/paises', controller.paises);
app.get('/tiendas', controller.tiendas);
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));


