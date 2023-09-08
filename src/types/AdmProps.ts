import { Document } from "mongoose";

interface AdmProps extends Document {
  accessCode: string;
  email: string;
  password: string;
}

export type { AdmProps };
