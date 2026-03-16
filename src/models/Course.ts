import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  faculty: string;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true, min: 1, max: 6 },
    instructor: { type: String, required: true },
    schedule: { type: String, required: true },
    room: { type: String, required: true },
    faculty: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> =
  mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
