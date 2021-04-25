import { Company } from './company.interface';

export interface User {
  email: string;
  password: string;
  company?: Company;
  permission?: string;
  projects?: string[];
  tasks?: string[];
  registered?: boolean;
  firstname?: string;
  lastname?: string;
  avatar?: string;
}
