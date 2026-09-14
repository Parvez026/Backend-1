import { Link, useNavigate } from "react-router"
import "../style/form.scss"
import { useState } from "react"
import useAuth from "../hooks/useAuth"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {handelLogin,loading}=useAuth()
    const navigate=useNavigate()
   const handelSubmit=async(e)=>{
    e.preventDefault()
   await handelLogin(username,password)
    navigate("/")
   }

   if(loading){
    return(
        <main>
            <h1>Loading...</h1>
        </main>
    )
   }

  return (
    <main className="main-page">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>
                <input
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}} 
                type="text" name="username" id="username" placeholder="Enter username" />
                <input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password" name="password" id="password" placeholder="Enter password" />
                <button className="button primary-btn">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login