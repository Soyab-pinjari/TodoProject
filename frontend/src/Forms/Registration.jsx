import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
      console.log("1");
    try {
        console.log("2");
      const data = await registerUser({
      username,
      email,
      password,
    });
        // alert(data.message);
        alert("registration successfully");
       
    navigate("/login");
    } catch (error) {
        console.log(error.response?.data);
  console.log(error.message);
   console.log(error);

}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-[500px] bg-slate-800 rounded-xl p-6 shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 bg-white text-black rounded-lg outline-none border-2"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-white text-black rounded-lg outline-none border-2"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-white text-black rounded-lg outline-none border-2"
          />

          <button
            type="submit"

            className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg font-semibold"
          >
            Register
          </button>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Registration;