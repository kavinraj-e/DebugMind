import React from "react";

const posts = [
  {
    id: 1,
    title: "Learn React in 2025",
    description: "Hooks, server components, Tailwind — everything you need to build modern UIs.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbwI6_Kr4kKDxH5UN_yc9p0AJqmdFx7tqQA&s",
    username: "DevAnu",
    likes: 102,
    comments: 21,
    tags: ["ReactJS", "Frontend"]
  },
  {
    id: 2,
    title: "Master Java for Backend",
    description: "Java 21, Spring Boot 3 — building scalable APIs for production systems.",
    image: "https://imgs.search.brave.com/rzGBwuTTl2bauVgbrlStirTQn5ciPi5sxeosAgDJ6Mo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9qYXZhL2ltYWdl/cy9pbWdfamF2YV9v/cGVyYXRvcnMucG5n", // truncated for brevity
    username: "Sathish",
    likes: 87,
    comments: 15,
    tags: ["Java", "Backend"]
  },
  {
    id: 3,
    title: "Getting Started with Next.js 14",
    description: "Learn server actions, routing, and optimized builds in Next.js.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqZRg7aJcCVNeA-YoHlNZeVdTSH7mP5fFwQ&s",
    username: "Meena",
    likes: 74,
    comments: 10,
    tags: ["Next.js", "WebDev"]
  }
];

function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-8 sm:pt-28">
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Post Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-sm text-purple-700 font-bold">
                {post.username.charAt(0)}
              </div>
              <div className="text-sm text-gray-700 font-medium">{post.username}</div>
            </div>

            {/* Responsive Image with Aspect Ratio */}
            <div className="aspect-[16/9] w-full bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>

            {/* Post Content */}
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Likes and Comments */}
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>❤️ {post.likes} Likes</span>
                <span>💬 {post.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
