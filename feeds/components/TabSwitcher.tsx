"use client"
import { useState } from "react";
import PostList from "./PostList";

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<"global" | "my">("global");

  // Dummy data
  const globalPosts = [
    { id: "1", title: "Exploring Next.js", tags: ["nextjs", "react"] },
    { id: "2", title: "Tailwind Tips", tags: ["tailwind", "css"] },
  ];

  const myPosts = [
    { id: "3", title: "My Private Thoughts", tags: ["personal", "blog"] },
    { id: "4", title: "Draft on UI", tags: ["draft", "design"] },
  ];

  const handleGlobalPosts = async () => {
    // Fetch global posts from API
  };

  const handleMyPosts = async () => {
    // Fetch user posts from API
  };

  return (
    <div className="max-w-4xl mx-auto max-w-screen">
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${activeTab === "global" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("global")}
        >
          Global
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "my" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("my")}
        >
          My Posts
        </button>
      </div>

      <div>
        {activeTab === "global" ? (
            <PostList posts={globalPosts} />
        ) : (
            <PostList posts={myPosts} />
        )}
      </div>
    </div>
  );
}
