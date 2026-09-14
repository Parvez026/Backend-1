import { useEffect } from "react";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import "../style/feed.scss";
import Nav from "../components/Nav";

const Feed = () => {
  const { feed, handelFeed, loading,handelLike,handelUnLike } = usePost();
  useEffect(() => {
    handelFeed();
  }, []);
  if(loading||!feed){
    return (
        <main>
            <h1>Loading....</h1>
        </main>
    )
  }

  return (
    <main className="feed-page">
        <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map((post)=>{
            return <Post post={post} user={post.user} handelLike={handelLike} handelUnLike={handelUnLike}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
