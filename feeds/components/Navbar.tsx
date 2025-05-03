"use client"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-bold">Feeds</h1>
      <div className="relative">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
          {/* Avatar initials or icon */}
          <span className="text-white font-semibold">U</span>
        </div>
        {/* Placeholder for dropdown logic */}
      </div>
    </nav>
  );
}
