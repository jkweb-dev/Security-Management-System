import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Configurations/dB.js";
import loginRoute from "./Routes/loginRoute.js";
import dashboardRoute from "./Routes/DahboardRoute.js";
import AddguardRoute from "./Routes/AddGuardRoutes.js";
import AllGuards from "./Routes/GuardsRoute.js";

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/uploads" , 
    express.static("uploads")
)
app.use("/login" ,loginRoute)
app.use("/dashboard" ,dashboardRoute)
app.use("/AddGuard" ,AddguardRoute)
app.use("/guards" ,AllGuards )

const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log(`Server Running On Port ${PORT}`)
});