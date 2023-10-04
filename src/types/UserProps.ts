import { Document } from "mongoose";

interface UserProps extends Document {
  email: string;
  username: string;
  password: string;
  tasks: TasksProps;
}

interface TasksProps {
  task: string;
  date: Date;
  description: string;
}

export type { UserProps, TasksProps };
