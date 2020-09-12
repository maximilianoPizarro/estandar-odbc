DROP PROCEDURE IF EXISTS `busquedaid`;
DELIMITER $$
CREATE DEFINER='root'@'localhost' PROCEDURE `busquedaid` (
    IN identificador smallint)
BEGIN
    select customer.customer_id as customer_id,
           customer.store_id as store_id,
           customer.last_name as last_name,
           customer.first_name as first_name,
           customer.email as email,
           customer.active as active,
           address.address_id as address_id,
           address.address as address,
           address.address2 as address2,
           address.district as district,
           address.city_id as city_id,
           address.postal_code as postal_code,
           address.phone as phone,
           address.location as location,
           city.country_id as country_id
    from
        customer
    inner join  address on address.address_id=customer.address_id
    inner join city on city.city_id=address.city_id
    where
    customer.customer_id=identificador;           
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS `busquedanombreciudad`;
DELIMITER $$
CREATE DEFINER='root'@'localhost' PROCEDURE `busquedanombreciudad` (
    IN cliente JSON)
BEGIN
    select customer.customer_id as customer_id,
           customer.store_id as store_id,
           customer.last_name as last_name,
           customer.first_name as first_name
    from
        customer
    inner join  address on address.address_id=customer.address_id
    inner join city on city.city_id=address.city_id
    where
    customer.last_name LIKE CONCAT('%',JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.last_name')))
    OR customer.first_name LIKE CONCAT('%',JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.first_name')))
    OR address.city_id = JSON_EXTRACT(cliente, '$.city_id');      
END $$
DELIMITER ;


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

DROP PROCEDURE IF EXISTS `modificacliente`;
DELIMITER $$
CREATE DEFINER='root'@'localhost' PROCEDURE `modificacliente` (
IN cliente   JSON )
BEGIN
    DECLARE identificador smallint;
    
    UPDATE address 
    SET address=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.address')),
        address2=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.address2')),
        district=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.district')),
        city_id=cliente>'$.city_id',
        postal_code=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.postal_code')),
        phone=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.phone')),
        location=ST_GeomFromText(JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.location')),0),
        last_update=CURRENT_TIMESTAMP
    where
     address_id=JSON_EXTRACT(cliente,'$.address_id');

    UPDATE customer 
    SET store_id=cliente>'$.store_id',
        last_name=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.last_name')),
        first_name=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.first_name')),
        email=JSON_UNQUOTE(JSON_EXTRACT(cliente, '$.email')),
        active=cliente>'$.active'
    WHERE
    customer_id=JSON_EXTRACT(cliente,'$.customer_id');
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS `bajacliente`;
DELIMITER $$
CREATE DEFINER='root'@'localhost' PROCEDURE `bajacliente` (
IN cliente   JSON )
BEGIN    
    DELETE FROM address, customer USING customer
    INNER JOIN  address
    WHERE
    customer.address_id=address.address_id
    AND customer.customer_id=JSON_EXTRACT(cliente,'$.customer_id');
END $$
DELIMITER ;