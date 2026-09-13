import { useRef, useState } from "react"
import"../style/createPost.scss"
import { usePost } from "../hooks/usePost"
import { useNavigate } from "react-router"

const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const createPostImageRef=useRef()
    const {handelCreatePost,loading}=usePost()
    const navigate=useNavigate()
    
   const handelSubmit=(e)=>{
      e.preventDefault()
      const file=createPostImageRef.current.files[0]
      handelCreatePost(file,caption)
      navigate("/")
    }
    if(loading){
        return (
            <main>
                <h1>Loading.....</h1>
            </main>
        )
    }
  return (
    <main className="create-post-page">
        <div className="post-cantainer">
            <h2>Create Post</h2>
            <form onSubmit={handelSubmit}>
                <label className="postImage-label" htmlFor="postImage">Select Image</label>
                <input
                ref={createPostImageRef}
                 hidden type="file" name="postImage" id="postImage"/>
                <input 
                value={caption}
                onChange={(e)=>{setCaption(e.target.value)}}
                type="caption" name="caption" id="caption" placeholder="Enter caption" />
                <button className="button form-btn">Create</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost