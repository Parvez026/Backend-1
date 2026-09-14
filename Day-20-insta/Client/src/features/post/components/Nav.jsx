import { useNavigate } from "react-router";
import "../../shared/nav.scss";

const Nav = () => {
    const navigate=useNavigate()
  return (
    <div className="nav">
      <h1>Insta</h1>
      <button 
      onClick={()=>{navigate("/create-post")}}
      className="button primary-btn">Create post</button>
    </div>
  );
};

export default Nav;
