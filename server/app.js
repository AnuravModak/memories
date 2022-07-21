import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import {
  createPost,
  getPosts,
  updatePost,
  getSinglePost,
  deletePost,
  updateAdminPost,
} from "./controller/posts.js";
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/getPosts", getPosts);
app.use("/getSinglePost/:id", getSinglePost);
app.use("/posts", createPost);
app.use("/update/:id", updatePost);
app.use("/admin/update/:id", updateAdminPost);
app.use("/deletePost/:id", deletePost);

const CONNECTION_URL =
  "mongodb+srv://anuravmodak:LTfkxaucEAyE1SJG@cluster0.mlynw.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
