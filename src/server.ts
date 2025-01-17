import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { configEnv } from './Config/config-db';
import insertPerson from './routes/insertPerson'

const { port } = configEnv.api;
const { portPG } = configEnv.pgadmin;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas de personas
app.use('/', insertPerson);

app.listen(port, () => {
  console.log(`Micro-service running on http://localhost:${port}`);
});

app.listen(portPG, () => {
  console.log(`DB-PostgreSQL running on http://localhost:${portPG}`);
});