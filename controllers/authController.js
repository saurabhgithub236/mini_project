import { comparePassword,hashpassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";



// register controller 
export const registerController = async (req,res) => {
    try {
        const {username,email,phone,address,role,password}=req.body;
        if(!username){
            res.send({error:`username is required`});
        }
        if(!email){
            res.send('email is required');
        }
        if(!phone){
            res.send('phone is required');
        }
        if(!address){
            res.send('address is required');
        }
        if(!password){
            res.send('password is required');
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(200).send({
                success:true,
                message:`user already exists`,
            })
        }
        // hashing password 
         const hashedPassword = await hashpassword(password)
        //register user
        const newUser = await new userModel({username,email,phone,address,role,password:hashedPassword}).save();
        res.status(200).send({
            success:true,
            message:`user created successfully`,
            newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:`error login`,
            error
        })
    }
}


//login controller || post request
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:`invalid email or password`
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:`email is not registered`
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:`invalid password`
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:`login successfully`,
            user:{
                username:user.username,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`login Error`,
            error
        })
    }

}