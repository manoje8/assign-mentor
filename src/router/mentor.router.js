import { Router } from "express";
import Mentor from "../controller/mentor.controller.js";


const mentorRoute = Router()

mentorRoute.post("/create", Mentor.create)
mentorRoute.get("/all-mentor", Mentor.getAllMentors)

export default mentorRoute