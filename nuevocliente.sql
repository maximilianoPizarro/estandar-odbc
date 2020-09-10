DROP PROCEDURE IF EXISTS `nuevocliente`;

DELIMITER $$

CREATE DEFINER='root'@'localhost' PROCEDURE `nuevocliente` (
IN pParametroJson    JSON)
BEGIN 
    DECLARE vJsonEsValido INT;
    DECLARE vItems INT;
    DECLARE vIndex BIGINT UNSIGNED DEFAULT 0;
    
    # Variables para parseo del objeto JSON
    DECLARE vstore_id tinyint;
    DECLARE vlast_name varchar(45);
    DECLARE vfirst_name varchar(45);
    DECLARE vemail varchar(50);
    DECLARE vactive tinyint(1);
    DECLARE vaddress varchar(50);
    DECLARE vaddress2 varchar(50);
    DECLARE vdistrict varchar(20);    
    DECLARE vcountry_id smallint;
    DECLARE vcity_id smallint;
    DECLARE vpostal_code varchar(10);
    DECLARE vphone varchar(10);
    DECLARE vlocation geometry;
    
    SET vJsonEsValido = JSON_VALID(pParametroJson);
    
    IF vJsonEsValido = 0 THEN 
        # El objeto JSON no es válido, salimos prematuramente
        SELECT "JSON suministrado no es válido";
    ELSE 
        # Nuestro objeto es válido, podemos proceder
        SET vItems = JSON_LENGTH(pParametroJson);
        
        # El objeto es válido y contiene al menos un elemento
        IF vItems > 0 THEN 
            # Creamos una tabla temporal donde guardaremos momentáneamente
            # el contenido del objeto JSON para facilitar su uso
            DROP TEMPORARY TABLE IF EXISTS `tmp_jsonTest`;
            CREATE TEMPORARY TABLE `tmp_jsonTest` (
                `index`        INT(11) NOT NULL,
                `vstore_id` tinyint,
                `vlast_name` varchar(45),
                `vfirst_name` varchar(45),
                `vemail` varchar(50),
                `vactive` tinyint(1),
                `vaddress` varchar(50),
                `vaddress2` varchar(50),
                `vdistrict` varchar(20),    
                `vcountry_id` smallint,
                `vcity_id` smallint,
                `vpostal_code` varchar(10),
                `vphone` varchar(10),
                `vlocation` geometry
                        );
            
            WHILE vIndex < vItems DO
                SET vstore_id = JSON_EXTRACT(pParametroJson, 'store_id');
            #    SET vlast_name = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].vlast_name')));                                               
            #    SET vfirst_name = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].first_name')));
            #    SET vemail = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].email')));
            #    SET vactive = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].active')));
            #    SET vaddress = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].address')));
            #    SET vaddress2 = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].address2')));
            #    SET vdistrict = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].district')));    
            #    SET vcountry_id = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].country_id')));
            #    SET vcity_id = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].city_id')));
            #    SET vpostal_code = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].postal_code')));
            #    SET vphone = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].phone')));
            #    SET vlocation = JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].location'));
                INSERT INTO `tmp_jsonTest` 
                	(`index`,`vstore_id`) 
                VALUES
                	(vIndex, vstore_id); 
   
                SET vIndex = vIndex + 1;
            END WHILE;
            
            # Aca podemos ya trabajar con el contenido de nuestro JSON
            # interactuando directamente sobre la tabla temporal utilizando
            # instrucciones SQL tradicionales
            
            # Antes de finalizar es conveniente deshacernos de la
            # tabla temporal para no dejar basura regada en la base de datos
            #DROP TEMPORARY TABLE IF EXISTS `tmp_jsonTest`;
        END IF;
    END IF;
END $$
DELIMITER ;



