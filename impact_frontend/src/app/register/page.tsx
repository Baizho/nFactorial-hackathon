'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/AuthContext"
import { FormEvent } from "react"

export default function Component() {
  const { registerUser } = useUser();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(e.currentTarget.email.value, e.currentTarget.usersname.value, e.currentTarget.surname.value, e.currentTarget.password.value)
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6  backdrop-blur-md rounded-lg shadow-lg ">
        <h1 className="mb-6 text-2xl font-bold text-center text-black">Register</h1>
        <form className="space-y-4" onSubmit={(e) => { handleSubmit(e) }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-black">
                Name
              </Label>
              <input
                id="name"
                name="usersname"
                type="text"
                placeholder="Enter your name"
                className="block w-full rounded-lg border-[1px] px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
              />
            </div>
            <div>
              <Label htmlFor="surname" className="text-black">
                Surname
              </Label>
              <input
                id="surname"
                name="surname"
                type="text"
                placeholder="Enter your surname"
                className="block w-full rounded-lg border-[1px]  px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border-[1px]  px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="block w-full rounded-lg border-[1px] px-4 py-3 text-black focus:border-[#5865f2] focus:ring-[#5865f2]"
            />
          </div>
          <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">Register</Button>
        </form>
      </div>
    </div>
  )
}