import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
      await connectToDB(); // If not already connected
      
      const { id } = await context.params; // ✅ handles async param
  
      if (!id) {
        return NextResponse.json({ error: true, message: "Post ID is required." }, { status: 200 });
      }
  
      const post = await Post.findById(id);
  
      if (!post) {
        return NextResponse.json({ error: true, message: "Post not found." }, { status: 200 });
      }
  
      post.is_published = true;
      await post.save();
  
      return NextResponse.json({ error: false, message: "Post published successfully." }, { status: 200 });
    } catch (err) {
      console.error("Failed to publish post:", err);
      return NextResponse.json({ error: true, message: "Internal server error." }, { status: 500 });
    }
  }