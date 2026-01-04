import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
// Icons ke liye react-icons library install karein: npm install react-icons
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { RiMovie2Line } from "react-icons/ri"; // Vynk logo ke liye example icon

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password
      });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setData({ email: "", password: "" });
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        navigate("/welcome");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Background Container
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Blurred Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Dark cinema/neon style image
          alt="Background" 
          className="w-full h-full object-cover filter blur-md scale-105 brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] p-8 mx-4 bg-[#111111] border border-white/5 rounded-3xl shadow-2xl backdrop-blur-sm">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4 shadow-lg shadow-blue-500/20">
            {/* Replace with your actual logo image if you have one */}
            {/* <img className='w-8 h-8' src="/Frame.png" alt="Vynk Logo" /> */}
            <RiMovie2Line className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 text-sm mt-2">Enter your details to access Vynk</p>
        </div>

        <form className="space-y-5" onSubmit={loginUser}>
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-zinc-300 ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 text-zinc-500 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 text-sm"
                type="email" 
                name='email' 
                placeholder='name@example.com' 
                value={data.email} 
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[13px] font-medium text-zinc-300 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-zinc-500 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-12 py-3.5 bg-[#1a1a1a] border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 text-sm"
                type={showPassword ? "text" : "password"}
                name='password' 
                placeholder='••••••••' 
                value={data.password} 
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-zinc-500 hover:text-zinc-300 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-8"
            type="submit"
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In <FiArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-zinc-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login