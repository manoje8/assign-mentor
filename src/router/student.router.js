import { Router } from "express";
import Student from "../controller/student.controller.js";

const studentRoute = Router()

studentRoute.post("/create", Student.create)
studentRoute.get("/all-student", Student.getAllStudents)

export default studentRoute