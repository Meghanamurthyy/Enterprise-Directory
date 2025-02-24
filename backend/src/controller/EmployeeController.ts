/*
import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db';

class EmployeeController {
  // Get all employees with pagination
  public getAllEmployees: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const size = parseInt(req.query.size as string) || 10;
      const offset = (page - 1) * size;

      const result = await pool.query(
        'SELECT * FROM employees ORDER BY teid LIMIT $1 OFFSET $2',
        [size, offset]
      );

      const totalCountResult = await pool.query('SELECT COUNT(*) FROM employees');
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalCount / size);

      res.json({
        data: result.rows,
        page,
        size,
        totalCount,
        totalPages,
      });
    } catch (error) {
      console.error('Error fetching all employees:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Get employee by teid
  public getEmployeeByTeid: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid } = req.params;

      if (!teid) {
        res.status(400).json({ message: 'teid is required' });
        return;
      }

      const result = await pool.query('SELECT * FROM employees WHERE teid = $1', [teid]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching employee by teid:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Update an employee
  public updateEmployee: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid } = req.params;
      const { first_name, last_name, email, phone_number, date_of_joining, manager_id } = req.body;

      const updates: any[] = [];
      const setFields: string[] = [];

      if (first_name) {
        setFields.push(`first_name = $${updates.length + 1}`);
        updates.push(first_name);
      }
      if (last_name) {
        setFields.push(`last_name = $${updates.length + 1}`);
        updates.push(last_name);
      }
      if (email) {
        setFields.push(`email = $${updates.length + 1}`);
        updates.push(email);
      }
      if (phone_number) {
        setFields.push(`phone_number = $${updates.length + 1}`);
        updates.push(phone_number);
      }
      if (date_of_joining) {
        setFields.push(`date_of_joining = $${updates.length + 1}`);
        updates.push(date_of_joining);
      }
      if (manager_id !== undefined) {
        setFields.push(`manager_id = $${updates.length + 1}`);
        updates.push(manager_id);
      }

      if (setFields.length === 0) {
         res.status(400).json({ message: 'At least one field is required to update' });
      }

      updates.push(teid);

      const query = `
        UPDATE employees
        SET ${setFields.join(', ')}
        WHERE teid = $${updates.length}
        RETURNING *
      `;

      const result = await pool.query(query, updates);

      if (result.rows.length === 0) {
         res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ message: 'Employee updated successfully', employee: result.rows[0] });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Delete an employee
  public deleteEmployee: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid } = req.params;

      if (!teid) {
        res.status(400).json({ message: 'teid is required' });
        return;
      }

      const result = await pool.query('DELETE FROM employees WHERE teid = $1 RETURNING *', [teid]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ message: 'Employee deleted successfully', deletedEmployee: result.rows[0] });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
}

export default new EmployeeController();
*/
import { Request, Response, RequestHandler } from 'express';
import initializeDB from '../config/db';

class EmployeeController {
  // Get all employees with pagination
  public getAllEmployees: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // const database = await initializeDB();  // Ensure DB is resolved first
        const db = (req as any).db; 

        // Fetch all employees
        const rows = await db.all('SELECT * FROM Employees'); 

        res.status(200).json(rows); // Send all employees as a JSON response
    } catch (error) {
        console.error('Error fetching all employees:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


public getEmployeeByTeid: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { te_id } = req.params;
        const db = (req as any).db;

        // Fetch employee details
        const employeeQuery = `
            SELECT TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id
            FROM Employees 
            WHERE TE_ID = ?;
        `;
        const employee = await db.get(employeeQuery, [te_id]);

        if (!employee) {
            res.status(404).json({ message: 'Invalid TE_ID. Employee not found.' });
            return;
        }

        // Fetch associated programs
        const programsQuery = `
            SELECT ep.program_id, ep.expertise_area, ep.sme_status, 
                   p.program_name, p.program_description, p.start_date, p.end_date
            FROM Employee_Programs ep
            JOIN Programs p ON ep.program_id = p.program_id
            WHERE ep.TE_ID = ?;
        `;
        const programs = await db.all(programsQuery, [te_id]);

        // Structure the response
        const response = {
            ...employee,  // Employee details
            programs: programs.length > 0 ? programs : undefined  // Include only if programs exist
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error in getEmployeeByTeid:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


  // Update an employee
  public updateEmployee: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid } = req.params;
      const { first_name, last_name, email, phone_number, date_of_joining, manager_id } = req.body;

      const updates: any[] = [];
      const setFields: string[] = [];

      if (first_name) setFields.push('first_name = ?'), updates.push(first_name);
      if (last_name) setFields.push('last_name = ?'), updates.push(last_name);
      if (email) setFields.push('email = ?'), updates.push(email);
      if (phone_number) setFields.push('phone_number = ?'), updates.push(phone_number);
      if (date_of_joining) setFields.push('date_of_joining = ?'), updates.push(date_of_joining);
      if (manager_id !== undefined) setFields.push('manager_id = ?'), updates.push(manager_id);

      if (setFields.length === 0) {
        res.status(400).json({ message: 'At least one field is required to update' });
        return;
      }

      updates.push(teid);
      const query = `UPDATE employees SET ${setFields.join(', ')} WHERE TE_ID = ?`;

      // const database = await initializeDB();  // Ensure db is resolved first
      const db = (req as any).db; 
      const result = await db.run(query, updates);

      if (result.changes === 0) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }

      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

   // Get unique employee managers
  public getEmployeeManagers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = (req as any).db;
        const query = `SELECT DISTINCT manager_id FROM Employees WHERE manager_id IS NOT NULL`;
        const rows = await db.all(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching employee managers:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
   // Get employees by manager ID
  public getEmployeeByManagerId: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { manager_id } = req.params;
      const db = (req as any).db;
      const query = 'SELECT * FROM Employees WHERE manager_id = ?';
      const rows = await db.all(query, [manager_id]);

      if (rows.length === 0) {
        res.status(404).json({ message: 'No employees found for this manager ID' });
        return;
      }

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching employees by manager ID:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

}

export default new EmployeeController();

