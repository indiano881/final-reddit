import { Request, Response, Router } from "express";
import { User } from "../models/user";

const signUp=  async (req: Request, res: Response)=> {
    try {
        const {username, password}= req.body

        if (!username ||!password) res.status(400).json({message: 'username or password missing'})

        const existingUser= await User.findOne({username})  //in this case User is a model/table

        if (existingUser) res.status(400).json({message: 'username already exists'})
            
        //logic to create a new user in model/table User + await +save to give time to save
        const user= new User({username, password})
        await user.save()
        res.status(201).json({message: 'registrated new user'})

    } catch (error) {
        console.log(error)
        res.status(500).send() //must put send otherwise stucks
    }
}

export const authRouter= Router();

authRouter.post('/auth/sign-up', signUp)