'use client'

import { useRef, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance'
import { useRouter } from 'next/navigation';
import Loading from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';



export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const {user} = useAuth();
  const router = useRouter()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);

    // Auto-resize logic
    if (contentRef.current) {
      contentRef.current.style.height = 'auto'; // Reset the height
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`; // Adjust the height based on scrollHeight
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitle(value);

    // Auto-resize logic
    if (titleRef.current) {
        titleRef.current.style.height = 'auto'; // Reset the height
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`; // Adjust the height based on scrollHeight
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Detecting Enter key
    if (e.key === 'Enter') {
      setContent((prevContent) => prevContent + '\n');  // Append \n for new line when Enter is pressed
    }
  };



  const handleSubmit = async (e: React.FormEvent, status: "d" | "p") => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
  
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
  
    const payload = {
      title,
      content,
      tags: tagsArray,
      type:status,
    };
  
    try {
      const res = await axiosInstance.post("/post/create", payload);

      if(res.data.error)
      {
        alert(res.data.message)
      }
      else{
        alert(res.data.message)
        setTitle("")
        setContent("")
        setTags("")
        router.push("/home")
      }
    } catch (error) {
      console.error("Failed to submit post:", error);
      alert("Error creating post");
    }
  };
  
  if(!user) return <Loading message='We are preparing your canvas!'/>

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <form className="space-y-10">
        {/* Title */}
        <textarea
          ref={titleRef}
          rows={1}
          onChange={handleTitleChange}
          placeholder="Title"
          value={title}
          className="w-full text-4xl lg:text-5xl font-semibold font-serif placeholder-gray-400 focus:outline-none resize-none border-l-4 border-gray-300 p-2"
        />

        {/* Content */}
        <textarea
          ref={contentRef}
          rows={2}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}  // Detect Enter key for line breaks
          placeholder="Tell your story..."
          value={content}
          className="w-full text-2xl lg:text-3xl placeholder-gray-400  font-serif focus:outline-none resize-none border-l-4 border-gray-300 p-2"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full text-xl placeholder-gray-400  font-serif focus:outline-none border-l-4 border-gray-300 p-2"
        />

        {/* Publish Button */}
        <div className="pt-4 flex ">
         <button
            type="button"
            onClick={()=>router.push('/home')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e)=>handleSubmit(e,'p')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer ml-2 font-bold"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={(e)=>handleSubmit(e,'d')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer ml-2 font-bold"
          >
            Complete another time
          </button>
        </div>
      </form>
    </div>
  );
}
