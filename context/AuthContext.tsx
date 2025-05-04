// context/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance'
import { useRouter } from 'next/navigation';
interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true ,setUser: () => {}, });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      // todo add loading mechanism
      try {
        const res = await axiosInstance.get('/auth/me');
        console.log(res.data)
        if(!res.data.is_logged_in)
        {
          // setUser(null)
          // router.push('/')
        }
        else{
          setUser(res.data.user);
          // router.push('/home')
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  

  return <AuthContext.Provider value={{ user, loading,setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
