'use client';
import axiosInstance from "@/axiosInstance";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/axiosInstance";
export default function Component() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance.get("/user/mentors").then((res) => {
      console.log(res.data);
      const mentorUsers = res.data;
      setUsers(mentorUsers);
    });
  }, []);

  return (
    <div className="bg-white text-black py-16 px-6 md:px-12 lg:px-20">
      <h1 className="text-4xl font-bold mb-12 text-center">Meet Our Experienced Mentors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {users.map((user) => (
          <div key={user._id} className="bg-bg-gray-300 p-8 pt-2 rounded-lg shadow-lg overflow-hidden bg-mentor-back">
            <div className="flex items-center justify-center py-4">
              <Avatar className="w-32 h-32 border-2 border-gray-200">
                <AvatarImage src={user.image !== undefined ? (BACKEND_URL + "/files/" + user.image) : "/placeholder-user.jpg"} />
                <AvatarFallback>{user.name ? user.name[0] : ''}{user.surname ? user.surname[0] : ''}</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-2">
              <h3 className="text-2xl font-bold mb-3 text-center text-white">{user.name} {user.surname}</h3>
              <p className="text-base text-white mb-6 text-center">
                {user.descr}
              </p>
              <div className="flex justify-center">
                {user.calendly_link ? (
                  <Link
                    href={user.calendly_link}
                    className="inline-flex items-center justify-center px-5 py-3 bg-rose-500 rounded-md text-white font-medium hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a6a6a]"
                    prefetch={false}
                  >
                    Book a Mentor Session
                  </Link>
                ) : <></>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}
