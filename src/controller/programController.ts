/*import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db';

class ProgramController {
  // adding new program to programs table
  public createProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { programName, programDescription } = req.body;

      if (!programName) {
        res.status(400).json({ message: 'programName is required' });
        return;
      }

      const result = await pool.query(
        'INSERT INTO programs (program_name, program_description) VALUES ($1, $2) RETURNING *',
        [programName, programDescription || null]
      );

      res.status(201).json({ message: 'Program created successfully', program: result.rows[0] });
    } catch (error) {
      console.error('Error creating program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Add an employee to a program with expertise and SME status
  public assignEmployeeToProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid, programName, expertise_area, sme_status } = req.body;

      if (!teid || !programName) {
        res.status(400).json({ message: 'teid and programName are required' });
        return;
      }
    //   ****************do this if u want to add programs if they dont exist directly form here*****************
      // Check if the program exists, otherwise insert it
      
    //   let programResult = await pool.query(
    //     'INSERT INTO programs (program_name) VALUES ($1) ON CONFLICT (program_name) DO NOTHING RETURNING *',
    //     [programName]
    //   );

      let programId;
    //   if (programResult.rows.length > 0) {
    //     programId = programResult.rows[0].program_id;
    //   } else {
        const existingProgram = await pool.query('SELECT program_id FROM programs WHERE program_name = $1', [programName]);
        programId = existingProgram.rows[0].program_id;
    //   }

      // Insert or update in employee_programs table
      await pool.query(
        `INSERT INTO employee_programs (teid, program_id, expertise_area, sme_status) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (teid, program_id) 
         DO UPDATE SET expertise_area = $3, sme_status = $4`,
        [teid, programId, expertise_area, sme_status]
      );

      res.status(201).json({ message: 'Employee assigned to program successfully', programId });
    } catch (error) {
      console.error('Error assigning employee to program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Update an employee's expertise and SME status for a specific program
  public updateEmployeeProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid, programName, expertise_area, sme_status } = req.body;

      if (!teid || !programName) {
        res.status(400).json({ message: 'teid and programName are required' });
        return;
      }

      // Get program_id from programName
      const programQuery = await pool.query('SELECT program_id FROM programs WHERE program_name = $1', [programName]);
      if (programQuery.rows.length === 0) {
        res.status(404).json({ message: 'Program not found' });
        return;
      }
      const programId = programQuery.rows[0].program_id;

      // Update expertise and SME status
      const updateResult = await pool.query(
        `UPDATE employee_programs 
         SET expertise_area = $1, sme_status = $2 
         WHERE teid = $3 AND program_id = $4 
         RETURNING *`,
        [expertise_area, sme_status, teid, programId]
      );

      if (updateResult.rows.length === 0) {
        res.status(404).json({ message: 'Employee not assigned to this program' });
        return;
      }

      res.json({ message: 'Employee program updated successfully', data: updateResult.rows[0] });
    } catch (error) {
      console.error('Error updating employee program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Delete an employee from a program
  public removeEmployeeFromProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { teid, programName } = req.body;

      if (!teid || !programName) {
        res.status(400).json({ message: 'teid and programName are required' });
        return;
      }

      // Get program_id from programName
      const programQuery = await pool.query('SELECT program_id FROM programs WHERE program_name = $1', [programName]);
      if (programQuery.rows.length === 0) {
        res.status(404).json({ message: 'Program not found' });
        return;
      }
      const programId = programQuery.rows[0].program_id;

      // Delete from employee_programs table
      const deleteResult = await pool.query(
        'DELETE FROM employee_programs WHERE teid = $1 AND program_id = $2 RETURNING *',
        [teid, programId]
      );

      if (deleteResult.rows.length === 0) {
        res.status(404).json({ message: 'Employee not assigned to this program' });
        return;
      }

      res.json({ message: 'Employee removed from program successfully' });
    } catch (error) {
      console.error('Error removing employee from program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

 // Get employees by program name with pagination
public getEmployeesByProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { programName } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const offset = (page - 1) * size;

    if (!programName) {
      res.status(400).json({ message: 'programName is required' });
      return;
    }

    // Get program_id from programName
    const programQuery = await pool.query('SELECT program_id FROM programs WHERE program_name = $1', [programName]);
    if (programQuery.rows.length === 0) {
      res.status(404).json({ message: 'Program not found' });
      return;
    }
    const programId = programQuery.rows[0].program_id;

    // Fetch employees assigned to this program with pagination
    const employeesResult = await pool.query(
      `SELECT e.teid, e.first_name, e.last_name, e.email, ep.expertise_area, ep.sme_status 
       FROM employees e
       JOIN employee_programs ep ON e.teid = ep.teid
       WHERE ep.program_id = $1
       ORDER BY e.teid
       LIMIT $2 OFFSET $3`,
      [programId, size, offset]
    );

    // Count total employees assigned to the program for pagination metadata
    const totalCountResult = await pool.query(
      'SELECT COUNT(*) FROM employee_programs WHERE program_id = $1',
      [programId]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / size);

    // Send the response with pagination data
    res.json({
      data: employeesResult.rows,
      page,
      size,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching employees by program:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
}
export default new ProgramController();
*/
import { Request, Response, RequestHandler } from 'express';
import initializeDB from '../config/db'; // Import the initializeDB function

class ProgramController {
  // Create a new program
  public createProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { program_name, program_description, start_date, end_date } = req.body;

      if (!program_name || !start_date || !end_date) {
        res.status(400).json({ message: 'program_name, start_date, and end_date are required' });
        return;
      }

      const db = await initializeDB(); // Initialize the database connection

      // Prepare and run insert query with all required fields
      const result = await db.run(
        'INSERT INTO Programs (program_name, program_description, start_date, end_date) VALUES (?, ?, ?, ?)',
        [program_name, program_description || null, start_date, end_date]
      );

      res.status(201).json({ message: 'Program created successfully', program_id: result.lastID });
    } catch (error) {
      console.error('Error creating program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
};

  // Assign an employee to a program
  public assignEmployeeToProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { TE_ID, program_name, expertise_area, sme_status } = req.body;

      if (!TE_ID || !program_name) {
        res.status(400).json({ message: 'TE_ID and program_name are required' });
        return;
      }

      const db = await initializeDB();

      // Fetch program ID
      const program = await db.get('SELECT program_id FROM Programs WHERE program_name = ?', [program_name]);
      if (!program) {
        res.status(404).json({ message: 'Program not found' });
        return;
      }

      // Insert employee-program mapping with conflict handling
      const result = await db.run(
        `INSERT INTO Employee_Programs (TE_ID, program_id, expertise_area, sme_status) 
         VALUES (?, ?, ?, ?) 
         ON CONFLICT(TE_ID, program_id) DO UPDATE SET expertise_area = excluded.expertise_area, sme_status = excluded.sme_status`,
        [TE_ID, program.program_id, expertise_area, sme_status]
      );

      res.status(201).json({ message: 'Employee assigned to program successfully', program_id: program.program_id });
    } catch (error) {
      console.error('Error assigning employee to program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Update employee program details
  public updateEmployeeProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { TE_ID, program_name, expertise_area, sme_status } = req.body;

      if (!TE_ID || !program_name) {
        res.status(400).json({ message: 'TE_ID and program_name are required' });
        return;
      }

      const db = await initializeDB();

      // Fetch program ID
      const program = await db.get('SELECT program_id FROM Programs WHERE program_name = ?', [program_name]);
      if (!program) {
        res.status(404).json({ message: 'Program not found' });
        return;
      }

      // Update employee's program details
      const result = await db.run(
        `UPDATE Employee_Programs 
         SET expertise_area = ?, sme_status = ? 
         WHERE TE_ID = ? AND program_id = ?`,
        [expertise_area, sme_status, TE_ID, program.program_id]
      );

      if (result.changes === 0) {
        res.status(404).json({ message: 'Employee not assigned to this program' });
        return;
      }

      res.json({ message: 'Employee program updated successfully' });
    } catch (error) {
      console.error('Error updating employee program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Remove an employee from a program
  public removeEmployeeFromProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { TE_ID, program_name } = req.body;

      if (!TE_ID || !program_name) {
        res.status(400).json({ message: 'TE_ID and program_name are required' });
        return;
      }

      const db = await initializeDB();

      // Fetch program ID
      const program = await db.get('SELECT program_id FROM Programs WHERE program_name = ?', [program_name]);
      if (!program) {
        res.status(404).json({ message: 'Program not found' });
        return;
      }

      // Delete employee-program mapping
      const result = await db.run(
        'DELETE FROM Employee_Programs WHERE TE_ID = ? AND program_id = ?',
        [TE_ID, program.program_id]
      );

      if (result.changes === 0) {
        res.status(404).json({ message: 'Employee not assigned to this program' });
        return;
      }

      res.json({ message: 'Employee removed from program successfully' });
    } catch (error) {
      console.error('Error removing employee from program:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  // Get employees by program
  public getEmployeesByProgram: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { program_name } = req.params;  // Ensure correct parameter usage
        if (!program_name) {
            res.status(400).json({ message: 'Program name is required' });
            return;
        }

        console.log('🔹 Received program_name:', program_name);

        const db = await initializeDB();

        // Fetch program ID
        const program = await db.get('SELECT program_id FROM Programs WHERE LOWER(program_name) = LOWER(?)', [program_name]);

        if (!program) {
            console.log('❌ Program not found:', program_name);
            res.status(404).json({ message: 'Program not found' });
            return;
        }

        console.log('✅ Found program:', program);

        // Fetch employees assigned to this program
        const employees = await db.all(
            `SELECT e.TE_ID, e.first_name, e.last_name, ep.expertise_area, ep.sme_status 
             FROM Employees e 
             JOIN Employee_Programs ep ON e.TE_ID = ep.TE_ID 
             WHERE ep.program_id = ?`,
            [program.program_id]
        );

        if (employees.length === 0) {
            console.log('⚠️ No employees found for the program:', program_name);
            res.status(200).json({ message: 'No employees found', employees: [] });
            return;
        }

        console.log('✅ Fetched employees:', employees);

        res.status(200).json({ message: 'Employees found', employees });
    } catch (error) {
        console.error('❌ Error fetching employees by program:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
}

export default new ProgramController();
