import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {
  CreatePost,
  followee,
  follower,
  followPost,
  getFeeda,
  likePost,
  unFollowPost,
  unLikePost,
} from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, feed, setFeed, post } = context;

  const handelGetFeed = async () => {
    setLoading(true);
    const data = await getFeeda();
    setFeed(data.posts);
    setLoading(false);
  };

  const handelCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await CreatePost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (post) => {
    const data = likePost(post);
    handelGetFeed();
  };
  const handleUnLike = async (post) => {
    const data = await unLikePost(post);
    await handelGetFeed();;
  };

 const handleFollow = async (username) => {
  await followPost(username);
  await handelGetFeed();
};

const handleUnfollow = async (username) => {
  await unFollowPost(username);
  await handelGetFeed();
};

const handelFollower = async (username) => {
  const data = await follower(username);
  setFeed([data.followers,...feed])
};

const handelFollowee = async (username) => {
  const data = await followee(username);
  setFeed([data.following,...feed])
};

//  useEffect(()=>{
//    handelGetFeed()
//  },[])
  return {
    loading,
    handelGetFeed,
    feed,
    post,
    handelCreatePost,
    handleUnLike,
   handleLike,
   handleFollow,
   handleUnfollow,
   handelFollowee,
   handelFollower
  };
};
