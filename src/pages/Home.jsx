import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-800 text-white">
      {/* Header */}
      <header className="w-full bg-zinc-800/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Frame.png" alt="Vynk logo" className="h-10 w-10 object-contain" />
            <a href="/" className="text-2xl font-extrabold tracking-tight">Vynk</a>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/welcome" className="hover:underline">Profile</Link>
            <Link to='/login' className="text-blue-300 hover:text-blue-200">Login</Link>
            <Link to="/register" className="px-3 py-2 bg-amber-400 text-black rounded-lg font-medium hover:bg-amber-300">Sign up</Link>
          </nav>

          <div className="sm:hidden">
            {/* mobile menu button (non-functional here) */}
            <button aria-label="Open menu" className="p-2 rounded-md bg-zinc-700/60">☰</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <img src="/home.jpg" alt="Couple watching together" className="w-full h-[60vh] sm:h-[75vh] object-cover opacity-60" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 py-10 sm:py-20">
            <div className="bg-black/40 p-6 sm:p-10 rounded-2xl backdrop-blur-sm">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                Watch Together,{' '}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">Miles Apart</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base max-w-2xl text-gray-200">Synchronize your streaming experience with friends and family. Share reactions, chat, and enjoy content together in perfect sync — no matter where you are.</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/watching">
                  <button className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">Start Watching</button>
                </Link>
                <Link to="#">
                  <button className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-white text-slate-900 hover:bg-slate-100 font-medium">Create Watch Party</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FeatureCard
            title="Choose Your Content"
            desc="Select from YouTube, Netflix, Disney+ and more. Our platform supports major streaming services."
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 2v20l18-10L4 2z" />
              </svg>
            }
          />

          <FeatureCard
            title="Invite Friends"
            desc="Generate a room code or share a link — friends join instantly from any device."
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" />
              </svg>
            }
          />

          <FeatureCard
            title="Watch & React"
            desc="See realtime reactions via video call, chat, and enjoy perfectly synchronized playback."
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 8v8l6-4-6-4z" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            }
          />
        </div>

        <div className="mt-12 text-center text-gray-200">
          <h3 className="text-2xl font-semibold">Experience Seamless Synchronized Streaming</h3>
          <p className="mt-2">Our tech keeps everyone in perfect sync — down to the millisecond.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 Vynk. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-300">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-zinc-700/70 rounded-2xl p-6 backdrop-blur-sm shadow-lg hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] transition">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-800/60 mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
