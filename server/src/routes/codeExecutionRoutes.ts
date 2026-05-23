import express from "express";

import {
  executeCode,
} from "../controllers/codeExecutionController";

const router =
  express.Router();

router.post(
  "/",
  executeCode
);

export default router;