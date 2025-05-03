import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    return NextResponse.json({error:false,message:"Logout successful"},{
        status:200,
        headers:{
            "Set-Cookie":"token=; HttpOnly; Path=/; Max-Age=0"
        }
    })
}


// working
// - empties the token from cookies
// - prevents access to cookies by js
// - makes sure it clears from root scope
// - immediat expires the cookie