import Location from "../Models/locationsSchema.js";
import Zone from "../Models/zoneSchema.js";

export const locations = async (req , res) => {
    try {
        const zoneName = req.query.zone;
console.log(req.query.zone)
        const zone = await Zone.findOne({name : zoneName})

        if (!zone) {
            return res.status(404).json({
                message : "Zone Not Found"
            })
        }

        const locations = await Location.find({zone : zone._id})
console.log(zone._id)
      return res.status(200).json(locations)
    } catch (error) {
          return res.status(500).json({
                message : error.message
            })
            
    }
}