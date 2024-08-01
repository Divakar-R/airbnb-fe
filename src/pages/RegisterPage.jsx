import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Reset error message if all fields are valid
    setError("");

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Redirecting to login page.");
      navigate("/login");
    } catch (e) {
      alert("Registration failed. Please try again later.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
