import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function fetFeed() {
  const response = await api.get("/api/posts/feed");
  return response.data;
}

export async function createPost(image_url, caption) {
  const formData = new FormData();

  formData.append("image", image_url);
  formData.append("caption", caption);

  const response = await api.post("/api/posts/",formData);
  return response.data;
}

export async function likePost(postId){
   const response=await api.post("/api/posts/likes/"+postId)
   return response.data
}
export async function unlikePost(postId){
   const response=await api.post("/api/posts/unlikes/"+postId)
   return response.data
}