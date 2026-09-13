

import Post from "../components/Post";
import "../style/post.scss";

import { usePost } from "../hooks/usePost";

import Nav from "../../shared/components/Nav";
import SideBar from "../components/SideBar";

// Apne actual AuthContext ka path use karna
import { AuthContext } from "../../auth/auth.context";
import { useEffect } from "react";

const Feed = () => {
  const {
    loading,
    handelGetFeed,
    feed,
    handleLike,
    handleUnLike,
    handleFollow,
    handleUnfollow,

    handelFollowee,
    handelFollower,

    
  } = usePost();




  
  

  useEffect(() => {
    handelGetFeed();
  }, []);

//   useEffect(() => {
//     if (user?.username) {
//       handelFollowee(user.username);
//       handelFollower(user.username);
//     }
//   }, [user]);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading.....</h1>
      </main>
    );
  }

  return (
    <>
      <Nav />

      <main className="feed-page">

        <SideBar
          feed={feed}
        />

        <div className="feed">

          <div className="posts">

            {feed.map((post) => {

              return (
                <Post
                  key={post._id}
                  post={post}
                  user={post.user}
                  handleLike={handleLike}
                  handleUnLike={handleUnLike}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                />
              );
            })}

          </div>

        </div>

      </main>
    </>
  );
};

export default Feed;