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
const db_1 = __importDefault(require("../config/db"));
class EmployeeController {
    constructor() {
        // Get all employees with pagination
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield (0, db_1.default)(); // Ensure DB is resolved first
                // Fetch all employees
                const rows = yield database.all('SELECT * FROM Employees');
                res.json(rows); // Send all employees as a JSON response
            }
            catch (error) {
                console.error('Error fetching all employees:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Get employee by teid
        this.getEmployeeByTeid = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { te_id } = req.params;
                const database = yield (0, db_1.default)(); // Ensure db is resolved first
                // Fetch the employee
                const query = 'SELECT * FROM Employees WHERE TE_ID = ?';
                const row = yield database.get(query, [te_id]);
                res.json(row);
            }
            catch (error) {
                console.error('Error in getEmployeeByTeid:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Update an employee
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teid } = req.params;
                const { first_name, last_name, email, phone_number, date_of_joining, manager_id } = req.body;
                const updates = [];
                const setFields = [];
                if (first_name)
                    setFields.push('first_name = ?'), updates.push(first_name);
                if (last_name)
                    setFields.push('last_name = ?'), updates.push(last_name);
                if (email)
                    setFields.push('email = ?'), updates.push(email);
                if (phone_number)
                    setFields.push('phone_number = ?'), updates.push(phone_number);
                if (date_of_joining)
                    setFields.push('date_of_joining = ?'), updates.push(date_of_joining);
                if (manager_id !== undefined)
                    setFields.push('manager_id = ?'), updates.push(manager_id);
                if (setFields.length === 0) {
                    res.status(400).json({ message: 'At least one field is required to update' });
                    return;
                }
                updates.push(teid);
                const query = `UPDATE employees SET ${setFields.join(', ')} WHERE te_id = ?`;
                const database = yield (0, db_1.default)(); // Ensure db is resolved first
                const result = yield database.run(query, updates);
                if (result.changes === 0) {
                    res.status(404).json({ message: 'Employee not found' });
                    return;
                }
                res.json({ message: 'Employee updated successfully' });
            }
            catch (error) {
                console.error('Error updating employee:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
        // Delete an employee
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teid } = req.params;
                const database = yield (0, db_1.default)(); // Ensure db is resolved first
                const result = yield database.run('DELETE FROM employees WHERE te_id = ?', [teid]);
                if (result.changes === 0) {
                    res.status(404).json({ message: 'Employee not found' });
                    return;
                }
                res.json({ message: 'Employee deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting employee:', error);
                res.status(500).json({ message: 'Internal Server Error', error });
            }
        });
    }
}
exports.default = new EmployeeController();
