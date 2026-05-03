import Guard from "../Models/guardSchema.js"

export const getAllGuards = async (req , res) => {
    try {
        const guards = await Guard.find()
        console.log(guards)
        return res.status(200).json(guards)
    } catch (error) {
        return res.status(500).json({
            message : "Failed To Fetch Guards",
           
        })
    }
}