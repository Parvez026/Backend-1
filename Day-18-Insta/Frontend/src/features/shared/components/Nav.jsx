
import { useNavigate } from "react-router"
import "../nav.scss"
const Nav = () => {
   const navigate=useNavigate()
  return (
    <div className="nav">
        <h1>Insta</h1>
        <button 
        onClick={()=>{navigate("/create-post")}}
        className="button form-btn">Create Post</button>
    </div>
  )
}

export default Nav