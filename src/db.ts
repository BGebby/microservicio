
import { Pool } from "pg";
import { configEnv } from "./Config/config-db";

// Obtener las credenciales desde las variables de entorno
const { host, port, user, password, database } = configEnv.pg;
const parsedNumber = Number(port);

const pool = new Pool({
  host: host,
  port: parsedNumber,
  user: user,
  password:password,
  database:database,
  
});

pool.connect()
  .then((client) => {
    console.log(`CONNECTED TO THE PostgreSQL DATABASE en el PUERTO:${port}`);
    client.release(); // Liberar la conexión
  })
  .catch((error) => {
    console.error("ERROR CONNECTING TO THE DATABASE: ", error);
  });

export default pool;