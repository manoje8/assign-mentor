import { Router } from "express";

const homeRoute = Router()

homeRoute.get("/", (req, res) => {
    res.send(`<h2 style="text-align: center">Welcome to Mentor Student API Management. Server is running. Please check the API in postman<h2>`)
})

export default homeRoute