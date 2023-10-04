import { Document } from "mongoose";

interface AdmProps extends Document {
  token: string;
  accessCode: string;
  email: string;
  password: string;
}

export type { AdmProps };
