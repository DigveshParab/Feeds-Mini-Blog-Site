// components/AuthForm.tsx
'use client'
import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isLogin ? "Login to Feeds" : "Sign up for Feeds"}
      </h2>
      <form className="space-y-4">
        {!isLogin && (
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        )}
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 ml-2 hover:underline"
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}
