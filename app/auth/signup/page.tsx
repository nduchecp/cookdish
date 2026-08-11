import Link from "next/link";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#FDF6EF] flex flex-col justify-center p-6 sm:p-10">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E8734A] text-white flex items-center justify-center mx-auto shadow-md">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Create Account</h1>
          <p className="text-sm text-[#6E6B68]">Join CookDish to organize and discover recipes</p>
        </div>

        <form className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] space-y-4 shadow-sm">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#1F1D1B]">Full Name</label>
            <input
              type="text"
              placeholder="Chef Alex"
              className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-sm text-[#1F1D1B] focus:border-[#E8734A] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#1F1D1B]">Email Address</label>
            <input
              type="email"
              placeholder="chef@example.com"
              className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-sm text-[#1F1D1B] focus:border-[#E8734A] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#1F1D1B]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-sm text-[#1F1D1B] focus:border-[#E8734A] focus:outline-none"
            />
          </div>

          <Link
            href="/"
            className="w-full bg-[#E8734A] text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D66239] transition-all shadow-md mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-center text-xs text-[#6E6B68] pt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#E8734A] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
