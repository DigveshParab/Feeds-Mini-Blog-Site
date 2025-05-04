'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/LoadingSpinner';
import NoPosts from '@/components/NoPost';
import BackButton from '@/components/BackButton';
import Navbar from '@/components/Navbar';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  createdAt: string;
  is_published: boolean;
  is_private: boolean;
}

interface Author {
  email:string
  username:string
}
export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [authorData,setAuthorData] = useState<Author | null>(null)
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {user} = useAuth();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/post/${id}`);
      
      setPost(res.data.data);
      setAuthorData(res.data.author)
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPost();
  }, [id]);



  const handlePublish = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await axiosInstance.put(`/post/create/${id}`);
        console.log("Post response:", res.data);
        if(res.data.error)
          {
            alert(res.data.message);
          }
          else{
            alert(res.data.message)
            fetchPost();
          }
        // Optionally redirect or reset form
      } catch (error) {
        console.error("Failed to submit post:", error);
        alert("Error creating post");
      }
    };

    const handleDelete = async (e:React.FormEvent)=>{
      e.preventDefault();
      try {
        const res = await axiosInstance.delete(`/post/delete/${id}`);
        router.push('/')
        // Optionally redirect or reset form
        if(res.data.error)
          {
            alert(res.data.message);
          }
          else{
            alert(res.data.message)
            router.push("/home");
          }
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Error creating post");
      }
    };


    const handleMakePrivate = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await axiosInstance.put(`/post/edit/${id}`, { type: 'l' });
        console.log('Post marked as private');
        // optionally update UI state here
        if(res.data.error)
          {
            alert(res.data.message);
          }
          else{
            alert(res.data.message)
            fetchPost();
          }
      } catch (err) {
        console.error('Error making post private:', err);
      }
    };
    
    const handleMakePublic = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await axiosInstance.put(`/post/edit/${id}`, { type: 'u' });
        console.log('Post marked as public');
        // optionally update UI state here
        if(res.data.error)
        {
          alert(res.data.message);
        }
        else{
          alert(res.data.message)
          fetchPost();
        }
      } catch (err) {
        console.error('Error making post public:', err);
      }
    };

    
  if (loading) return <Loading message='Just a moment!'/>;
  if (!post) return <NoPosts message='Post Not Found'/>;


  return (
    <>
      <Navbar/>
    
    <div className="max-w-4xl mx-auto px-6 py-16 relative">
      {/* Action buttons */}
      <BackButton/>
      {user?.email === authorData?.email && <div className="absolute top-6 right-6 flex gap-3">
        {!post.is_published && (
          <button onClick={e=>handlePublish(e)} className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm hover:bg-green-700">
            Publish
          </button>
        )}
        <button onClick={post.is_private?handleMakePublic:handleMakePrivate} className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm hover:bg-blue-700">
          {post.is_private ? 'Make Public' : 'Make Private'}
        </button>
        <Link
          href={`/edit/${post._id}`}
          className="bg-gray-500 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm hover:bg-red-600">
          Edit
        </Link> 
        <button onClick={handleDelete} className="bg-red-500 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm hover:bg-red-600">
          Delete
        </button>
      </div>}

      {/* Title */}
      <h1 className="text-5xl font-semibold leading-tight mb-6">{post.title}</h1>

      {/* Author & Date */}
      <div className="text-gray-500 text-base mb-4">
        <span className="font-medium">{authorData?.username}</span> &nbsp;•&nbsp; {formatDate(post.createdAt)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {post.tags && post.tags.map(tag => (
          <span
            key={tag}
            className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content && post.content.split('\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </div>
    </>
  );
}
