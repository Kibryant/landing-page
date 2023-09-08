import { Document } from "mongoose";

interface UserProps extends Document {
  email: string;
  username: string;
  password: string;
}

export type { UserProps };
