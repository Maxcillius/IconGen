'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import React from "react"
import Sidebar from "@/components/Sidebar"

export default function Images() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [icons, setIcons] = useState<{key: string, url: string}[]>([])

    useEffect(() => {
        const fetchIcons = async () => {
            await fetch("/api/icon/fetch", 
                {
                    method: "GET",
                    headers: 
                    {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                // console.log(data.contents)
                data.contents.map((obj: {key: string, url: string}) => {
                    setIcons((prev) => [
                        ...prev, {
                            key: obj.key,
                            url: obj.url
                        }
                    ])
                })
                setIsLoading(false)
            })
        }
        fetchIcons()
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
                            Images
                        </label>
                        
                        {isLoading ? (
                        <div className="h-14 bg-[#2d343b] rounded-xl animate-pulse" />
                        ) : (
                        <div className="bg-[#2d343b] gap-5 flex flex-row flex-wrap py-4 px-5 rounded-xl border border-[#3d444c]">
                            <IconList icons={icons} />
                        </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

function IconList ({ icons }: { icons: { key: string, url: string }[] }) {
    return (
        <>
            {icons.length > 0 ? (
                icons.map((obj) => (
                    <div key={obj.key}>
                        <Image src={obj.url} height={200} width={200} alt="icon" className="rounded-2xl"/>
                    </div>
                ))
            ) : (
                <div>No icons saved</div>
            )}
        </>
    );
};