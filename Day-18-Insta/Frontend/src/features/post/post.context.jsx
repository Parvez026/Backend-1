import { createContext, useState } from "react";



export const PostContext=createContext()

export const PostProvider=({children})=>{
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useState(null)
    const [post, setPost] = useState(null)
    const [follower, setFollower] = useState("")
    return(
        <PostContext.Provider value={{loading,setLoading,feed,setFeed,post,setPost,follower,setFollower}}>
         {children}
        </PostContext.Provider>
    )
}