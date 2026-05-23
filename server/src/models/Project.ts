import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "javascript",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;