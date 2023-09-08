import mongoose, { Model } from "mongoose";
import { UserProps } from "@/types/UserProps";

const { Schema } = mongoose;
interface UserModelProps extends Model<UserProps> {}

const userSchema = new Schema<UserProps>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const UserModel: UserModelProps =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
