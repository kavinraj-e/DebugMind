const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/create", authMiddleware, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/:id/like", authMiddleware, postController.likePost);
router.post("/:id/comment", authMiddleware, postController.commentPost);

module.exports = router;
