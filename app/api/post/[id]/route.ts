import { connectToDB } from "@/lib/mongoose";
import { IPost, Post } from "@/models/Post";
import { IUser, User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: true, message: "Invalid Post ID." }, { status: 400 });
        }

        await connectToDB();

        const post = await Post.findById(id).exec() as IPost || null;

        const authorDetails = await User.findById(post.author).exec() as IUser || null;
        if (!post) {
            return NextResponse.json({ error: true, message: "Post not found." }, { status: 404 });
        }

        return NextResponse.json({ error: false, data: post,author:{email:authorDetails.email,username:authorDetails.username} }, { status: 200 });

    } catch (err) {
        console.error("Error fetching post:", err);
        return NextResponse.json({ error: true, message: "Something went wrong." }, { status: 500 });
    }
}
