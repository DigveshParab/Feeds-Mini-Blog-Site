'use client'
import { useState } from "react";
import axiosinstance from '@/lib/axiosInstance'
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import axiosInstance from '@/lib/axiosInstance'
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username,setUsername] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [is_laoding,setIs_loading] = useState<boolean>(false)
  const router = useRouter();
  let isFilled = isLogin ? email.length > 0 && password.length > 0 : username.length > 0 && email.length > 0 && password.length > 0; 

  const {setUser} = useAuth();



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIs_loading(true)
      const res = await axiosinstance.post('/auth/login', { email, password });
      
      console.log(res.data)
      if(res.data.error)
      {
        alert(res.data.message)
      }
      else{
        // store data in global state for further use
        const userdata = await axiosInstance.get('/auth/me');
        setUser(userdata.data.user)
        router.push('/home'); // or wherever you want to redirect after login
      }
      setIs_loading(false)
    } catch (err) {
      setIs_loading(false)
      console.error("login issue",err)
    }
  };


  const handleSignup = async(e: React.FormEvent)=>{
    e.preventDefault();
    try {
      setIs_loading(true)
      const res = await axiosinstance.post('/auth/signup',{username,email,password});

      alert("hello")
      const data = res.data;
      if(data.error)
      {
        alert(data.message)
      }
      else{
        console.log(data.message)
        alert(res.data.message)
        router.push("/home")
      }
      setIs_loading(false)
    } catch (err) {
      setIs_loading(false)
      console.error("Signup error",err)
    }
  }


  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isLogin ? "Login to Feeds" : "Sign up for Feeds"}
      </h2>
      <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <input type="text" placeholder="Username" className="w-full p-2 border rounded" value={username} onChange={e=>setUsername(e.target.value)} required/>
        )}
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:bg-gray-400"  disabled={!isFilled}>
          {isLogin ? is_laoding ? "Login" : <div className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : is_laoding ? "Sign Up":<div className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
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
