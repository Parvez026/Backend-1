import { useContext } from "react"
import { PostContext } from "../post.context"
import { getFeeda } from "../services/post.api"


export const usePost=()=>{
   const context= useContext(PostContext)

   const {loading,setLoading,feed,setFeed,post,setPost}=context

    const handelGetFeed=async()=>{
      setLoading(true)
      const data=await getFeeda()
      setFeed(data.posts)
      setLoading(false)
   }
   return{
    loading,handelGetFeed,feed,post
   }
}