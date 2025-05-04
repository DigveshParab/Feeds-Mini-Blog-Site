"use client"
import { useEffect, useState } from "react";
import PostList from "./PostList";
import axiosInstance from "@/lib/axiosInstance"
import Loading from "./LoadingSpinner";
import NoPosts from "./NoPost";
interface Post {
  _id: string;
  title: string;
  tags: string[];
}



export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<"global" | "my">("global");
  const [globalPosts, setGlobalPosts] = useState<Post[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [fetching,setFetching] = useState<boolean>(false)
  // Dummy data
  // const globalPosts = [
  //   { id: "1", title: "Exploring Next.js", tags: ["nextjs", "react"] },
  //   { id: "2", title: "Tailwind Tips", tags: ["tailwind", "css"] },
  // ];

  // const myPosts = [
  //   { id: "3", title: "My Private Thoughts", tags: ["personal", "blog"] },
  //   { id: "4", title: "Draft on UI", tags: ["draft", "design"] },
  // ];


  useEffect(() => {
    const fetchPosts = async () => {
      setFetching(true)
      try {
        if (activeTab === "global") {
          const res = await axiosInstance.get("/post/global");
          setGlobalPosts(res.data.posts); // adjust according to your backend
        } else {
          const res = await axiosInstance.get("/post/user");
          setMyPosts(res.data.posts); // again adjust if needed
        }
        setFetching(false)
      } catch (error) {
        setFetching(false)
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [activeTab]);

  

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

      {!fetching ? <div>
        {activeTab === "global" ? (
            globalPosts.length > 0 ? <PostList posts={globalPosts} /> : <NoPosts/>
        ) : (
            myPosts.length > 0 ? <PostList posts={myPosts} /> : <NoPosts/>
        )}
      </div>:
        <Loading message="Posts coming right up!"/>
      }
    </div>
  );
}
