export interface EmployeeRow {
    TE_ID: number;
    first_name: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    date_of_joining: string;
    manager_id?: number;
    status?: string;
}

export interface ProgramRow {
    program_id: number;
    program_name: string;
    program_description?: string;
    start_date?: string;
    end_date?: string;
}

export interface EmployeeProgramRow {
    TE_ID: number;
    program_id: number;
    expertise_area?: string;
    sme_status?: string;
}
