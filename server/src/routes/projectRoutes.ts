import express from "express";

import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController";

import { protect }
from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  protect,
  createProject
);

router.get(
  "/",
  protect,
  getProjects
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;