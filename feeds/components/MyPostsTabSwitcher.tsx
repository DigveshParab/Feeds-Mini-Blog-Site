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

const MyPostsTabSwitcher = () => {
  const [activeTab, setActiveTab] = useState<"drafts" | "private">("drafts");
  const [draftsPosts, setDraftPosts] = useState<Post[]>([]);
  const [privatePosts, setPrivatePosts] = useState<Post[]>([]);
  const [fetching,setFetching] = useState<boolean>(false)


  useEffect(() => {
    const fetchPosts = async () => {
      setFetching(true)
      try {
        if (activeTab === "drafts") {
          const res = await axiosInstance.get("/post/user/drafts");
          setDraftPosts(res.data.posts); // adjust according to your backend
        } else {
          const res = await axiosInstance.get("/post/user/private");
          setPrivatePosts(res.data.posts); // again adjust if needed
        }
        setFetching(false)
      } catch (error) {
        setFetching(false)
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [activeTab]);


  // const data = {
  //   drafts: [
  //     { id: "d1", title: "Unpublished Idea", tags: ["draft", "react"] },
  //     { id: "d2", title: "To Be Written", tags: ["inspiration"] },
  //   ],
  //   published: [
  //     { id: "p1", title: "My React Journey", tags: ["react", "blog"] },
  //     { id: "p2", title: "Tips for Devs", tags: ["career"] },
  //   ]
  // };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "drafts" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "private" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("private")}
        >
          Private
        </button>
      </div>

      {!fetching ? <div>
          {activeTab === "drafts" ? (
              draftsPosts.length > 0 ? <PostList posts={draftsPosts} /> : <NoPosts/>
          ) : (
              privatePosts.length > 0 ? <PostList posts={privatePosts} /> : <NoPosts/>
          )}
        </div>
        :
        <Loading message="Loading you posts!"/>
      }
    </div>
  );
};

export default MyPostsTabSwitcher;
