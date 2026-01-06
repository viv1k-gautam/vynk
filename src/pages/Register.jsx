import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
// Icons import kar rahe hain (make sure react-icons installed ho)
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { RiMovie2Line } from "react-icons/ri";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = data;
    try {
      // Axios call
      const { data: resData } = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name,
        email,
        password
      });

      if (resData.error) {
        toast.error(resData.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success("Registration successful");
        navigate("/welcome");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Background Container (Same as Login)
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Blurred Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover filter blur-md scale-105 brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-[400px] p-8 mx-4 bg-[#111111] border border-white/5 rounded-3xl shadow-2xl backdrop-blur-sm">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4 shadow-lg shadow-blue-500/20">
            <RiMovie2Line className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-zinc-400 text-sm mt-2">Join Vynk to start streaming</p>
        </div>

        <form className="space-y-4" onSubmit={registerUser}>
          
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-zinc-300 ml-1 uppercase tracking-wider">Full Name</label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-zinc-500 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 text-sm"
                type="text" 
                name='name' 
                placeholder='John Doe' 
                value={data.name} 
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>

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
                autoComplete='new-email'
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-zinc-300 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-zinc-500 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-12 py-3.5 bg-[#1a1a1a] border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 text-sm"
                type={showPassword ? "text" : "password"}
                name='password' 
                placeholder='Create a strong password' 
                value={data.password} 
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete='new-password'
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
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            type="submit"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Account <FiArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-zinc-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
              Log in here
            </Link>
          </p>
        </div>

        <p className="text-[11px] text-zinc-600 mt-6 text-center leading-normal">
          By continuing, you agree to Vynk's Terms of Service and acknowledge you've read our Privacy Policy.
        </p>

      </div>
    </div>
  )
}