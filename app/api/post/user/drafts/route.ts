import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers;
    const user_id = headers.get("x-user-id");

    if (!user_id) {
      return NextResponse.json({ error: true, message: "Unauthorized." }, { status: 401 });
    }

    await connectToDB();

    const draftPosts = await Post.find({
      author: user_id,
      is_published: false,
    })
    .sort({ updatedAt: -1 }) // optional: sort by latest update
    .select("title tags updatedAt"); // minimal fields for listing

    return NextResponse.json({ error: false, posts: draftPosts }, { status: 200 });

  } catch (err) {
    console.error("Error fetching draft posts", err);
    return NextResponse.json({ error: true, message: "Internal Server Error." }, { status: 500 });
  }
}
