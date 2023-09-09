import { AdmProps } from "@/types/AdmProps";
import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;
interface AdminModelProps extends Model<AdmProps> {}

const admSchema = new Schema<AdmProps>(
  {
    token: { type: String, unique: true },
    accessCode: { type: String, require: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const AdminModel: AdminModelProps = mongoose.models.Adm || mongoose.model("Adm", admSchema);

export default AdminModel;
