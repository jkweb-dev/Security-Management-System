import Fine from "../Models/FineSchema.js";

export const FineLogicPostAndPut = async (req , res) => {
    try {
        const {id , name , date , shift , violationType , amount , description} = req.body

        if (!id || !name || !date || !shift || !violationType || !amount || !description  ) {
            return res.status(400).json({
                message : "Please Fill all required Fields"
            })
        }

        const existingFine = await Fine.findOne({
            id ,
            date ,
            shift
        })

        if (existingFine) {
              return res.status(404).json({
                message : "Fine already exist for that id name and shift"
            })
        }

        const fine = await Fine.create(
            {
                id ,
                name ,
                date ,
                shift ,
                violationType,
                amount,
                description
            }
        );

return res.status(200).json({
    message : "Fine Saved Successfully"
})
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}