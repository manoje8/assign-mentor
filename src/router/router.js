import {Router} from "express"
import homeRoute from "./home.router.js"
import mentorRoute from "./mentor.router.js"
import studentRoute from "./student.router.js"
import assignRoute from "./assignment.router.js"

const route = Router()

route.use("/", homeRoute)
route.use("/mentor", mentorRoute)
route.use("/student", studentRoute)
route.use("/api", assignRoute)

export default route