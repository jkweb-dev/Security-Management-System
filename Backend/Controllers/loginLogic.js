import Supervisor from "../Models/supervisorSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginLogic = async (req , res) => {
    try {
        const {email , password} = req.body;
        
        const user = await Supervisor.findOne({email})

        if (!user) {
           
             return  res.status(404).json({message : "User Not Found"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch) {
        
            return  res.status(401).json({message : "Invalid Password"})
        }

        const token = jwt.sign(
            {id:user._id , email : user.email},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )

        res.json({
            message : "Login Successful",
            token,
        })

    } catch (error) {
          return  res.status(500).json({message : "Internal Server Error"})
    }
}

export default loginLogic