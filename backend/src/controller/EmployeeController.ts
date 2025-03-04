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

// Define a TypeScript interface for the program structure
interface Program {
    program_id: string;
    expertise_area: string;
    sme_status: string;
    program_name: string;
    program_description: string;
}

class EmployeeController {
  // Get all employees with pagination
  public getAllEmployees: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // const database = await initializeDB();  // Ensure DB is resolved first
        const db = (req as any).db; 

        // Fetch all employees
        const rows = await db.all('SELECT * FROM Employees'); 

       

        res.status(200).json(rows); // owSend all employees as a JSON response
    } catch (error) {
        console.error('Error fetching all employees:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};




public getEmployeeByTeid: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const db = (req as any).db;

        // Fetch employee details
        const employeeQuery = `
            SELECT TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id
            FROM Employees 
            WHERE TE_ID = ?;
        `;
        const employee = await db.get(employeeQuery, [id]);

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
        const programs = await db.all(programsQuery, [id]);

          // Restructure programs to match required format
        const formattedPrograms = programs.map((program: Program) => ({
            program_id: program.program_id,
            area_of_expertise: program.expertise_area, // Renaming expertise_area
            sme_status: program.sme_status,
            program_name: program.program_name,
            program_description: program.program_description
        }));

         // Structure the response
        const response = {
            company_id: employee.TE_ID,  // Rename TE_ID to company_id
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            phone_number: employee.phone_number,
            date_of_joining: employee.date_of_joining,
            manager_id: employee.manager_id,
            programs: formattedPrograms.length > 0 ? formattedPrograms : undefined  // Include only if programs exist
        };

        // // Structure the response
        // const response = {
        //     ...employee,  // Employee details
        //     programs: programs.length > 0 ? programs : undefined  // Include only if programs exist
        // };

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
// get manager unique
public getEmployeeManagers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = (req as any).db;
    const query = `
      SELECT 
          e.TE_ID, 
          e.first_name, 
          e.last_name, 
          e.email, 
          e.phone_number, 
          e.date_of_joining, 
          e.manager_id,
          ep.program_id, 
          p.program_name, 
          p.program_description
      FROM Employees e
      LEFT JOIN Employee_Programs ep ON e.TE_ID = ep.TE_ID
      LEFT JOIN Programs p ON ep.program_id = p.program_id
      WHERE e.TE_ID IN (SELECT DISTINCT manager_id FROM Employees WHERE manager_id IS NOT NULL);
    `;
    
    const rows: {
      TE_ID: string; 
      first_name: string; 
      last_name: string; 
      email: string; 
      phone_number: string | null; 
      date_of_joining: string; 
      manager_id: string | null;
      program_id: string | null; 
      program_name: string | null; 
      program_description: string | null;
    }[] = await db.all(query);

    // Group programs by manager ID
    const managersMap: Record<string, any> = {};

    rows.forEach((row) => {
      const { TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id, program_id, program_name, program_description } = row;
      
      if (!managersMap[TE_ID]) {
        managersMap[TE_ID] = {
          company_id:TE_ID,
          first_name,
          last_name,
          email,
          phone_number,
          date_of_joining,
          manager_id,
          programs: []
        };
      }

      if (program_id) {
        managersMap[TE_ID].programs.push({
          program_id,
          program_name,
          program_description
        });
      }
    });

    const managersList = Object.values(managersMap);
    
    res.status(200).json(managersList);
  } catch (error) {
    console.error('Error fetching managers with programs:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



   // Get employees by manager ID
  public getEmployeeByManagerId: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { manager_id } = req.query;
    const db = (req as any).db;

    const query = `
      SELECT 
        e.TE_ID, 
        e.first_name, 
        e.last_name, 
        e.email, 
        e.phone_number, 
        e.date_of_joining, 
        e.manager_id,
        ep.program_id, 
        ep.expertise_area, 
        ep.sme_status,
        p.program_name, 
        p.program_description 
      FROM Employees e
      LEFT JOIN Employee_Programs ep ON e.TE_ID = ep.TE_ID
      LEFT JOIN Programs p ON ep.program_id = p.program_id
      WHERE e.manager_id = ?;
    `;

    const rows: {
      TE_ID: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string | null;
      date_of_joining: string;
      manager_id: string | null;
      program_id: string | null;
      expertise_area: string | null;
      sme_status: boolean | null;
      program_name: string | null;
      program_description: string | null;
    }[] = await db.all(query, [manager_id]);

    if (rows.length === 0) {
       res.status(404).json({ message: 'No employees found for this manager ID' });
    }

    // console.log(rows);

    // Group employees by TE_ID, aggregating their program details
    const employeesMap: Record<string, any> = {};

    rows.forEach((row) => {
      const { TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id, program_id, expertise_area, sme_status, program_name, program_description } = row;

      if (!employeesMap[TE_ID]) {
        employeesMap[TE_ID] = {
          company_id: TE_ID,
          first_name,
          last_name,
          email,
          phone_number,
          date_of_joining,
          manager_id,
          programs: []
        };
      }

      if (program_id) {
        employeesMap[TE_ID].programs.push({
          program_id,
          area_of_expertise:expertise_area,
          sme_status,
          program_name,
          program_description
        });
      }
    });

    const employeesList = Object.values(employeesMap);
    // console.log(employeesList);
    res.status(200).json(employeesList);
  } catch (error) {
    console.error('Error fetching employees by manager ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


  // creating employee for specific manager
  public createEmployee: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      // const {manager_id}=req.params;
      const db=(req as any).db;
      const {company_id,first_name, last_name, email, phone_number, date_of_joining,manager_id}=req.body;
      const te_id=company_id;
      const query = `
      INSERT INTO Employees (TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id) values(?,?,?,?,?,?,?)
      `;
      const result = await db.run(query, [te_id,first_name, last_name, email, phone_number, date_of_joining,manager_id]);

    
     // Check if insert was successful (SQLite `run` returns `{ changes: 1 }` for success)
    if (result.changes === 0) {
       res.status(500).json({ message: 'Failed to insert employee' });
    }

    // Construct the response manually only if the insert was successful
    const insertedEmployee = {
      company_id: te_id,
      first_name,
      last_name,
      email,
      phone_number,
      date_of_joining,
      manager_id
    };
      
      res.status(200).json({ message: 'Employee created successfully',insertedEmployee});
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
};
  
    // Add employee using manager id
    public addEmployee: RequestHandler = async (req: Request, res: Response): Promise<void> => {
      try {
        const db = (req as any).db;
        const { te_id, first_name, last_name, email, phone_number, date_of_joining ,manager_id} = req.body;
  
        // Check if the manager exists
        const managerQuery = 'SELECT * FROM Employees WHERE TE_ID = ? AND manager_id IS NULL';
        const manager = await db.get(managerQuery, [manager_id]);
  
        if (!manager) {
          res.status(404).json({ message: 'Manager not found' });
          return;
        }
  
        // Insert the employee
        const employeeQuery = `
          INSERT INTO Employees (TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id)
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const result = await db.run(employeeQuery, [te_id, first_name, last_name, email, phone_number, date_of_joining, manager_id]);
  
        // Check if insert was successful (SQLite `run` returns `{ changes: 1 }` for success)
        if (result.changes === 0) {
          res.status(500).json({ message: 'Failed to insert employee' });
          return;
        }
  
        // Construct the response manually only if the insert was successful
        const insertedEmployee = {
          TE_ID: te_id,
          first_name,
          last_name,
          email,
          phone_number,
          date_of_joining,
          manager_id
        };
  
        res.status(200).json({ message: 'Employee created successfully', insertedEmployee });
      } catch (error) {
        console.error('Error adding employee using manager ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
      }
    };


    // search functionality by id
   public searchById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Employee ID
    const db = (req as any).db;

    // Step 1: Find the manager of the given employee (or check if they are a manager)
    const managerQuery = `SELECT manager_id FROM Employees WHERE TE_ID = ?;`;
    const employee = await db.get(managerQuery, [id]);

    if (!employee) {
      res.status(404).json({ message: 'Invalid TE_ID. Employee not found.' });
      return;
    }

    const managerId = employee.manager_id || id; // If the person is already a manager, use their ID

    // Step 2: Get details of the manager (or employee themselves if they are a manager)
    const managerDetailsQuery = `
      SELECT 
        e.TE_ID, 
        e.first_name, 
        e.last_name, 
        e.email, 
        e.phone_number, 
        e.date_of_joining, 
        e.manager_id,
        ep.program_id, 
        ep.expertise_area, 
        ep.sme_status,
        p.program_name, 
        p.program_description 
      FROM Employees e
      LEFT JOIN Employee_Programs ep ON e.TE_ID = ep.TE_ID
      LEFT JOIN Programs p ON ep.program_id = p.program_id
      WHERE e.TE_ID = ?;
    `;


    type EmployeeRow = {
      TE_ID: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string | null;
      date_of_joining: string;
      manager_id: string | null;
      program_id: string | null;
      expertise_area: string | null;
      sme_status: boolean | null;
      program_name: string | null;
      program_description: string | null;
    };



    const managerRows = await db.all(managerDetailsQuery, [managerId]);

    if (!managerRows.length) {
      res.status(404).json({ message: 'Manager not found.' });
      return;
    }

    // Construct manager's details
    const manager: any = {
      company_id: managerId,
      first_name: managerRows[0].first_name,
      last_name: managerRows[0].last_name,
      email: managerRows[0].email,
      phone_number: managerRows[0].phone_number,
      date_of_joining: managerRows[0].date_of_joining,
      manager_id: managerRows[0].manager_id,
      programs: []
    };

    managerRows.forEach((row:EmployeeRow) => {
      if (row.program_id) {
        manager.programs.push({
          program_id: row.program_id,
          area_of_expertise: row.expertise_area,
          sme_status: row.sme_status,
          program_name: row.program_name,
          program_description: row.program_description
        });
      }
    });

    // Step 3: Get all employees under this manager
    const employeesQuery = `
      SELECT 
        e.TE_ID, 
        e.first_name, 
        e.last_name, 
        e.email, 
        e.phone_number, 
        e.date_of_joining, 
        e.manager_id,
        ep.program_id, 
        ep.expertise_area, 
        ep.sme_status,
        p.program_name, 
        p.program_description 
      FROM Employees e
      LEFT JOIN Employee_Programs ep ON e.TE_ID = ep.TE_ID
      LEFT JOIN Programs p ON ep.program_id = p.program_id
      WHERE e.manager_id = ?;
    `;

    const employeeRows = await db.all(employeesQuery, [managerId]);

    // Group employees by TE_ID
    const employees: any[] = [];

    employeeRows.forEach((row:EmployeeRow) => {
      const existingEmployee = employees.find((emp) => emp.company_id === row.TE_ID);

      if (!existingEmployee) {
        employees.push({
          company_id: row.TE_ID,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          phone_number: row.phone_number,
          date_of_joining: row.date_of_joining,
          manager_id: row.manager_id,
          programs: row.program_id
            ? [
                {
                  program_id: row.program_id,
                  area_of_expertise: row.expertise_area,
                  sme_status: row.sme_status,
                  program_name: row.program_name,
                  program_description: row.program_description
                }
              ]
            : []
        });
      } else {
        // If employee exists, just add their program
        if (row.program_id) {
          existingEmployee.programs.push({
            program_id: row.program_id,
            area_of_expertise: row.expertise_area,
            sme_status: row.sme_status,
            program_name: row.program_name,
            program_description: row.program_description
          });
        }
      }
    });

    // Send response with separate sections
    res.status(200).json({
      manager,
      employees
    });
  } catch (error) {
    console.error('Error in searchById:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


}

export default new EmployeeController();

