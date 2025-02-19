"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const programController_1 = __importDefault(require("../controller/programController")); // Adjust path if necessary
const router = express_1.default.Router();
// Route to create a new program
router.post('/createProgram', programController_1.default.createProgram);
// Route to assign an employee to a program
router.post('/assignEmployeeToProgram', programController_1.default.assignEmployeeToProgram);
// Route to update employee's program details
router.put('/updateEmployeeProgram', programController_1.default.updateEmployeeProgram);
// Route to remove an employee from a program
router.delete('/removeEmployeeFromProgram', programController_1.default.removeEmployeeFromProgram);
// Route to get employees by program
router.get('/getEmployeesByProgramName', programController_1.default.getEmployeesByProgram);
exports.default = router;
