import Link from "next/link";

type Post = {
  id: string;
  title: string;
  tags: string[];
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4 flex flex-col items-center">
      {posts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="block border p-4 rounded hover:shadow-md transition w-[80%] lg:w-[60%]"
        >
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <div className="flex gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-200 rounded px-2 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
