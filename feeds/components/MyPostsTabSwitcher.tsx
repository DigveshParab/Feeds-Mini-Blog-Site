"use client"
import { useState } from "react";
import PostList from "./PostList";

const MyPostsTabSwitcher = () => {
  const [activeTab, setActiveTab] = useState<"drafts" | "published">("drafts");

  const data = {
    drafts: [
      { id: "d1", title: "Unpublished Idea", tags: ["draft", "react"] },
      { id: "d2", title: "To Be Written", tags: ["inspiration"] },
    ],
    published: [
      { id: "p1", title: "My React Journey", tags: ["react", "blog"] },
      { id: "p2", title: "Tips for Devs", tags: ["career"] },
    ]
  };

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
            activeTab === "published" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("published")}
        >
          Published
        </button>
      </div>

      <div>
        {activeTab === "drafts" ? (
            <PostList posts={data.drafts} />
        ) : (
            <PostList posts={data.published} />
        )}
    </div>
    </div>
  );
};

export default MyPostsTabSwitcher;
