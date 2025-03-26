'use client'

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileData from "@/types/profileData"
import { signOut } from "next-auth/react"
import Sidebar from "@/components/Sidebar"

export default function Profile() {

    const [user, setUser] = useState<ProfileData>()
    const [isLoading, setIsLoading] = useState(!user)
    const getData = async () => {
        try {
            await fetch("/api/user/profile", 
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
                    email: data.msg.email,
                    username: data.msg.username,
                    firstname: data.msg.firstname,
                    middlename: data.msg.middlename,
                    lastname: data.msg.lastname
                })
            })
            setIsLoading(false)
            
        } catch(Error) {
            redirect("/")
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out failed:', error);
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
                    <Sidebar />
                </div>

                <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <div className="h-full p-6 md:p-12 lg:p-16 flex flex-col justify-start gap-8">
                    <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

                    {['username', 'email', 'name'].map((field: string) => (
                    <div key={field} className="flex flex-col gap-3">
                        <label className="text-gray-400 font-medium text-lg capitalize">
                        {field}
                        </label>
                        
                        {isLoading ? (
                        <div className="h-14 bg-[#2d343b] rounded-xl animate-pulse" />
                        ) : (
                        <div className="bg-[#2d343b] py-4 px-5 rounded-xl border border-[#3d444c]">
                            {field === 'name' ? (
                            <p className="text-lg font-medium">
                                {user?.firstname || ''} {user?.middlename || ''} {user?.lastname || ''}
                            </p>
                            ) : (
                                <p className="text-lg font-medium">{''}</p>
                            // <p className="text-lg font-medium">{user?.[field] || ''}</p>
                            )}
                        </div>
                        )}
                    </div>
                    ))}

                    <div className="flex flex-wrap gap-4 mt-6">
                    {isLoading ? (
                        <div className="h-14 w-32 bg-[#2d343b] rounded-xl animate-pulse" />
                    ) : (
                        <>
                        <button 
                            onClick={handleSignOut}
                            className="bg-red-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Log Out
                        </button>
                        <button 
                            className="bg-[#2d343b] text-gray-200 font-medium py-3 px-6 rounded-xl hover:bg-[#363d45] transition-colors duration-200 border border-[#3d444c]"
                        >
                            Edit Profile
                        </button>
                        </>
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}