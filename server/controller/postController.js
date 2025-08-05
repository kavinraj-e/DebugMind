const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, thumbnail, description, content, topic, hashtags } = req.body;
    const post = await Post.create({
      title,
      thumbnail,
      description,
      content,
      topic,
      hashtags,
      author: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name") // changed from username
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name") // changed from username
      .populate("comments.user", "name"); // changed from username
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.id;

    // Toggle like
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    // Return updated likes only (to reduce frontend re-render data)
    res.json({ likes: post.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like/unlike post" });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();

    // repopulate after saving to return name
    const updatedPost = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name");

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to comment" });
  }
};
