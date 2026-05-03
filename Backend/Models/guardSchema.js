import mongoose from "mongoose";

const guardSchema = new mongoose.Schema({
    profilePic : {type : String},
    id : {type : String},
    name : {type : String},
    fatherName : {type : String},
    age : {type : Number},
    cnicNo : {type : String},
    phone1 : {type : String},
    phone2 : {type : String},
    address : {type : String},
    designation : {type : String},
    reference : {type : String},
    education : {type : String},
    entryDate : {type : Date},
    cnicFront : {type : String},
    cnicBack : {type : String},
} , {timestamps : true})

const Guard = mongoose.model("Guard" , guardSchema)

export default Guard