import Guard from "../Models/guardSchema.js"
import fs from "fs"

export const deleteGuard = async (req , res) => {
    try {
        const deleted = await Guard.findByIdAndDelete(req.params.id)

        if (!deleted) {
            return res.status(404).json({
                message : "Guard Not Found"
            })
        }

        console.log("PROFILE :", JSON.stringify(deleted.profilePic))
        if(deleted.profilePic)
            fs.unlinkSync(deleted.profilePic)

        console.log("Front:", JSON.stringify(deleted.cnicFront))
          if(deleted.cnicFront)
            fs.unlinkSync(deleted.cnicFront)

        console.log("Back :", JSON.stringify(deleted.cnicBack))
            if(deleted.cnicBack)
            fs.unlinkSync(deleted.cnicBack)

            res.status(200).json({
                message : "Guard Added Successfully"
            })

    } catch (error) {
           res.status(500).json({
                message : "Internal server Error"
            })
    }
}