DROP PROCEDURE IF EXISTS `nuevocliente`;

DELIMITER $$

CREATE DEFINER='root'@'localhost' PROCEDURE `nuevocliente` (
IN cliente   JSON )
BEGIN
    DECLARE identificador smallint;

    INSERT INTO address (address,address2,district,city_id,
    postal_code,phone,location,last_update)
    VALUES(JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.address')),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.address2')),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.district')),     
     JSON_EXTRACT(cliente, '$.city_id'), 
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.postal_code')),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.phone')),
     ST_GeomFromText(JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.location')),0),
     CURRENT_TIMESTAMP);

    SELECT max(address_id) from address into identificador;
        
    INSERT INTO customer (store_id,last_name,first_name,email,active,address_id)
    VALUES(JSON_EXTRACT(cliente, '$.store_id'),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.last_name')),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.first_name')),
     JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.email')),    
     JSON_EXTRACT(cliente, '$.active'),
     identificador
      );

END $$
DELIMITER ;



