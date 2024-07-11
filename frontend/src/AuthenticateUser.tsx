'use client'

import { useEffect } from "react";
import { useUser } from "./context/AuthContext";


export default function AuthenticateUser({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { authenticateUser } = useUser();
    useEffect(() => {
        if (window === undefined) return;
        const userId = window.localStorage.getItem("impact-userId");
        if (userId !== null) {
            authenticateUser(userId);
        }
    }, [])
    return (
        <>{children}</>
    )
}
