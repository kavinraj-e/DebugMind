import { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor.css"; // ✅ Required CSS import

export default function CreatePost() {
  const editorRef = useRef();
  const [form, setForm] = useState({
    title: "",
    topic: "",
    hashtags: "",
    description: "",
    thumbnail: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "debugmind");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dei4wuz8e/image/upload",
      data
    );
    setForm({ ...form, thumbnail: res.data.secure_url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current.getInstance().getMarkdown();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/posts/create`,
      {
        ...form,
        content,
        hashtags: form.hashtags.split(",").map((tag) => tag.trim()),
      },
      { withCredentials: true }
    );
    alert("Post published!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <input
        className="w-full p-2 border mb-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="w-full p-2 border mb-2"
        placeholder="Topic"
        value={form.topic}
        onChange={(e) => setForm({ ...form, topic: e.target.value })}
      />
      <input
        className="w-full p-2 border mb-2"
        placeholder="Hashtags (comma separated)"
        value={form.hashtags}
        onChange={(e) => setForm({ ...form, hashtags: e.target.value })}
      />
      <textarea
        className="w-full p-2 border mb-2"
        rows={3}
        placeholder="Short description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="file"
        className="mb-2"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {form.thumbnail && (
        <img
          src={form.thumbnail}
          className="w-full h-48 object-cover mb-2 rounded"
          alt="Thumbnail preview"
        />
      )}
      <Editor
        ref={editorRef}
        height="400px"
        initialEditType="markdown"
        previewStyle="vertical"
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        Publish
      </button>
    </form>
  );
}
