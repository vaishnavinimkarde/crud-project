import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/create", createStudent);
router.put("/update/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;