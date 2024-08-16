import {User} from "../models/userModel.js";
import httpStatus from "http-status";
import bcrypt, {hash} from "bcrypt";
import crypto from "crypto";

const test = (req,res) => {
    res.send(req.body)
}


const login = async (req,res) => {
    const {username, password} = req.body;

    if (!username || !password){
        return res.status(400).json({message : "Please enter the username and password"});
    }

    try{
        const user = await User.findOne({username});
        if (!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "No user exist with the username" + username});
        }

        if (bcrypt.compare(password, user.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token : token})
        }
    }
    catch (e) {
        return res.status(500).json({message : "Something went wrong" + e});
    }
}


const signup = async (req, res) => {

    const {name, username, password} = req.body;

    try{

        const existing = await User.findOne({username : username})
        if (existing){
            return res.status(httpStatus.FOUND).json({message : "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new User(
            {
                name : name,
                username : username,
                password : hashedPassword
            }
        )

        await newUser.save();

        res.status(httpStatus.CREATED).json({message : "User created"})

    }
    catch (e) {
        res.json({message : "Something went wrong" + e});
    }

}

export { login, signup , test};