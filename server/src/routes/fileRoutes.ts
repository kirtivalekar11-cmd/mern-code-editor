import express from "express";

import {
  createFile,
  getFiles,
  saveFile,
  deleteFile,
} from "../controllers/fileController";

import { protect }
from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  protect,
  createFile
);

router.get(
  "/:projectId",
  protect,
  getFiles
);

router.put(
  "/:id",
  protect,
  saveFile
);

router.delete(
  "/:id",
  protect,
  deleteFile
);

export default router;