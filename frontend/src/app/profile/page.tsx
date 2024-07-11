'use client';


import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, JSX, SetStateAction, SVGProps, useRef, useState } from "react"
import { useUser } from '@/context/AuthContext'
import axiosInstance, { BACKEND_URL } from "@/axiosInstance";

export default function Component() {
  const { user, setUser, LogoutUser } = useUser();
  console.log(user);
  const [file, setFile] = useState<Blob | string>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  // const imgRef = useRef(user.image);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.usersname.value;
    const surname = e.currentTarget.surname.value;
    const description = e.currentTarget.description.value;
    const calendly = e.currentTarget.calendly.value;
    if (file !== undefined) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axiosInstance.post("/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // imgRef.current = res.data.url;
      } catch (err) {
        console.log("error sending image", err);
      }
    }

    try {
      const res = await axiosInstance.post("/user/update", {
        name: name,
        surname: surname,
        descr: description,
        calendly_link: calendly,
        // image: imgRef.current,
      });
      setUser(res.data);
    } catch (err) {
      console.log("error updaing user", err);
    }
    setFile(undefined);
  }

  return (

    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Card className="bg-white text-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-[1px] border-gray-300">
                  <AvatarImage src={"/placeholder-user.jpg"} />
                </Avatar>
                <div className="grid gap-1">
                  <div className="text-xl font-bold text-black">{user.fullName}</div>
                  <div className="text-sm text-black">{user.email}</div>
                </div>
              </div>
            </CardHeader>

            <CardFooter>
              <Button onClick={LogoutUser} className="bg-rose-500 text-white hover:bg-red-300 hover:text-white">Logout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CalendarDaysIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}