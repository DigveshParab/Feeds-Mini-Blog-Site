"use client"
import Loading from "@/components/LoadingSpinner";
import TabSwitcher from "@/components/TabSwitcher";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const {user} = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      {user ? <main className="flex-grow p-4">
        <TabSwitcher />
      </main>
      :
      <Loading message="Your Dashboard is almost ready!"/>  
    }
    </div>
  );
}
