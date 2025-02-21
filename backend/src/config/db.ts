/*
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;
*/
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database | null = null; // Store the database instance

async function initializeDb() {
    if (!dbInstance) {
        dbInstance = await open({
            filename: "C:\\Users\\NIKHIL\\Downloads\\API-BACKEND\\data-import-utility\\data-import-utility -TS\\src\\database.sqlite", // Ensure the path is correct
            driver: sqlite3.Database,
        });
        console.log(' Database connected!');
    }
    return dbInstance;
}

export default initializeDb;


