import Assignment from "../Models/locationAssignmentSchema.js"

export const getAssignmentsByDateShift = async (req , res) => {
    try {
        const {date , shift} = req.query

        const assignments = await Assignment.find({
            date, 
            shift
        }).populate("zone")

        res.status(200).json({
            success : true,
            data : assignments
        })
    } catch (error) {
         return res.status(500).json({
                message : "Server Error"
            })
    }
}