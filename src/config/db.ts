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
import { open } from 'sqlite';

async function initializeDb() {
    const db = await open({
        filename: 'C:/Users/megha/Downloads/enterprise_directory.db', // Ensure this path is correct
        driver: sqlite3.Database,
    });

    return db;
}

export default initializeDb;

