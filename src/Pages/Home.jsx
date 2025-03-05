import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch(`${API_URL}/api/posts`);
    const data = await res.json();

    console.log("data", data);
    if (res.ok) {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest Posts</h1>

      {posts.length > 0 ? (
        posts.map((post) => {
          const userName = post.user ? post.user.name : "Unknown"; // ✅ Safe fallback

          return (
            <div
              key={post.id}
              className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-2xl">
                    {post.content || "No Content"}
                  </h2>
                  <small className="text-xs text-slate-600">
                    Created by {userName} on{" "}
                    {new Date(post.created_at).toLocaleTimeString()}
                  </small>
                </div>
                <Link
                  to={`/posts/${post.id}`}
                  className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                >
                  Read more
                </Link>
              </div>
              {/* <p>{post.body || "No content"}</p> */}
            </div>
          );
        })
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
}
