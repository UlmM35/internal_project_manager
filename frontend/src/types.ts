export interface Project {
    id: number;
    name: string;
}
 
export interface CreateEmployee {
    full_name: string;
    email: string;
    experience_level: string;
    tech_stack: string;
    project_duration: string;
    additional_skills: string | null;
    project_ids: number[];
}
 
export interface EmployeeResponse {
    id: number;
    full_name: string;
    email: string;
    experience_level: string;
    tech_stack: string;
    project_duration: string;
    additional_skills: string | null;
    projects: Project[];
}