import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({
        email,
        password,
      })
      localStorage.setItem("token", data.token);
      setEmail('');
      setPassword('');
      navigate("/todo");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-[500px] bg-slate-800 rounded-xl p-6 shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"

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
            className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-center text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Register
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Login;