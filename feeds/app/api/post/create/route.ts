import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const headers = req.headers;
        // getting form the middleware
        const user_id = headers.get("x-user-id");
        const email = headers.get("x-user-email");
        
        // getting user inputs
        const {title, content, tags, type } = await req.json();

        if (!title || !content || !Array.isArray(tags) || tags.length === 0) {
            return NextResponse.json({ error: true, message: "Title, content and tags are required." }, { status: 400 });
          }
      
        // flags
        let is_published = false;
        let is_private = false;
        // here there are 2 type of posts 1. published 2. draft
        // private posts will be handleed in another request to make them private and undo them
        if(type === "p")
        { // create a published post
            is_published = true;
            is_private = false
        }
        else if (type === "d")
        { // create a draft post
            is_published = false;
            is_private = false;
        }

        const newPost = await Post.create({
            title,
            content,
            tags,
            is_published,
            is_private,
            author:user_id
        })

        return NextResponse.json({error:false,message:"Post created"},{status:200})

        
    } catch (err) {
        console.error("error creating post",err);
        return NextResponse.json({error:true,message:"Something went wrong."},{status:500});
    }
}