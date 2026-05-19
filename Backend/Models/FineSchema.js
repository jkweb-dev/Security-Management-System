import mongoose from "mongoose"

const fineSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },

   name : {
        type : String,
        required : true
    },

   date: {
        type : String,
        required : true
    },

   shift: {
        type : String,
        enum : ["day" , "night"],
        required : true
    },

   violationType: {
        type : String,
        required : true
    },

    amount : {
        type : Number,
        required : true
    },

   description : {
        type : String,
        default : "",
        required : true
    }
},

{
timestamps : true
}
)

const Fine = mongoose.model("Fine" , fineSchema)

export default Fine