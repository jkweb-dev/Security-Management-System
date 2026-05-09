import Assignment from "../Models/locationAssignmentSchema.js"

export const createAssignment = async (req , res) => {
    try {
        const {date , shift , zone , assignments} = req.body

        const exists = await Assignment.findOne({
            date,
            shift,
            zone
        })

        if (exists) {
            return res.status(400).json({
                message : "Already Assigned For This Zone , date and shift"
            })
        }

        const newAssignment = await Assignment.create({
            date ,
            shift,
            zone ,
            assignments
        })

         return res.status(201).json({
                message : "Assignment Saved Successfully"
            })
    } catch (error) {
         return res.status(500).json({
                message : "Internal Server Errort"
            })
    }
}