import express from "express";
import { handleGenerate } from "../controllers/generateControllers.js";
import { upload } from "../utils/fileHelpers.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "referenceImage", maxCount: 1 },
  ]),
  handleGenerate
);

export default router;
