
const odbc = require('odbc');

module.exports= {
    alta: (req, res) => {
        console.log( Date() + ": /alta" );  
        try {
            console.log(req.body)
            const cursor = odbc.connect('DSN=MySQL',(error, cursor)=>{
              cursor.callProcedure(null, "sakila", 'nuevocliente',[req.body],
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
      },
    
    ciudades: (req, res) => {
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
      },
    
    paises: (req, res) => {
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
      },    
      tiendas: (req, res) => {
        console.log( Date() + ": /tiendas" );  
        try {
            const cursor = odbc.connect('DSN=MySQL',(error, cursor)=>{
              cursor.query('select store_id, address from store, address limit 2',
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
      }          
}
