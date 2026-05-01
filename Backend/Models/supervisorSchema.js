import mongoose from "mongoose"

const supervisorSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
         required : true,
         unique: true,
         lowercase : true,
    },

    password : {
         type : String,
         required : true,
         minlength : 6
    },

    role : {
        type : String,
        default : "supervisor"
    },
},

{timestamps : true}
)

const Supervisor = mongoose.model("Supervisor" , supervisorSchema)

export default Supervisor