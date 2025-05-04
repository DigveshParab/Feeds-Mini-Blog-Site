// components/NoPosts.tsx
'use client';

import React from 'react';

export default function NoPosts({ message = 'No posts available.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-600">
      <svg
        className="w-12 h-12 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-6a4 4 0 00-4-4H9a4 4 0 00-4 4v2m14-6a4 4 0 00-4-4H13a4 4 0 00-4 4v2" />
      </svg>
      <p className="text-lg">{message}</p>
    </div>
  );
}
