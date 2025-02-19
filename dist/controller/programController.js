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
const db_1 = __importDefault(require("../config/db")); // Import the initializeDB function
class ProgramController {
    constructor() {
        // Create a new program
        this.createProgram = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { programName, programDescription } = req.body;
                if (!programName) {
                    res.status(400).json({ message: 'programName is required' });
                    return;
                }
                const db = yield (0, db_1.default)(); // Initialize the database connection
                // Prepare and run insert query
                const result = yield db.run('INSERT INTO programs (program_name, program_description) VALUES (?, ?)', [programName, programDescription || null]);
                res.status(201).json({ message: 'Program created successfully', programId: result.lastID });
            }
            catch (error) {
                console.error('Error creating program:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Assign an employee to a program
        this.assignEmployeeToProgram = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teid, programName, expertise_area, sme_status } = req.body;
                if (!teid || !programName) {
                    res.status(400).json({ message: 'teid and programName are required' });
                    return;
                }
                const db = yield (0, db_1.default)(); // Initialize the database connection
                // Fetch program ID
                const program = yield db.get('SELECT program_id FROM programs WHERE program_name = ?', [programName]);
                if (!program) {
                    res.status(404).json({ message: 'Program not found' });
                    return;
                }
                // Insert employee-program mapping with conflict handling
                const result = yield db.run(`INSERT INTO employee_programs (teid, program_id, expertise_area, sme_status) 
         VALUES (?, ?, ?, ?) 
         ON CONFLICT(teid, program_id) DO UPDATE SET expertise_area = excluded.expertise_area, sme_status = excluded.sme_status`, [teid, program.program_id, expertise_area, sme_status]);
                res.status(201).json({ message: 'Employee assigned to program successfully', programId: program.program_id });
            }
            catch (error) {
                console.error('Error assigning employee to program:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Update employee program details
        this.updateEmployeeProgram = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teid, programName, expertise_area, sme_status } = req.body;
                if (!teid || !programName) {
                    res.status(400).json({ message: 'teid and programName are required' });
                    return;
                }
                const db = yield (0, db_1.default)(); // Initialize the database connection
                // Fetch program ID
                const program = yield db.get('SELECT program_id FROM programs WHERE program_name = ?', [programName]);
                if (!program) {
                    res.status(404).json({ message: 'Program not found' });
                    return;
                }
                // Update employee's program details
                const result = yield db.run(`UPDATE employee_programs 
         SET expertise_area = ?, sme_status = ? 
         WHERE teid = ? AND program_id = ?`, [expertise_area, sme_status, teid, program.program_id]);
                if (result.changes === 0) {
                    res.status(404).json({ message: 'Employee not assigned to this program' });
                    return;
                }
                res.json({ message: 'Employee program updated successfully' });
            }
            catch (error) {
                console.error('Error updating employee program:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Remove an employee from a program
        this.removeEmployeeFromProgram = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teid, programName } = req.body;
                if (!teid || !programName) {
                    res.status(400).json({ message: 'teid and programName are required' });
                    return;
                }
                const db = yield (0, db_1.default)(); // Initialize the database connection
                // Fetch program ID
                const program = yield db.get('SELECT program_id FROM programs WHERE program_name = ?', [programName]);
                if (!program) {
                    res.status(404).json({ message: 'Program not found' });
                    return;
                }
                // Delete employee-program mapping
                const result = yield db.run('DELETE FROM employee_programs WHERE teid = ? AND program_id = ?', [teid, program.program_id]);
                if (result.changes === 0) {
                    res.status(404).json({ message: 'Employee not assigned to this program' });
                    return;
                }
                res.json({ message: 'Employee removed from program successfully' });
            }
            catch (error) {
                console.error('Error removing employee from program:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        this.getEmployeesByProgram = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { programName } = req.query; // Get programName from query params
                if (!programName) {
                    res.status(400).json({ message: 'Program name is required' });
                    return;
                }
                const db = yield (0, db_1.default)(); // Initialize the database connection
                // Fetch program ID
                const program = yield db.get('SELECT program_id FROM programs WHERE program_name = ?', [programName]);
                if (!program) {
                    res.status(404).json({ message: 'Program not found' });
                    return;
                }
                // Fetch employees assigned to this program
                const employees = yield db.all('SELECT e.teid, e.expertise_area, e.sme_status FROM employees e ' +
                    'JOIN employee_programs ep ON e.teid = ep.teid WHERE ep.program_id = ?', [program.program_id]);
                if (employees.length === 0) {
                    res.status(404).json({ message: 'No employees found for this program' });
                    return;
                }
                res.json({ employees });
            }
            catch (error) {
                console.error('Error fetching employees by program:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
    }
}
exports.default = new ProgramController();
