import { useEffect } from "react"
import Post from "../components/Post"
import "../style/post.scss"
import { usePost } from "../hooks/usePost"

const Feed = () => {
   const {loading,handelGetFeed,feed,post}=usePost()

    useEffect(()=>{
    handelGetFeed()
    },[])

    if(loading||!feed){
        return (
            <main>
                <h1>Feed is loading.....</h1>
            </main>
        )
    }
    
  return (
    <main className="feed-page">
        <div className="feed">
            <div className="posts">
                {feed.map((post)=>{
                   return  <Post post={post} user={post.user}/>
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed