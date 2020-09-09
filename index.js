
const path = require('path');
const express = require('express');
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


app.get('/alta', alta);
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));


