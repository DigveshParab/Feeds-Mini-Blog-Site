import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const headers = req.headers;
        const user_id = headers.get("x-user-id");

        if (!user_id) {
            return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
        }

        const posts = await Post.find({
            is_published: true,
            is_private: false,
            author: { $ne: user_id }
        })
        .sort({ createdAt: -1 })
        .select("title tags author createdAt")
        .populate("author", "username")
        .exec();

        return NextResponse.json({ error: false, posts: posts }, { status: 200 });

    } catch (err) {
        console.error("Error fetching global posts:", err);
        return NextResponse.json({ error: true, message: "Something went wrong." }, { status: 500 });
    }
}
