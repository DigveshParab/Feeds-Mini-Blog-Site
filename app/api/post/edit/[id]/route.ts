import { connectToDB } from "@/lib/mongoose";
import { IPost, Post } from "@/models/Post";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ,context: { params: Promise<{ id: string }> }){
    try {
        const headers = req.headers;
        // getting form the middleware
        const user_id = headers.get("x-user-id");
        const email = headers.get("x-user-email");
        // getting params data
        const { id } = await context.params; // ✅ handles async param

        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({ error: true, message: "Invalid Post ID." }, { status: 400 });
        }
        // check if post exists (optional as it wont render in frontend)
        await connectToDB();

        const post = await Post.findById(id).exec() as IPost || null;
        if(!post)
        {
            return NextResponse.json({ error: true, message: "Post not found." }, { status: 404 });
        }
        // if the user is the author of the post (optional as in frotend ill hide btn for edit for non owner)
        if(post.author.toString() !== user_id)
        {
            return NextResponse.json({ error: true, message: "Unauthorized to edit this post." }, { status: 403 });
        }

        const {title, content, tags, type } = await req.json();

        if (!title || !content || tags.length === 0) {
            return NextResponse.json({ error: true, message: "Title, content, and tags are required." }, { status: 400 });
        }

        post.title = title;
        post.content = content;
        post.tags = tags;

        // here we have 2 cases, 1. if a published post is updated 2. if a draft post is edited
        if(type === 'p'){
            post.is_published = true;
        }
        else if (type === 'd'){
            post.is_published = false;
        }
        
        await post.save();
        return NextResponse.json({ error: false, message: "Post updated successfully." }, { status: 200 });

    } catch (err) {
        console.error("error editing post",err);
        return NextResponse.json({error:true,message:"Something went wrong."},{status:500});
    }
}


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
      const headers = req.headers;
      const user_id = headers.get("x-user-id");
      const { id } = await context.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: true, message: "Invalid Post ID." }, { status: 400 });
      }
  
      await connectToDB();
  
      const post = await Post.findById(id).exec() as IPost || null;
  
      if (!post) {
        return NextResponse.json({ error: true, message: "Post not found." }, { status: 404 });
      }
  
      if (post.author.toString() !== user_id) {
        return NextResponse.json({ error: true, message: "Unauthorized to update privacy." }, { status: 403 });
      }
  
      const { type } = await req.json();
  
      if (type === "l") {
        post.is_private = true;
      } else if (type === "u") {
        post.is_private = false;
      } else {
        return NextResponse.json({ error: true, message: "Invalid type for privacy change." }, { status: 400 });
      }
  
      await post.save();
  
      return NextResponse.json({
        error: false,
        message: `Post marked as ${post.is_private ? "Private" : "Public"}.`
      }, { status: 200 });
  
    } catch (err) {
      console.error("error updating post privacy", err);
      return NextResponse.json({ error: true, message: "Something went wrong." }, { status: 500 });
    }
  }
  