import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },

    zone : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Zone" ,
        required : true
    }
})

const Location = mongoose.model("Location" , locationSchema)


export default Location