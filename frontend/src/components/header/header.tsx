'use client'

import Link from 'next/link'
import React, { SVGProps } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import Image from 'next/image'

import { useUser } from '@/context/AuthContext'

type Props = {}

const Header = (props: Props) => {
    const { user } = useUser();
    return (
        <header className="bg-white text-black py-4 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_XCjvUbql2PGh76wU3T8WHu4FpzNDLssHw&s" alt="" className='ml-2 w-10' />
            </Link>
            <nav className="flex items-center gap-4">

        
                  
                {user.email ? (
                    <>
                        <Link href="/application" className="hover:text-rose-500" prefetch={false}>
                            Application
                        </Link>
                        <Link href="/profile" className="flex items-center gap-2" prefetch={false}>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline">{user.fullName}</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login"><Button variant="default">Логин</Button></Link>
                    </>
                )}
            </nav>
        </header>
    )
}


function BookOpenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    )
}

export default Header