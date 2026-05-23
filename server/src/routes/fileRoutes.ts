import express from "express";

import {
  createFile,
  getFiles,
  saveFile,
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

export default router;
