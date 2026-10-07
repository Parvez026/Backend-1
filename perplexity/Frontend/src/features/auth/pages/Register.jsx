import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
    };
    console.log(payload);
  };
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white mx-auto flex items-center justify-center">
      <div className="min-w-[400px] border border-cyan-800 p-6 rounded-xl bg-gray-800">
        <h1 className="text-cyan-600 font-bold text-2xl mb-5">Register</h1>

        {/* ===Register form=== */}
        <form 
        onSubmit={handleSubmit}
        className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-700 rounded-md px-3 py-2 mt-1 w-full focus:outline-cyan-500 focus:outline-1"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col">
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
            Register
          </button>
          <p className="text-center">
            Already have an account?
            <Link className="text-cyan-600" to="/login">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
