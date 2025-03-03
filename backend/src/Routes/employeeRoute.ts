/*import { Router } from 'express';
import EmployeeController from '../controller/EmployeeController';

const router = Router();

router.get('/employees', EmployeeController.getAllEmployees);
router.get('/employees/:teid', EmployeeController.getEmployeeByTeid);
router.put('/employees/:teid', EmployeeController.updateEmployee);
router.delete('/employees/:teid', EmployeeController.deleteEmployee);

export default router;
*/
import { Router } from 'express';
import EmployeeController from '../controller/EmployeeController';

const router = Router();

router.get('/managers', EmployeeController.getEmployeeManagers);
router.get('/manager', EmployeeController.getEmployeeByManagerId);
router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getEmployeeByTeid);
router.put('/updateEmployee/:teid', EmployeeController.updateEmployee);
router.post('/createEmployee', EmployeeController.createEmployee);
router.get('/searchById/:id', EmployeeController.searchById);//new one

export default router;


