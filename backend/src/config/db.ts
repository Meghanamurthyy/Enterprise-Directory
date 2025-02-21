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
import path from 'path';

let dbInstance: Database | null = null; // Store the database instance

async function initializeDb() {
    if (!dbInstance) {

       // Move up three levels to reach the root folder (from backend/src/config to API-BACKEND)
        const rootDir = path.resolve(__dirname, '..', '..', '..');

        // Resolve the SQLite file path dynamically
        const dbPath = process.env.DB_PATH
            ? path.resolve(rootDir, process.env.DB_PATH) // Use .env if set
            : path.resolve(rootDir, 'data-import-utility/src/enterprise_directory.sqlite'); // Default path
        dbInstance = await open({
            filename: dbPath, // Ensure the path is correct
            driver: sqlite3.Database,
        });
        console.log(' Database connected!');
    }
    return dbInstance;
}

export default initializeDb;


