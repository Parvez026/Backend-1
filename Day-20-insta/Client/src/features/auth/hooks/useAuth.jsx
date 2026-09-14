import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register } from "../services/auth.api"




export const useAuth = () => {
   const context=useContext(AuthContext)

   const {user,setUser,loading,setLoading}=context

  const handelLogin=async(username,password)=>{
    setLoading(true)
    const data=await login(username,password)
    setUser(data.user)
    setLoading(false)
  }
  const handelRegister=async(username,email,password)=>{
    setLoading(true)
    const data=await register(username,email,password)
    setUser(data.user)
  }

  return {
    loading,
    user,
    handelLogin,
    handelRegister
  }
}

export default useAuth