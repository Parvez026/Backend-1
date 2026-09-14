import { createContext, useState } from "react";

export const PostContext=createContext()

export const PostProvider=({children})=>{
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <PostContext.Provider value={{feed,setFeed,loading,setLoading}}>
            {children}
        </PostContext.Provider>
    )
}