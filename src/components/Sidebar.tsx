'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
    const path = usePathname()
    const [section, setSection] = useState(path.split('/').at(-1))
    return (
        <div>
            <nav>
                <ul className="flex flex-col gap-3">    
                    {['profile', 'images', 'credits', 'billing'].map((item) => (
                        <li key={item}>
                        <Link 
                            href={`/user/${item}`} 
                            className={`flex items-center p-3 ${
                            section === item 
                                ? "bg-[#3a3a3a] text-white font-bold" 
                                : "text-gray-400 hover:bg-[#353535]"
                            } rounded-xl transition-colors duration-200`}
                        >
                            <span className="capitalize pl-2 text-lg">{item}</span>
                        </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}