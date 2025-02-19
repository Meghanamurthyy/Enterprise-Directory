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
import express, { Request, Response } from 'express';
import initializeDB from './config/db'; // Assuming db initialization function
import employeeRoute from './Routes/employeeRoute'; // Assuming you have an employeeRoute file
import programRoute from './Routes/programRoute';

const app = express();
const PORT = process.env.PORT || 4590;

app.use(express.json());
app.use('/api/programs', programRoute);
app.use('/api/employees', employeeRoute);  // Make sure this is correctly added



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
