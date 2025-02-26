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
router.get('/manager/:manager_id', EmployeeController.getEmployeeByManagerId);
router.get('/', EmployeeController.getAllEmployees);
router.get('/:te_id', EmployeeController.getEmployeeByTeid);
router.put('/updateEmployee/:teid', EmployeeController.updateEmployee);
router.post('/createEmployee/:manager_id', EmployeeController.createEmployee);
router.post('/addEmployee', EmployeeController.createEmployee);

export default router;


