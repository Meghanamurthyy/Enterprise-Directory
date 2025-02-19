"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import { Router } from 'express';
import EmployeeController from '../controller/EmployeeController';

const router = Router();

router.get('/employees', EmployeeController.getAllEmployees);
router.get('/employees/:teid', EmployeeController.getEmployeeByTeid);
router.put('/employees/:teid', EmployeeController.updateEmployee);
router.delete('/employees/:teid', EmployeeController.deleteEmployee);

export default router;
*/
const express_1 = require("express");
const EmployeeController_1 = __importDefault(require("../controller/EmployeeController"));
const router = (0, express_1.Router)();
router.get('/', EmployeeController_1.default.getAllEmployees);
router.get('/:te_id', EmployeeController_1.default.getEmployeeByTeid);
router.put('/employees/:teid', EmployeeController_1.default.updateEmployee);
router.delete('/employees/:teid', EmployeeController_1.default.deleteEmployee);
exports.default = router;
