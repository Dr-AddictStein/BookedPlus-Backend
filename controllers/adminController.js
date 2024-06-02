import adminModel from '../models/adminModel.js'
import jwt from 'jsonwebtoken';

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1h'});
}

export const loginAdmin = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const admin = await adminModel.login(email,password);

        const token=createToken(admin._id);

        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}


export const singupAdmin = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const admin = await adminModel.signup(email,password);

        const token=createToken(admin._id);

        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}