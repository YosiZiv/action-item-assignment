import mongoose, { Schema } from "mongoose";
import { PasswordHash } from "../services/password-hash";
// An interface that describe the properties
// that are required to create a new User
interface WorkoutAttrs {
  userId: string;
  type: string;
  location: { lat: string; lon: string };
  duration: string;
  comments?: string;
  pollutionLevel: number;
}

// An interface that describe the properties
// that a Workout model has

interface WorkoutModel extends mongoose.Model<WorkoutDoc> {
  build(attrs: WorkoutAttrs): WorkoutDoc;
}

// An interface that describe the properties
// that a Workout document has

interface WorkoutDoc extends mongoose.Document {
  userId: string;
  type: string;
  location: { lat: string; lon: string };
  date: string;
  time: string;
  duration: string;
  comments?: string;
  pollutionLevel: number;
}
const workoutSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["cycling", "running", "walking"],
      default: "cycling",
    },
    location: {
      lat: {
        type: String,
        required: true,
      },
      lon: {
        type: String,
        required: true,
      },
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    time: {
      type: String,
      default: () => new Date().toTimeString().split("T")[0].split(" ")[0],
    },
    duration: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
    pollutionLevel: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);
workoutSchema.statics.build = (attrs: WorkoutAttrs) => {
  return new Workout(attrs);
};

const Workout = mongoose.model<WorkoutDoc, WorkoutModel>(
  "Workout",
  workoutSchema
);

export { Workout };
