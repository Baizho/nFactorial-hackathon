'use client'

import { useUser } from "@/context/AuthContext"
import { FormEvent } from "react";


export default function Component() {
  const { loginUser } = useUser();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(e.currentTarget.email.value, e.currentTarget.password.value)
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 border-[1px] backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-black">Login</h1>
        <form className="space-y-4" onSubmit={(e) => { handleSubmit(e) }}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full border-gray-300 rounded-lg border-[1px] border-gray-400 px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full border-gray-300 rounded-lg border-[1px] border-gray-400  px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-rose-500 hover:bg-rose-600 px-4 py-3 text-center text-white  focus:ring-4 focus:ring-[#5865f2]/50"
          >
            Login
          </button>
        </form>
      </div>
    </div >
  )
}