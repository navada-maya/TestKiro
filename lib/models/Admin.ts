import mongoose, { Schema, models, model } from "mongoose";

export interface IAdmin {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "verifier";
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "verifier"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);

export default Admin;
