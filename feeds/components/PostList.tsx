import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  tags: string[];
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6 flex flex-col items-center">
    {posts && posts.length > 0 && posts.map((post) => (
      <Link
        href={`/post/${post._id}`}
        key={post._id}
        className="block border border-gray-200 p-6 rounded-lg hover:shadow-lg transition w-[80%] lg:w-[60%] bg-white"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
          {/* <ArrowRightIcon className="w-6 h-6 text-gray-400" /> */}
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-100 text-gray-600 rounded px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    ))}
  </div>

  );
}
