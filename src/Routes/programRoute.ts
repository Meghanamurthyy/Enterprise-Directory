/*import express from 'express';
import ProgramController from '../controller/programController';  // Adjust path if necessary

const router = express.Router();

// Route to create a new program
router.post('/createProgram', ProgramController.createProgram);

// Route to assign an employee to a program
router.post('/assignEmployeeToProgram', ProgramController.assignEmployeeToProgram);

// Route to update employee's program details
router.put('/updateEmployeeProgram', ProgramController.updateEmployeeProgram);

// Route to remove an employee from a program
router.delete('/removeEmployeeFromProgram', ProgramController.removeEmployeeFromProgram);

// Route to get employees by program
router.get('/getEmployeesByProgramName', ProgramController.getEmployeesByProgram);

export default router;
*/
import express from 'express';
import ProgramController from '../controller/programController';  // Adjust path if necessary

const router = express.Router();

// Route to create a new program
router.post('/create', ProgramController.createProgram);

// Route to assign an employee to a program
router.post('/assign', ProgramController.assignEmployeeToProgram);

// Route to update employee's program details
router.put('/update', ProgramController.updateEmployeeProgram);

// Route to remove an employee from a program
router.delete('/remove', ProgramController.removeEmployeeFromProgram);

// Route to get employees by program
router.get('/getEmployees/:program_name', ProgramController.getEmployeesByProgram);

export default router;
