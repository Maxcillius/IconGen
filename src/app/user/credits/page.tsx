'use client'

import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import AccountData from "@/types/accountData"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import Sidebar from "@/components/Sidebar"

export default function Credits() {

        const [user, setUser] = useState<AccountData>()
        const [isLoading, setIsLoading] = useState(!user)
    
        const getData = async () => {
            try {
                await fetch("/api/user/account", 
                    {
                        method: "GET",
                        headers: 
                        {
                            "Content-Type": "application/json"
                        }
                    }
                ).then(response => {
                    if(!response.ok) throw new Error(JSON.stringify(response.text))
                    return response.json()
                }).then(data => {
                    setUser({
                        credits: data.msg.credits,
                        uid: data.msg.uid
                    })
                })
                setIsLoading(false)
                
            } catch(Error) {
                console.log(Error)
                redirect("/")
            }
        }
    
        useEffect(() => {
            getData()
        }, [])

    return (
        <div className="min-h-screen bg-[#181d22] text-gray-200">
            <div className="h-16 w-full"></div>
            <div className="grid grid-cols-12 h-full min-h-screen">
                <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-[#0b1b20] shadow-xl p-6">
                <div className="flex items-center justify-center md:justify-start mb-8">
                    <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                </div>
                    <Sidebar/>
                </div>

                <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <div className="h-full p-6 md:p-12 lg:p-16 flex flex-col justify-start gap-8">
                    <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
                    <div key='credits' className="flex flex-col gap-3">
                        <label className="text-gray-400 font-medium text-lg capitalize">
                            Credits
                        </label>
                        
                        {isLoading ? (
                        <div className="h-14 bg-[#2d343b] rounded-xl animate-pulse" />
                        ) : (
                        <div className="bg-[#2d343b] py-4 px-5 rounded-xl border border-[#3d444c]">
                            <p className="text-lg font-medium">
                                {user?.credits}
                            </p>
                        </div>
                        )}
                    </div>
                    <Link 
                        href={"/pricing"}
                        className="bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-fit"
                        >
                            Buy Tokens
                        </Link>
                </div>
                </div>
            </div>
        </div>
    )
}