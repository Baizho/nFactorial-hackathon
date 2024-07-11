'use client'

import axiosInstance from '@/adminInstance'
import React, { useEffect, useState } from 'react'
import User from '@/context/AuthContext'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Props = {
    params: {
        email: string,
    }
}

const userApplication = (props: Props) => {
    const email = props.params.email.replace("%40", "@");
    const [user, setUser] = useState<User | undefined>();
    console.log(email);
    useEffect(() => {
        const getData = async () => {
            const res = await axiosInstance.post("/userByEmail", {
                email: email
            });
            const user = res.data;
            console.log(user);
            setUser(user);
        }
        getData();
    }, []);

    if (!user) {
        return <div className='text-center'>Your application is loading</div>
    }
    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-4 md:px-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-muted-foreground">john@example.com</p>
                </div>
            </div>
            <Separator className="my-6" />
            <div className="grid md:grid-cols-2 gap-8">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Contact Information</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-5 h-5" />
                                <span>+1 (123) 456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TextIcon className="w-5 h-5" />
                                <Link href="#" className="hover:underline" prefetch={false}>
                                    @johndoe
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkedinIcon className="w-5 h-5" />
                                <Link href="#" className="hover:underline" prefetch={false}>
                                    linkedin.com/in/johndoe
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <GitlabIcon className="w-5 h-5" />
                                <Link href="#" className="hover:underline" prefetch={false}>
                                    github.com/johndoe
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Educational Background</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div>
                                <span className="font-medium">University of Example</span>
                                <span> - Computer Science</span>
                            </div>
                            <div>
                                <span className="font-medium">Graduated: </span>
                                <span>May 2020</span>
                            </div>
                            <div>
                                <span className="font-medium">Job Placement: </span>
                                <span>Software Engineer</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Programming Skills &amp; Experience</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div>
                                <span className="font-medium">Skill Level: </span>
                                <span>Advanced</span>
                            </div>
                            <div>
                                <span className="font-medium">Experience: </span>
                                <span>3+ years</span>
                            </div>
                            <div>
                                <span className="font-medium">Past Projects: </span>
                                <span>
                                    Developed a web application for a local business, built a mobile app for a non-profit organization,
                                    and contributed to an open-source project.
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Best Achievements: </span>
                                <span>
                                    Received a performance award at my previous job, and had one of my open-source contributions merged
                                    into the main repository.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Interests &amp; Ideas</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div>
                                <span className="font-medium">Ideas: </span>
                                <span>
                                    I'm interested in developing AI-powered tools to help streamline business processes and improve
                                    productivity.
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Favorite AI: </span>
                                <span>ChatGPT</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Availability</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div>
                                <span className="font-medium">Willing to Participate: </span>
                                <span>Yes, on a paid basis</span>
                            </div>
                            <div>
                                <span className="font-medium">Availability in Almaty: </span>
                                <span>Yes</span>
                            </div>
                            <div>
                                <span className="font-medium">Need for Accommodation: </span>
                                <span>Yes</span>
                            </div>
                            <div>
                                <span className="font-medium">Representative Groups: </span>
                                <span>None</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Additional Information</h2>
                        <div className="grid gap-2 text-muted-foreground">
                            <div>
                                <span className="font-medium">Approval Status: </span>
                                <span>Approved</span>
                            </div>
                            <div>
                                <span className="font-medium">Comments: </span>
                                <span>
                                    John has a strong technical background and a keen interest in AI. We believe he would be a valuable
                                    addition to the team.
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Feedback from Mentor: </span>
                                <span>
                                    John has demonstrated excellent problem-solving skills and a willingness to learn. I'm confident he
                                    will be a great contributor to the project.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Tasks</h2>
                        <div className="grid gap-4 text-muted-foreground">
                            <div>
                                <span className="font-medium">Task 1: </span>
                                <span>Develop a prototype for an AI-powered business process automation tool.</span>
                                <p>
                                    John's response: I've developed a prototype for an AI-powered business process automation tool that
                                    can help streamline common business tasks like invoice processing, employee onboarding, and customer
                                    support. The tool uses natural language processing and machine learning to automate repetitive tasks,
                                    freeing up employees to focus on more strategic work.
                                </p>
                            </div>
                            <div>
                                <span className="font-medium">Task 2: </span>
                                <span>Analyze the potential impact of AI on the future of work.</span>
                                <p>
                                    John's response: AI will have a significant impact on the future of work, both in terms of job
                                    displacement and the creation of new job opportunities. While AI will automate many routine tasks, it
                                    will also enable the development of new products and services that will create new jobs. The key will
                                    be to ensure that workers are equipped with the necessary skills to adapt to the changing job market.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4">
                <h2 className="text-lg font-semibold">CV</h2>
                <div className="flex items-center gap-4">
                    <FileIcon className="w-6 h-6" />
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Download John's CV
                    </Link>
                </div>
            </div>
        </div>
    )
}

function FileIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}


function GitlabIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
        </svg>
    )
}


function LinkedinIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}


function PhoneIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}


function TextIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    )
}


function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}