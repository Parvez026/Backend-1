import FormGroup from "../components/FormGroup";
import "../../style/register.scss";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const {loading,handelRegister}= useAuth()
 const nevigate=useNavigate()

  async function handelSubmit(e) {
    e.preventDefault();
    await handelRegister({email,password,username})
    nevigate("/")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          <FormGroup
            label="Name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormGroup
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormGroup
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
