"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141312] via-[#1F1D1B] to-[#141312] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased">
      {/* Top Header Link */}
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#E8734A]" />
          <span>Back to Landing</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] flex items-center justify-center text-sm font-extrabold text-white shadow-md">
            🍳
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">CookDish</span>
        </div>
      </div>

      {/* Main Glassmorphism Auth Card Container */}
      <div className="my-auto max-w-md w-full mx-auto space-y-6">
        <div className="bg-[#1F1D1B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8734A]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest bg-[#E8734A] text-white px-3 py-1 rounded-full shadow-xs">
              Welcome Back
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Sign In to CookDish</h1>
            <p className="text-xs text-white/60">Access your saved recipes, meal plans & shopping list</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-bold text-white/90 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="chef.promise@cookdish.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#E8734A] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-bold text-white/90 block">Password</label>
                <a href="#" className="text-[11px] font-bold text-[#E8734A] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#E8734A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="w-4 h-4 accent-[#E8734A] rounded cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-white/70 font-medium cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E8734A] hover:bg-[#D66239] text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md cursor-pointer active:scale-95 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <Sparkles className="w-4 h-4 fill-white" />
                </>
              )}
            </button>
          </form>

          <div className="text-center border-t border-white/10 pt-4 relative z-10">
            <p className="text-xs text-white/60">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-extrabold text-[#E8734A] hover:underline">
                Create Chef Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-white/40 py-2">
        © 2026 CookDish App • Premium Culinary Platform
      </div>
    </div>
  );
}
