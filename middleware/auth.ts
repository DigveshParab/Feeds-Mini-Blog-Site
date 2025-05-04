import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { verifyToken } from "@/lib/auth";
export async function middleware(req:NextRequest){
    // get the token from cookies
    const token = req.cookies.get("token")?.value;
    
    if(!token){
        return NextResponse.json({error:true,is_logged_in:false,message:"Unauthorized user"},{status:200});
    }

    try {
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        
        // we need to pass the data to the route
        // we create headers inorder to pass the data         
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user-id',user.userId as string);
        requestHeaders.set('x-user-email',user.email as string);
        console.log("middle in action")
        return NextResponse.next({request:{headers:requestHeaders}});

    } catch (err) {
        console.error("Middleware error",err);
        return NextResponse.json({error:true,message:"Unauthorized: Token expired or invalid"},{status:500});
    }
}
