import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch posts
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));

    // // Fetch current user
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/authprofile`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => setUserId(res.data._id))
    //   .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );

      // Update local state
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => {
        const isLiked = userId && post.likes?.includes(userId);

        return (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {/* Thumbnail */}
            <Link to={`/post/${post._id}`}>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/post/${post._id}`}>
                <h2 className="text-lg font-bold mb-1">{post.title}</h2>
              </Link>

              <div className="text-sm text-gray-500 mb-1 flex justify-between">
                <span>{post.topic}</span>
                <span className="italic">By {post.author?.name || "Unknown"}</span>
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {post.description}
              </p>

              <div className="text-sm text-gray-800 mb-3 line-clamp-4 prose prose-sm max-w-none">
                <ReactMarkdown>
                  {post.content.length > 300
                    ? post.content.slice(0, 300) + "..."
                    : post.content}
                </ReactMarkdown>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.hashtags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full"
                  >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>

              {/* Like and Comment Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 hover:text-red-500 transition"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-red-500" />
                  )}
                  {post.likes?.length || 0}
                </button>

                <Link
                  to={`/post/${post._id}`}
                  className="flex items-center gap-1 hover:text-blue-500 transition"
                >
                  <FaComment className="text-blue-500" />
                  {post.comments?.length || 0}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
