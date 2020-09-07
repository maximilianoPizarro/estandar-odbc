
const path = require('path');
const express = require('express');

const port = process.env.PORT || 8080;
const publicRoot = path.resolve(path.join(__dirname, '/'), '');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicRoot });
});

const alta = (req, res) => {
    console.log( Date() + ": /alta" );  
    try {
        return res.json({
            estado: "success"
        })
    } catch (e) {
        console.error( e )
        res.status( 500 )
        res.send( e )
    }
  };


app.get('/alta', alta);
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));


