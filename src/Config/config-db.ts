import { config } from 'dotenv';
config();

export const configEnv = {
   
    pgadmin:{
        portPG: process.env.PG_PORT || 5050,
    },
    api: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.NODE_LOCAL_PORT || 3003,
    },
    pg: {
        host: process.env.DB_HOST || 'postgres-db',
        port: process.env.DB_PORT || 5432,
        database: process.env.DATABASE || 'postgres',
        user: process.env.DB_USER || 'myuser',
        password: process.env.DB_PASSWORD || 'mypassword',
    },
};
