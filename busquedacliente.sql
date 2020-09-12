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

