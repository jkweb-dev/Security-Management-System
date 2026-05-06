import Guard from "../Models/guardSchema.js"

export const ProfileLogic = async (req , res) => {
    try {
        const guard = await Guard.findById(req.params.id)
        console.log(guard)
       
        if (!guard) {
            return res.status(404).json({
                message : "Guard Not Found"
            })
        }

        res.status(200).json(guard)
    } catch (error) {
        res.status(500).json({
            message : "Server Error"
        })
    }
}