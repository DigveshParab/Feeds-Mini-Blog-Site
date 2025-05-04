import { connectToDB } from "@/lib/mongoose";
import { IUser, User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;


export async function POST(req:NextRequest){
    try {
        const {email,username,password} = await req.json();
        console.log(email,password,username)
        // check if payload recieved
        // no need coz ill be checking this in frontend
        // if(email || !username || password){
        //     return NextResponse.json({error:true,message:"Email, Username and Password are required"},{status:400});
        // }

        // connect to DB
        await connectToDB();

        // check if user already exist with type safety
        const existingUser = await User.findOne({email}).exec() as IUser || null;

        if(existingUser.email === email){
            return NextResponse.json({error:true,message:"User already exists with this email, kindly login"},{status:200});
        }
        if(existingUser.username === username){
            return NextResponse.json({error:true,message:"User already exists with this username, kindly pick a new username"},{status:200});
        }
        

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // create entry in DB
        const newUser = await User.create({
            email:email,
            password:hashedPassword,
            username:username
        })

        // generate JWT token
        const token = jwt.sign({userId:newUser._id,email:newUser.email},JWT_SECRET,{expiresIn:'7d'})

        // return data
        return NextResponse.json({error:false,message:"User Created Successfully,kindly login to your account."},{
            status:201,
            // headers: {
            //     "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`,
            // }  
        })
        // todo handle proper for whne username already exist

    } catch (err) {
        console.error("Signup error :",err);
        return NextResponse.json({error:true,message:"Something went wrong. Try again."},{status:500})
    }
}