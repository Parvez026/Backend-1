import { useRef, useState } from "react";
import "../style/createPost.scss";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputRef = useRef(null);
  const navigate=useNavigate()
  const { handelCreatePost, loading } = usePost();

  
  const handelSubmit = async (e) => {
    e.preventDefault();
    const file = postImageInputRef.current.files[0];
    await handelCreatePost(file, caption);
    navigate("/")
  };
  if (loading) {
    return (
      <main>
        <h2>Loading....</h2>
      </main>
    );
  }

  return (
    <div className="create-post-page">
      <div className="form-container">
        <h2>Create Post</h2>
        <form onSubmit={handelSubmit}>
          <label className="img-label" htmlFor="imageFile">
            select image
          </label>
          <input
            ref={postImageInputRef}
            hidden
            type="file"
            name="imageFile"
            id="imageFile"
          />
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption"
          />
          <button className="button primary-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
