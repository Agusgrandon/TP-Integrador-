import mysql2 from "mysql2/promise";
import environments from "../config/environments.js";

const {database} = environments;

//pool de conexiones
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;

/*
mysql2 es el modulo

- createPool es una funcion que crea un grupo (pool) de conexiones a la BBDD

    - Crea un gestor de conexiones automatico
    - Se conecta a la BBDD usando los parametros host, database, user y pass
    - Por defecto abre hasta 10 conexiones simultaneas (configurable)
    - Como usamos mysql2/promises podemos usar await connection.query() para ejecutar sentencias sql
    - Le pasamos la configuracion desde el objeto database

- Este objeto connection es el que usaremos en otras partes de la aplicacion para hacer consultas a la BBDD
*/