import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    role:{
        type:Number,
        required:true,
        default:0
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true}
);
export default mongoose.model('users',userSchema)