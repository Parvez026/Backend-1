import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function getFeeda() {
  const response = await api.get("/feed");

  return response.data;
}

export async function CreatePost(imageFile, caption) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const response = await api.post("/", formData);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post("/likes/" + postId);

  return response.data;
}
export async function unLikePost(postId) {
    const response = await api.post("/unlikes/" + postId)
    return response.data
}

export async function followPost(username) {
  const response = await axios.post(
    "http://localhost:3000/api/users/follow/" + username,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export async function unFollowPost(username) {
  const response = await axios.post(
    "http://localhost:3000/api/users/unfollow/" + username,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export async function follower(username){
  const response=await axios.get("http://localhost:3000/api/users/followers/"+username,
  
    {
      withCredentials:true
    }
  )
  return response.data
}

export async function followee(username){
  const response=await axios.get("http://localhost:3000/api/users/following/"+username,
    {
      withCredentials:true
    }
  )
  return response.data
}