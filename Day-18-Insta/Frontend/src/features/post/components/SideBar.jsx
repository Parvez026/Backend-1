
import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { usePost } from "../hooks/usePost";
import "../style/sidebar.scss";

const SideBar = () => {
const {user}=useAuth()
const {handelFollowee,handelFollower}=usePost()
console.log(user.username);

   useEffect(()=>{
    handelFollowee(user.username)
    handelFollower(user.username)
   },[])
    
  return (
    <div className="sideBar">
      <div className="sidebar-container">
        <h3>Following</h3>
        <div className="following">
          <img
            src="https://plus.unsplash.com/premium_photo-1789063182969-20f94c28b643?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <p>username</p>
        </div>

        <div className="follower-container">
          <h4>Follower</h4>
          <div className="follower">
            <img
              src="https://plus.unsplash.com/premium_photo-1789063182969-20f94c28b643?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <p>username</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
