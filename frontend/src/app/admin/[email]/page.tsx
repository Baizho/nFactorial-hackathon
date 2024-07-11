'use client'

import axiosInstance from '@/adminInstance'
import React, { useEffect, useState } from 'react'
import User from '@/context/AuthContext'

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
        <div>userApplication</div>
    )
}

export default userApplication