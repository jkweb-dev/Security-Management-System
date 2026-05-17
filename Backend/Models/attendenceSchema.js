import mongoose, { Types } from "mongoose"

const attendenceSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },

     name : {
        type : String,
        required : true
    },

    date : {
        type : String,
        required : true,
    },

    shift : {
        type : String ,
        required : true,
        enum : ["day" , "night"]
    },

    status : {
        type : String ,
        required : true ,
        enum : ["present" , "absent" , "leave" , "out"]
    },
},
{
    timestamps : true
}
)

attendenceSchema.index(
    {id : 1 , date : 1 , shift : 1},
    {unique : true}
)

const Attendence = mongoose.model("Attendence" , attendenceSchema)

export default Attendence