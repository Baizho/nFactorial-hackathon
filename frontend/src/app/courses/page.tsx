"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axiosInstance from "@/axiosInstance";
export interface ICourse {
  _id: string
  name: string;
  photo: string;
  text: string;
  video: string;
  isPrivate: boolean;
  descr: string;
  users: string[];
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [isMentor, setIsMentor] = useState(false);

  const fetchCourses = async () => {
    try {
      const userId = localStorage.getItem('impact-userId')
      const responseCourses = await axiosInstance.get("/courses");
      const responseUser = await axiosInstance.get(`/user/${userId}`);
      const dataCourses = responseCourses.data;
      const dataUser = responseUser.data;
      setIsMentor(dataUser[0].role === 'mentor')
      setCourses(dataCourses);
      setFilteredCourses(dataCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      setFilteredCourses([]);
    }
  };

  const deleteVideo = async (id: string) => {
    await axiosInstance.get(`/courses/delete/${id}`);
    fetchCourses();
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, courses]);

  return (
    <section className="w-full py-12">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Explore Our Course Catalog</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our extensive collection of online courses, designed to help you develop the skills and knowledge you
            need to succeed.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2 flex items-center gap-2 mb-5">
          <form className="flex gap-2 flex-1" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              placeholder="Search for a course"
              className="max-w-lg flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          {isMentor && (
            <Link href="/courses/create" className="!mt-0">
              <Button variant="outline" className="bg-green-500 text-white hover:bg-green-600">
                Add New Course
              </Button>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCourses.length >= 1 ? filteredCourses.map((course) => (
            <div key={course._id} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <img src={course.photo || "/placeholder.svg"} alt={course.name} width={300} height={200} className="object-cover w-full h-48" />
              <div className="p-4 bg-background h-full">
                <h3 className="text-xl font-bold">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.descr}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <Link href={`/courses/${course._id}`} prefetch={false}>
                      <Button size="sm">Enroll</Button>
                    </Link>
                    {isMentor && (
                      <Button onClick={()=>deleteVideo(course._id)} size="sm" variant="outline">Remove</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )) : <></>}
        </div>
      </div>
    </section>
  );
}
