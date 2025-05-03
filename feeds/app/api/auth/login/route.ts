import { connectToDB } from "@/lib/mongoose";
import { IUser, User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
const JWT_SECRETKEY = process.env.JWT_SECRET as string;



//todo: findout why do we write functions with export by default
export async function POST(req:NextRequest){
    try {
        // get data from user
        const {email,password} = await req.json();
        
        await connectToDB();

        // we explicitly mention that user is either type IUser or null
        const user = await  User.findOne({email}).exec() as IUser || null;

        if(!user) return NextResponse.json({error:true,message:"No user exist with this email and password, kindly sign up"},{status:404});

        // match password
        const passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch) return NextResponse.json({error:true,message:"Incorrect credentials"},{status:401});

        // if everything correct then generate a token
        const token = await jwt.sign({userId:user._id,email:user.email},JWT_SECRETKEY,{expiresIn:"7d"});

        return NextResponse.json({error:false,message:"Login Successful.",email:user.email,username:user.username},{
            status:200,
            headers: {
                "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`,
            }            
        });

    } catch (err) {
        console.error("Login error",err);
        return NextResponse.json({error:true,message:"Something went wrong"},{status:500})
    }
}

