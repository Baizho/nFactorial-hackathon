/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MnuqJJJdFy8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white text-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Potential with Impact Admission
                  </h1>
                  <p className="max-w-[600px] text-black md:text-xl">
                    Explore our comprehensive educational platform and let our AI-powered tools and expert mentors guide
                    you to success.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link
                    href="/courses"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-rose-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-red-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Browse Courses
                  </Link>
                  <Link
                    href="/mentors"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-rose-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-red-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Meet Our Mentors
                  </Link>
                </div>
              </div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbm9cdTgP8-_J6hsL5nxPFuKDnjvLyAOKrmQ&s"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-black">
                  AI-Powered Learning
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Personalized Learning with<span className="text-rose-500"> AI</span></h2>
                <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI assistant is here to help you every step of the way. From course recommendations to
                  personalized study plans, our AI-powered tools will ensure you reach your educational goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 text-white">
              <img
                src="https://miro.medium.com/v2/resize:fit:765/1*dMFfjuOs_Ufr5IKkj5pdww.jpeg"
                width="550"
                height="310"
                alt="AI Assistant"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-6 text-white">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Course Recommendations</h3>
                      <p className="text-white">
                        Our AI assistant analyzes your interests and learning style to recommend the perfect courses for
                        you.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Personalized Study Plans</h3>
                      <p className="text-white">
                        Get a custom-tailored study plan to help you stay on track and achieve your learning goals.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Real-Time Feedback</h3>
                      <p className="text-white">
                        Our AI assistant provides real-time feedback and guidance to help you improve and excel.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Connect with Expert Mentors</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects you with experienced mentors who can provide personalized guidance and support to
                help you achieve your educational goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="/mentors"
                className="inline-flex h-10 items-center justify-center rounded-md bg-rose-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-red-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Meet Our Mentors
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                  AI-Powered Assistance
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Your Personal AI Assistant
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl/relaxed">
                  Our AI assistant is here to help you every step of the way. From course recommendations to
                  personalized study plans, our AI-powered tools will ensure you reach your educational goals.
                </p>
                <Link
                  href="/gpt"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Meet the AI Assistant
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <img
                  src="https://i0.wp.com/nimbleapproach.com/wp-content/uploads/2023/01/illustration_of_AI_teaching_2.png?resize=473%2C473&ssl=1"
                  width="550"
                  height="400"
                  alt="AI Assistant"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-center sm:w-full lg:order-last"
                />
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
