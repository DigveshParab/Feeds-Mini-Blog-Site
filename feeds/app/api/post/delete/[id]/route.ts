import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import mongoose from "mongoose";
import { Thasadith } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";


// read about Thasadith
/*
usually happens when you're using dynamic route segments ([id]) in an Edge Runtime route without properly 
defining the handler signature — and Next.js Edge Functions sometimes treat params as a Promise-like object.
*/
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const headers = req.headers;
        const user_id = headers.get("x-user-id");

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: true, message: "Invalid Post ID." }, { status: 400 });
        }

        await connectToDB();

        const post = await Post.findById(id).exec();
        if (!post) {
            return NextResponse.json({ error: true, message: "Post not found." }, { status: 404 });
        }

        if (post.author.toString() !== user_id) {
            return NextResponse.json({ error: true, message: "Unauthorized to delete this post." }, { status: 403 });
        }

        await post.deleteOne(); // or Post.findByIdAndDelete(id)

        return NextResponse.json({ error: false, message: "Post deleted successfully." }, { status: 200 });

    } catch (err) {
        console.error("Error deleting post:", err);
        return NextResponse.json({ error: true, message: "Something went wrong." }, { status: 500 });
    }
}
