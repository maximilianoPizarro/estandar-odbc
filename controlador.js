
const odbc = require('odbc');
const datasource = process.env.DATASOURCE || 'DSN=MySQL';

module.exports= {
    alta: (req, res) => {
        console.log( Date() + ": /alta" );  
        try {
            console.log(JSON.stringify(req.body, null, 0))
            const cursor = odbc.connect(datasource,(error, cursor)=>{              
              cursor.query('call nuevocliente(?)',[JSON.stringify(req.body, null, 0)],
              (error, result)=>{
                if(error){
                  return res.send(JSON.stringify(error))
                }else{
                  return res.send("<strong>Cliente creado exitosamente!</strong>")
                }  
              });
            });
        } catch (e) {
            console.error( e )
            res.status( 500 )
            res.send( e )
        }
      },
      modificacion: (req, res) => {
        console.log( Date() + ": /modificacion" );  
        try {
            console.log(JSON.stringify(req.body, null, 0))
            const cursor = odbc.connect(datasource,(error, cursor)=>{              
              cursor.query('call modificacliente(?)',[JSON.stringify(req.body, null, 0)],
              (error, result)=>{
                if(error){
                  return res.send(JSON.stringify(error))
                }else{
                  return res.send("<strong>Cliente modificado exitosamente!</strong>")
                }  
              });
            });
        } catch (e) {
            console.error( e )
            res.status( 500 )
            res.send( e )
        }
      },
      baja: (req, res) => {
        console.log( Date() + ": /baja" );  
        try {
            console.log(JSON.stringify(req.body, null, 0))
            const cursor = odbc.connect(datasource,(error, cursor)=>{              
              cursor.query('call bajacliente(?)',[JSON.stringify(req.body, null, 0)],
              (error, result)=>{
                if(error){
                  return res.send(JSON.stringify(error))
                }else{
                  return res.send("<strong>Cliente eliminado exitosamente!</strong>")
                }  
              });
            });
        } catch (e) {
            console.error( e )
            res.status( 500 )
            res.send( e )
        }
      },                
    ciudadesById: (req, res) => {
        console.log( Date() + ": /ciudadesById "+req.body.country_id);  
        try {
            const cursor = odbc.connect(datasource,(error, cursor)=>{
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
      ciudades: (req, res) => {
        console.log( Date() + ": /ciudades ");  
        try {
            const cursor = odbc.connect(datasource,(error, cursor)=>{
              cursor.query('select city_id,city from city',
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
            const cursor = odbc.connect(datasource,(error, cursor)=>{
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
            const cursor = odbc.connect(datasource,(error, cursor)=>{
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
      },
      clientes: (req, res) => {
        console.log( Date() + ": /clientes ");  
        try {
            const cursor = odbc.connect(datasource,(error, cursor)=>{
              cursor.query('select customer_id,first_name,last_name from customer order by customer_id desc limit 10',
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
      buscar: (req, res) => {
        console.log( Date() + ": /buscar ");  
        try {
            console.log(JSON.stringify(req.body, null, 0))
            const cursor = odbc.connect(datasource,(error, cursor)=>{
              cursor.query('call busquedanombreciudad(?)',[JSON.stringify(req.body, null, 0)],
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
      clientesById: (req, res) => {
        console.log( Date() + ": /clientesById "+req.body.customer_id);  
        try {
            const cursor = odbc.connect(datasource,(error, cursor)=>{
              cursor.query('call busquedaid('+req.body.customer_id+')',
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
