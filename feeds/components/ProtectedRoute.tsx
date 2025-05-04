// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from './LoadingSpinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/') {
        router.push('/');
      } else if (user && pathname === '/') {
        router.push('/home');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (<Loading message='Loading'/>); // Or a loading spinner
  }

  return <>{children}</>;
}
