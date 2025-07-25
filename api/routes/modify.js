import express from "express";
import { handleModify } from "../controllers/modifyControllers.js";

const router = express.Router();

router.post("/", handleModify);

export default router;
