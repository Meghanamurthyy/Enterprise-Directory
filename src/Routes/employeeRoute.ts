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

router.get('/', EmployeeController.getAllEmployees);
router.get('/:te_id', EmployeeController.getEmployeeByTeid);
router.put('/:teid', EmployeeController.updateEmployee);


export default router;


