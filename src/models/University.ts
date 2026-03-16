import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUniversity extends Document {
  name: string;
  faculties: string[];
  address?: string;
  logoUrl?: string;
  emailSuffix?: string;
  headerColor?: string;
  createdAt: Date;
}

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, unique: true, index: true },
    faculties: { type: [String], required: true, default: [] },
    address: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    emailSuffix: { type: String, default: "" },
    headerColor: { type: String, default: "#006a4e" },
  },
  {
    timestamps: true,
  }
);

const University: Model<IUniversity> =
  mongoose.models.University ||
  mongoose.model<IUniversity>("University", UniversitySchema);

export default University;
