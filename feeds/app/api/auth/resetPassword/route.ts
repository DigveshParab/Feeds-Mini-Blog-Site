import { connectToDB } from "@/lib/mongoose";
import { IUser, User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';


/* //todo: secure password reset
- i will create a post request which will get a email from user we verify if the email is a valid user
- if yes then we create a token available for short period of time and send a link to his email
- this link will navigate him to the newpassword set form
- here he will send in a PUT request with the new password to backend along with the token, we check the token and allow him to change the password

*/


export async function PUT(req:NextRequest){
    try {
        const {email,newPassword} = await req.json();

        await connectToDB();

        //todo: move this login to POST
        const user = await User.findOne({email}).exec() as IUser || null;

        if(!user) return NextResponse.json({error:true,message:"User with this email does not exist. Kindly signup"},{status:404});

        // if user exists
        // todo: generate a short life token and send a link to frontend


        //todo: token verification logic will come here

        const newHashedPassword = await bcrypt.hash(newPassword,10);

        user.password = newHashedPassword;
        await user.save();

        return NextResponse.json({error:false,message:"Password updated successfully, Move to Login page"},{status:200});


    } catch (err) {
        console.error("Password reset error",err);
        return NextResponse.json({error:true,message:"something went wrong"},{status:500});
    }
}