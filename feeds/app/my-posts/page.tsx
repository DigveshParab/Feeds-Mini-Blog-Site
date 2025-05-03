import MyPostsTabSwitcher from "@/components/MyPostsTabSwitcher";

export default function MyPostsPage() {
  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <MyPostsTabSwitcher />
    </div>
  );
}
