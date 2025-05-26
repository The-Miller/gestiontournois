import api from "./config";

export const getAllPosts = async () => {
  const response = await api.get("/api/posts");
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post("/api/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePost = async (id, formData) => {
  const response = await api.put(`/api/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/api/posts/${id}`);
};

export const likePost = async (id) => {
  const response = await api.post(`/api/posts/${id}/like`);
  return response.data;
};

export const getCommentsByPostId = async (id) => {
  const response = await api.get(`/api/posts/${id}/comments`);
  return response.data;
};

export const addCommentToPost = async (id, comment) => {
  const response = await api.post(`/api/posts/${id}/comments`, comment);
  return response.data;
};
