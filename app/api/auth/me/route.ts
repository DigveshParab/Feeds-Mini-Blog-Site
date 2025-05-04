import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const headers = req.headers;
        // getting form the middleware
        const userid = headers.get("x-user-id");
        const email = headers.get("x-user-email");
        console.log(userid)
        console.log(email)
        if(!userid || !email){
            return NextResponse.json({error:true,is_logged_in:false,message:"Unauthorized user"},{status:200});
        }

        return NextResponse.json({
            error: false,
            is_logged_in:true,
            user: {
              id: userid,
              email: email,
            },
          }, { status: 200 });
      


    } catch (err) {
        console.error("error fetching user");
        return NextResponse.json({error:true,message:"Something went wrong"},{status:500});
    }
}