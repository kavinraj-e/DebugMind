import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden mb-6 border">
      {/* Image */}
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full object-contain max-h-[300px]"
      />

      {/* Post content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-1">{post.title}</h2>

        {/* Topic */}
        <p className="text-sm text-gray-500 mb-2">{post.topic}</p>

        {/* Description */}
        <p className="text-sm mb-2">
          <span className="font-semibold">Description:</span> {post.description}
        </p>

        {/* Content preview */}
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {post.content.length > 200
            ? post.content.substring(0, 200) + "..."
            : post.content}
        </p>

        {/* Hashtags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.hashtags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
