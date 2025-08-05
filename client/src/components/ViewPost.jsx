import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const handleComment = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/posts/${id}/comment`, { text: comment }, { withCredentials: true });
    setComment("");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    setPost(res.data);
  };

  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4">
      {post.coverImage && (
        <img src={post.coverImage} className="w-full h-60 object-cover rounded" />
      )}
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p className="text-sm text-gray-500">
        By {post.author?.username || "Unknown"} on {new Date(post.createdAt).toLocaleString()}
      </p>

      <ReactMarkdown className="prose max-w-none mt-4">{post.content}</ReactMarkdown>

      <h2 className="text-lg mt-8 mb-2 font-semibold">Comments</h2>
      <div className="space-y-2">
        {post.comments.map((c, i) => (
          <p key={i}><b>{c.user?.username}</b>: {c.text}</p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Add a comment"
        />
        <button
          onClick={handleComment}
          className="bg-gray-800 text-white px-4 py-1 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
}
