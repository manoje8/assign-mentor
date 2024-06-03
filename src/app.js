import express from "express";
import route from "./router/router.js";
import dotenv from "dotenv"
import morgan from "morgan";
import Mongo from "./mongoDB/dbConnect.js";

dotenv.config()
Mongo.connect()

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use("/", route)

const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port: ${port}`))
