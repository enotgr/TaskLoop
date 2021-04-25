export interface Project {
  name: string;
  taskStatuses: string[];
  description?: string;
  creator?: string;
  tasks?: string[];
  users?: string[];
  _id?: string;
}
