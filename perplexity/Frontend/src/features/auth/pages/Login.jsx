import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user=useSelector(state=>state.auth.user)
  const loading=useSelector(state=>state.auth.loading)

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    await handleLogin(payload);
    navigate("/");
  };
  
  if(!loading&&user){
    return <Navigate to='/' replace/>
  }
  

  return (
    <div className="bg-gray-900 w-full min-h-screen text-white mx-auto flex items-center justify-center">
      <div className="min-w-[400px] border border-cyan-800 p-6 rounded-xl bg-gray-800">
        <h1 className="text-cyan-600 font-bold text-2xl mb-5">Login</h1>

        {/* login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col full">
            <label htmlFor="">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-700 rounded-md px-3 py-2 mt-1 w-full focus:outline-cyan-500 focus:outline-1"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-700 rounded-md px-3 py-2 mt-1 w-full focus:outline-cyan-500 focus:outline-1"
              type="text"
              placeholder="Enter password"
            />
          </div>
          <button className="w-full px-2 py-2 text-center bg-cyan-600 rounded-md">
            Login
          </button>
          <p className="text-center">
            Don't have account?
            <Link className="text-cyan-600" to="/register">
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
