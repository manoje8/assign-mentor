import { Router } from "express";
import StudentMentorAssignmentController from "../controller/assignment.controller.js";

const assignRoute = Router()

assignRoute.post("/assign-students-mentor", StudentMentorAssignmentController.assignStudentsToMentor)
assignRoute.put("/assign-change/:studentId/:mentorId", StudentMentorAssignmentController.updateStudentMentorAssignment)
assignRoute.get("/mentor-students/:mentorId", StudentMentorAssignmentController.getStudentsByMentorId)
assignRoute.get("/previous-mentor/:studentId", StudentMentorAssignmentController.getPreviousMentor)

//Extra route
// assignRoute.post("/assign/:studentId/:mentorId", StudentMentorAssignmentController.assignStudentToMentor)

export default assignRoute