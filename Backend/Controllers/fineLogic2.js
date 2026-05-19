import Fine from "../Models/FineSchema.js"

export const getAllFines = async (req , res) => {
    try {
        const fines = await Fine.find().sort({ createdAt : -1 })

        return res.status(200).json({
            data : fines
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}