'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance'
import { useAuth } from '@/context/AuthContext';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const{setUser,user} = useAuth()

  console.log(user)
  const handleLogout = async () => {
  
    try {
      await axiosInstance.post('/auth/logout');
      setOpen(false)
      setUser(null)
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  
  if(!user) return null
  
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b relative">
      <h1 className="text-2xl font-bold first-letter:text-4xl first-letter:text-purple-400 cursor-pointer" onClick={()=>router.push("/home")}>Feeds</h1>

      <div className="relative">
        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
        >
          <span className="text-white font-semibold">U</span>
        </div>

        {/* Dropdown */}
        {open && (
          <>
            {/* Overlay for mobile */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setOpen(false)} // Clicking outside to close
            />

            {/* Dropdown content */}
            <div className="fixed top-0 right-0 mt-16 w-full sm:w-48 bg-white border-l border-gray-200 rounded-l-lg shadow-lg z-50">
              {/* Username */}
              <div className="px-6 py-4 text-2xl font-semibold border-b text-gray-800">
                Email: <span className='text-xl'>{user?.email} </span>
              </div>
              {/* Dropdown items */}
              <div className="flex flex-col">
                <button
                  className="w-full text-left px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => {router.push('/home');setOpen(false)}} 
                >
                  Home
                </button>
                <button
                  className="w-full text-left px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => {router.push('/my-posts');setOpen(false)}} 
                >
                  My Library
                </button>
                <button
                  className="w-full text-left px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => {router.push('/create');setOpen(false)}} 
                >
                  Create Post
                </button>
                <button
                  className="w-full text-left px-6 py-3 text-lg text-red-500 hover:bg-gray-100"
                  onClick={() => handleLogout()} 
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
