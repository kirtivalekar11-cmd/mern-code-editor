import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      default: "",
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

const File = mongoose.model(
  "File",
  fileSchema
);

export default File;