import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Configurations/dB.js";
import loginRoute from "./Routes/loginRoute.js";

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/login" ,loginRoute)

const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log(`Server Running On Port ${PORT}`)
});