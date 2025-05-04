'use client'

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance'; // update this if needed
import Loading from '@/components/LoadingSpinner';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();


  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/post/${id}`);
        const { title, content, tags } = res.data.data;
        setTitle(title);
        setContent(content);
        setTags(tags.join(', '));

        // Resize textareas
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
          }
          if (contentRef.current) {
            contentRef.current.style.height = 'auto';
            contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
          }
        }, 100);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);



  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // Dummy fetch logic
  useEffect(() => {
    const dummyData = {
      title: 'How to Think Like a Programmer',
      content: 'Breaking problems down\nThinking in patterns\nAsking the right questions',
      tags: ['programming', 'mindset', 'career'],
    };

    setTitle(dummyData.title);
    setContent(dummyData.content);
    setTags(dummyData.tags.join(', '));

    // Resize textareas to fit dummy content
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitle(value);
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setContent((prevContent) => prevContent + '\n');
    }
  };

  const handleEdit = async (e: React.FormEvent, status: "d" | "p") => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/post/edit/${id}`, {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        type:status
      });
      alert('Post updated successfully');
      router.push(`/post/${id}`);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update post.');
    }
  };

  if (loading) return <Loading message='Just a moment!'/>;


  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Action Buttons */}

      <form className="space-y-10">
        {/* Title */}
        <textarea
          ref={titleRef}
          rows={1}
          onChange={handleTitleChange}
          placeholder="Title"
          value={title}
          className="w-full text-4xl lg:text-5xl font-semibold font-serif placeholder-gray-400 focus:outline-none border-l-4 resize-none border-gray-300 p-2"
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
      </form>
      <div className="pt-4 flex ">
          <button
            type="button"
            onClick={()=>router.push(`/post/${id}`)}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e)=>handleEdit(e,"p")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer ml-2 font-bold"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={(e)=>handleEdit(e,"d")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all cursor-pointer ml-2 font-bold"
          >
            Complete another time
          </button>
        </div>
    </div>
  );
}
