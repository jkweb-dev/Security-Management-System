import Fine from "../Models/FineSchema.js";

export const deleteFine = async (req , res) => {
    try {
        const {id} = req.params;

        console.log(id)

        if (!id) {
            return res.status(400).json({
                message : "Fine Id is required"
            })
        }

        const deletedFine = await Fine.findByIdAndDelete(id)

        if (!deleteFine) {
             return res.status(404).json({
                message : "Fine Not Found"
            })
        }

         return res.status(200).json({
                message : "Fine Deleted Successfully"
            })

    } catch (error) {
         return res.status(500).json({
                message : "Internal Server Error"
            })
    }
}