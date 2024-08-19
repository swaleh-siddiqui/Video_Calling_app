import {User} from "../models/userModel.js";
import { Meet } from "../models/meetModel.js";
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
            return res.status(httpStatus.NOT_FOUND).json({message : "No user exist with the username " + username});
        }

        let ispasscorrect = await bcrypt.compare(password, user.password);

        if (ispasscorrect){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token : token})
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid username or password"});
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

const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meet.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meet({
            user_id: user.username,
            meet_code: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

export { login, signup , getUserHistory, addToHistory, test};