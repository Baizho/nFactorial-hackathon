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
    <div className="flex flex-col min-h-[80dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-12 lg:py-24 xl:py-36 bg-white text-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Зарегистрируйся на nFactorial Incubator и наш ИИ оценит твою заявку
                  </h1>
                  <p className="max-w-[600px] text-black md:text-xl">

                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link
                    href="/courses"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#E01424] px-8 text-xl font-medium text-white shadow transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Регистрация
                  </Link>

                </div>
              </div>
              <img
                src="https://framerusercontent.com/images/PEGPoYALwircV2h5dsxs9Ud2p4.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        
      </main>
    </div>
  )
}
