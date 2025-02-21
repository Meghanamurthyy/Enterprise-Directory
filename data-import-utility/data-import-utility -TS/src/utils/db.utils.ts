import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});

// Create tables if they do not exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Employees (
            TE_ID VARCHAR(20) PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50),
            email VARCHAR(100) NOT NULL UNIQUE,
            phone_number VARCHAR(15),
            date_of_joining DATE NOT NULL,
            manager_id VARCHAR(20)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Programs (
            program_id VARCHAR(20) PRIMARY KEY,
            program_name VARCHAR(100) NOT NULL,
            program_description TEXT,
            start_date DATE,
            end_date DATE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Employee_Programs (
            TE_ID VARCHAR(20),
            program_id VARCHAR(20),
            expertise_area VARCHAR(100),
            sme_status TEXT DEFAULT 'NO',
            FOREIGN KEY (TE_ID) REFERENCES Employees(TE_ID),
            FOREIGN KEY (program_id) REFERENCES Programs(program_id)
        )
    `);
});

export default db;
