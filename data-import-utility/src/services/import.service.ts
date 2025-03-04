import xlsx from 'xlsx';
import fs from 'fs';
import db from '../utils/db.utils';
import { EmployeeRow, ProgramRow, EmployeeProgramRow } from '../models/models';


const processFile = async (filePath: string): Promise<string> => {
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;

    try {
        db.serialize(() => {
            // Prepare statements for each table
            const employeeStmt = db.prepare(
                `INSERT OR IGNORE INTO Employees (TE_ID, first_name, last_name, email, phone_number, date_of_joining, manager_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            );

            const programStmt = db.prepare(
                `INSERT OR IGNORE INTO Programs (program_id, program_name, program_description, start_date, end_date) 
                 VALUES (?, ?, ?, ?, ?)`
            );

            const employeeProgramStmt = db.prepare(
                `INSERT OR IGNORE INTO Employee_Programs (TE_ID, program_id, expertise_area, sme_status) 
                 VALUES (?, ?, ?, ?)`
            );

            // Loop through each sheet and map data accordingly
            sheetNames.forEach((sheetName) => {
                const data = xlsx.utils.sheet_to_json<EmployeeRow | ProgramRow | EmployeeProgramRow>(
                    workbook.Sheets[sheetName]
                );

                if (sheetName === 'Employees') {
                    (data as EmployeeRow[]).forEach(row => {
                        if (row.TE_ID && row.first_name && row.email && row.date_of_joining) {
                            employeeStmt.run(
                                row.TE_ID, row.first_name, row.last_name || null, row.email,
                                row.phone_number || null, row.date_of_joining, row.manager_id || null
                            );
                        }
                    });
                } else if (sheetName === 'Programs') {
                    (data as ProgramRow[]).forEach(row => {
                        if (row.program_id && row.program_name) {
                            programStmt.run(
                                row.program_id, row.program_name, row.program_description || null,
                                row.start_date || null, row.end_date || null
                            );
                        }
                    });
                } else if (sheetName === 'Employee_Programs') {
                    (data as EmployeeProgramRow[]).forEach(row => {
                        if (row.TE_ID && row.program_id) {
                            employeeProgramStmt.run(
                                row.TE_ID, row.program_id, row.expertise_area || null, row.sme_status || 'NO'
                            );
                        }
                    });
                }
            });

            // Finalize prepared statements
            employeeStmt.finalize();
            programStmt.finalize();
            employeeProgramStmt.finalize();
        });

        fs.unlinkSync(filePath); // Delete the file after processing
        return '✅ All data imported successfully!';
    } catch (err) {
        console.error('❌ Error importing data:', err);
        throw err;
    }
};

export default { processFile };
