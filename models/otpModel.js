import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    }
},{timestamps:true});

const otp = mongoose.model("OTPCollection",otpSchema);

export default otp;