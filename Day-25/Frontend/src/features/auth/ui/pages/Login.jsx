import { Link, useNavigate } from "react-router";
import "../../style/login.scss"
import FormGroup from "../components/FormGroup";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const nevigate=useNavigate()
  const {loading,handelLogin}=useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handelSubmit(e){
    e.preventDefault()
    await handelLogin({email,password})
   nevigate("/")
  }
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <FormGroup 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          label="Email" placeholder="Enter your email"/>

          <FormGroup 
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
          label="Password" placeholder="Enter your password"/>
          <button 
          className="button"
          type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  );
};

export default Login;
