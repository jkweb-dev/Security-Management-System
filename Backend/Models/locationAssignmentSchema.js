import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({
    date : {
        type : String ,
        required : true
    },

    shift : {
        type : String ,
        enum : ["day" , "night"],
        required : true
    },

    zone : {
        type : String,
        required : true
    },

    assignments : [
        {
            location : {
                type : String, 
                required : true
            },

            guards : {
                type : [String]
            }
        }
    ],

    locked : {
        type : Boolean,
        default : true
    }
})

const Assignment = mongoose.model("Assignment" , assignmentSchema)

export default Assignment