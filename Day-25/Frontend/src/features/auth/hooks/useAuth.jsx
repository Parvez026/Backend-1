import { useContext, useEffect } from "react"
import { AuthContext } from "../state/auth.context"
import { getMe, login, logout, register } from "../service/auth.api"


export const useAuth = () => {

    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}= context
 
    async function handelLogin({email,password,username}){
        setLoading(true)
        const data=await login({email,password,username})
        setUser(data.user)
        setLoading(false)
    }
    async function handelRegister({email,password,username}){
        setLoading(true)
        const data=await register({email,password,username})
        setUser(data.user)
        setLoading(false)
    }
    async function handelGetMe(){
        setLoading(true)
        const data=await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handelLogout(){
        setLoading(false)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(()=>{
        handelGetMe()
    },[])

  return {
    user,
    loading,
    handelLogin,
    handelRegister,
    handelGetMe,
    handelLogout
  }
}

export default useAuth