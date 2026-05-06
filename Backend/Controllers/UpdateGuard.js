import Guard from "../Models/guardSchema.js"

export const updateGuard = async (req , res) => {
    try {
        const guard = await Guard.findById(req.params.id)

        if(!guard){
            return res.status(404).json({message : "Guard Not Found"})
        }

        guard.name = req.body.name || guard.name
        guard.id = req.body.id || guard.id
        guard.fatherName = req.body.fatherName || guard.fatherName
        guard.age = req.body.age || guard.age
        guard.address = req.body.address || guard.address
        guard.education = req.body.education || guard.education
        guard.reference = req.body.reference || guard.reference
        guard.designation = req.body.designation || guard.designation
        guard.entryDate = req.body.entryDate || guard.entryDate
        guard.cnicNo = req.body.cnicNo || guard.cnicNo
        guard.phone1 = req.body.phone1 || guard.phone1
        guard.phone2 = req.body.phone2 || guard.phone2

        if (req.files?.profilePic) {
            guard.profilePic = req.files.profilePic[0].path
        }

         if (req.files?.cnicFront) {
            guard.cnicFront = req.files.cnicFront[0].path
        }

         if (req.files?.cnicBack) {
            guard.cnicBack = req.files.cnicBack[0].path
        }

        await guard.save()

        res.status(200).json({
            message : "Guard Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message : "Server Error"
        })
    }
}