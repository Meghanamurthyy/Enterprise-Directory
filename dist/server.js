"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import express, { Request, Response } from 'express';
import programRoute from './Routes/programRoute';
import employeeRoute from './Routes/employeeRoute';
import pool from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());



app.use('/api/programs', programRoute);
app.use('/api/employees', employeeRoute);

// Check database connection with async/await
// const checkDbConnection = async () => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     console.log('Connected to the database:', result.rows[0].now);
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//     process.exit(1);  // Exit if the DB connection fails
//   }
// };

// checkDbConnection();


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db")); // Assuming db initialization function
const employeeRoute_1 = __importDefault(require("./Routes/employeeRoute")); // Assuming you have an employeeRoute file
const programRoute_1 = __importDefault(require("./Routes/programRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4590;
app.use(express_1.default.json());
app.use('/api/programs', programRoute_1.default);
app.use('/api/employees', employeeRoute_1.default); // Make sure this is correctly added
// Your /test-db route
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.default)(); // Initialize DB
        const query = 'SELECT * FROM Employees WHERE TE_ID = ?';
        const result = yield db.get(query, ['TE605343']); // Test with a known teid
        console.log('Test DB query result:', result); // Check result
        res.json(result); // Return result to confirm it works
    }
    catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Database query failed', error });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
