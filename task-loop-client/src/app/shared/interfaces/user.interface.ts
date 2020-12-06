export interface User {
  email: string;
  password: string;
  projects?: string[];
  tasks?: string[];
  firstname?: string;
  lastname?: string;
  avatar?: string;
}
