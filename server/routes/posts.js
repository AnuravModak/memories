import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  getSinglePost,
  deletePost,
  updateAdminPost,
} from "../controller/posts.js";

import bodyParser from "body-parser";

const router = express.Router();

router.get("/getPosts", getPosts);
router.get("/getSinglePost/:id", getSinglePost);
router.post("/posts", createPost);
router.patch("/update/:id", updatePost);
router.patch("/admin/update/:id", updateAdminPost);
router.delete("/deletePost/:id", deletePost);

export default router;
