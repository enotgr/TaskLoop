import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  name: string;
  number: string;
  priority: TaskPriority;
  status?: TaskStatus;
  description?: string;
  creator?: string;
  performer?: string;
  tags?: string[];
  parent?: string;
  subtasks?: string[];
  _id?: string;
}
