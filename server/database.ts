import { Sequelize } from "sequelize";
require('dotenv').config();

interface DataBase {
        name: string,
        user: string,
        password: string,
        host: string,
        port: number,
}

const dbConfig: DataBase = {
    name: process.env.DB_NAME || String(process.env.DB_NAME),
    user: process.env.DB_USER || String(process.env.DB_USER),
    password: process.env.DB_PASSWORD || String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST || String(process.env.DB_HOST),
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
 };

const sequelize = new Sequelize(

    dbConfig.name,
    dbConfig.user,
    dbConfig.password,

    {
        dialect: "postgres",
        host: dbConfig.host,
        port: dbConfig.port,
    }
);

export default sequelize;