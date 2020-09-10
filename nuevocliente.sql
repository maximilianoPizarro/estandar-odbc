DROP PROCEDURE IF EXISTS `nuevocliente`;

DELIMITER $$

CREATE DEFINER='root'@'localhost' PROCEDURE `nuevocliente` (
    IN nombre varchar(128), IN apellido varchar(128),
    IN anio year)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE identicador_actor INT;
    DECLARE identificador_film INT;
    DECLARE listado CURSOR FOR SELECT film_id FROM film WHERE  film.release_year=anio;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    INSERT INTO actor (first_name,last_name) VALUES(nombre,apellido);        
    SELECT max(actor.actor_id) FROM actor INTO identicador_actor;  
    OPEN listado;
    read_loop: LOOP
      FETCH listado INTO identificador_film;
        IF done THEN
        LEAVE read_loop;
        ELSE
        INSERT INTO film_actor (actor_id,film_id)        
        VALUES (identicador_actor,identificador_film);
        END IF;      
    END LOOP;       
    CLOSE listado;  
    SELECT actor.actor_id, actor.first_name, actor.last_name, count(*) FROM actor,film_actor
    WHERE actor.actor_id=identicador_actor
    AND actor.actor_id=film_actor.actor_id;  
END $$
DELIMITER ;



