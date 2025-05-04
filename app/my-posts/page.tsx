'use client'
import Loading from "@/components/LoadingSpinner";
import MyPostsTabSwitcher from "@/components/MyPostsTabSwitcher";
import { useAuth } from "@/context/AuthContext";

export default function MyPostsPage() {
  const {user} = useAuth()
  if(!user) return <Loading message="Getting your library ready!"/>
  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <MyPostsTabSwitcher />
    </div>
  );
}
