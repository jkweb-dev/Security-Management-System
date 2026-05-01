import dotenv from  "dotenv"
import bcrypt from "bcrypt"
import Supervisor from "../Models/supervisorSchema.js"

import connectDB from "../Configurations/dB.js"

dotenv.config()

await connectDB()

const supervisors = [
    {name : "Supervisor1" , email : "sup1@gmail.com" , password : "123456"},
    {name : "Supervisor2" , email : "sup2@gmail.com" , password : "abcdef"},
    {name : "Supervisor3" , email : "sup3@gmail.com" , password : "ghijkl"},
    {name : "Supervisor4" , email : "sup4@gmail.com" , password : "mnopqr"},
    {name : "Supervisor5" , email : "sup5@gmail.com" , password : "stuvwx"},
    {name : "Supervisor6" , email : "sup6@gmail.com" , password : "yzabcd"},
    {name : "Supervisor7" , email : "sup7@gmail.com" , password : "efghij"},
    {name : "Supervisor8" , email : "sup8@gmail.com" , password : "klmnop"},
    {name : "Supervisor9" , email : "sup9@gmail.com" , password : "qrstuv"},
    {name : "Supervisor10" , email : "sup10@gmail.com" , password : "wxyz12"},
]

const seedSupervisors  = async () => {
    try {
        await connectDB()
        for (let sup of supervisors){
            const hashedPassword = await bcrypt.hash(sup.password , 10)

            await Supervisor.create({
                name : sup.name,
                email :sup.email,
                password : hashedPassword
            })
            console.log(`Added : ${sup.name}`)
        }
        process.exit()
    } catch (error) {
        console.log("Seed error")
        process.exit(1)
    }
}

seedSupervisors()