
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


app.use(bodyParser.json()); 
//Route
app.get('/alta', controller.alta);
app.post('/ciudades', controller.ciudades);
app.get('/paises', controller.paises);
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));


