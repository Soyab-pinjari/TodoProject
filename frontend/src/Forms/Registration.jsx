import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";


  const Registration = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await registerUser({
      username,
      email,
      password,
    });
    setMsg(data.message);

    navigate("/login");
    } catch (error) {
        
console.log(error.response.data);
    setMsg(error.response.data.message);
    console.log(error.response.data.message);
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-[500px] bg-slate-800 rounded-xl p-6 shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-10">
          Register
        </h1>

        <h1 className='text-1xl font-semibold mb-6'>{msg}</h1>

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