import express from "express";
import { getData } from "../controller/data.controller.js";

const router = express.Router();

router.post("/", getData);

export default router;