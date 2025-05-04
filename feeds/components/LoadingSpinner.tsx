// components/Loading.tsx
'use client';

import React from 'react';

export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm">{message}</p>
    </div>
  );
}
