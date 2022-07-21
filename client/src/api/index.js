import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);

export const fetchSinglePost = (id) =>
  axios.get(`http://localhost:5000/getSinglePost/${id}`);

export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`http://localhost:5000/update/${id}`, updatedPost);

export const updateAdminPost = (id, updatedAdminPost) =>
  axios.patch(`http://localhost:5000/admin/update/${id}`, updatedAdminPost);

export const deletePost = (id) =>
  axios.delete(`http://localhost:5000/deletePost/${id}`);
