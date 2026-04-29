import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Configurations/dB.js";

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/" , (req , res) => {
    res.send("Api Is Running...")
})

const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log(`Server Running On Port ${PORT}`)
});