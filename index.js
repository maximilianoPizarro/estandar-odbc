
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const odbc = require('odbc');

const port = process.env.PORT || 8080;
const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicRoot });
});

const alta = (req, res) => {
    console.log( Date() + ": /alta" );  
    try {
        const cursor = odbc.connect('DSN=MySQL',(error, cursor)=>{
          cursor.query('select * from film',
          (error, result)=>{
            if(error){
              return res.send(JSON.stringify(error))
            }else{
              return res.send(JSON.stringify(result))
            }  
          });
        });
    } catch (e) {
        console.error( e )
        res.status( 500 )
        res.send( e )
    }
  };

  const ciudades = (req, res) => {
    console.log( Date() + ": /ciudades "+req.body.country_id);  
    try {
        const cursor = odbc.connect('DSN=MySQL',(error, cursor)=>{
          cursor.query('select city_id,city from city where country_id='+req.body.country_id,
          (error, result)=>{
            if(error){
              return res.send(JSON.stringify(error))
            }else{              
              
              return res.send(result)
            }  
          });
        });
    } catch (e) {
        console.error( e )
        res.status( 500 )
        res.send( e )
    }
  };

  const paises = (req, res) => {
    console.log( Date() + ": /paises" );  
    try {
        const cursor = odbc.connect('DSN=MySQL',(error, cursor)=>{
          cursor.query('select country_id,country  from country',
          (error, result)=>{
            if(error){
              return res.send(JSON.stringify(error))
            }else{              
              
              return res.send(result)
            }  
          });
        });
    } catch (e) {
        console.error( e )
        res.status( 500 )
        res.send( e )
    }
  };

app.use(bodyParser.json()); 

app.get('/alta', alta);
app.post('/ciudades', ciudades);
app.get('/paises', paises);
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));


