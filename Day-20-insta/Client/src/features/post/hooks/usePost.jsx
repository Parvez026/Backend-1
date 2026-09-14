import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { createPost, fetFeed, likePost, unlikePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, feed, setFeed } = context;

  const handelFeed = async () => {
    setLoading(true);
    const data = await fetFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handelCreatePost=async(image_url,caption)=>{
     setLoading(true)
     const data=await createPost(image_url,caption)
     setFeed([data.post,...feed])
     setLoading(false)
  }

  const handelLike=async (postId)=>{
    await likePost(postId)
    handelFeed()
  }
  const handelUnLike=async (postId)=>{
    await unlikePost(postId)
    handelFeed()
  }

  useEffect(()=>{
    handelFeed()
  },[])


  return {
    handelFeed,
    handelLike,
    handelUnLike,
    handelCreatePost,
    loading,
    feed,
  };
};

export default usePost;
