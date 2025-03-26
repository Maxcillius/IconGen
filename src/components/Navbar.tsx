'use client'

import User from "./User"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { useDispatch } from "react-redux"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { SetStateAction, Dispatch } from "react"
import { Crown } from 'lucide-react';
import AuthPopup from "./Authpopup"
import { setPopupState } from "@/state/popup/popup"

export default function Navbar() {
    const [subspopup, setSubspopup] = useState(false)
    const popupVisibility: boolean = useSelector((state: RootState) => {
        return state.popup.value
    })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [plan, setPlan] = useState(false)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const section = usePathname().split('/')[1]
    // console.log(section)

    const setVisibility = useDispatch()

    const navItems = [
      { name: "Home", href: "/home", current: section === 'home' ? true : false },
      { name: "Pricing", href: "/pricing", current: section === 'pricing' ? true : false },
    ];

    const checkSession = async () => {
        try {
            await fetch("/api/user/profile", 
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            ).then(response => {
                if(!response.ok) throw new Error('Error')
                return response.json()
            }).then(data => {
                console.log(data)
                setName(data.msg.firstname)
                setEmail(data.msg.email)
            }).catch(error => {
                console.log(error)
            })

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // checkSession()
    }, [])

    return (
        <>
            <nav className="fixed bg-gradient-to-t from-[#22272e] to-[#112131] shadow-xl w-full z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                    
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 16H11V18H13V16Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM10 9H7V7H17V9H14V16H10V9Z" fill="currentColor" />
                        </svg>
                        </div>
                        <h1 className="text-[#BABABA] font-bold text-xl">ShopWave</h1>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex space-x-1">
                        {navItems.map((item) => (
                            <Link 
                            key={item.name}
                            href={item.href}
                            >
                            <span className={`py-2 px-6 rounded-lg transition-colors duration-200 text-[#BABABA] hover:text-white hover:bg-[#353535] ${
                                item.current ? 'text-white bg-[#353535]' : ''
                            }`}>
                                {item.name}
                            </span>
                            </Link>
                        ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        {name ? (
                        <Link href="/user/profile">
                            <span className="flex items-center hover:bg-[#353535] py-2 px-4 rounded-lg transition-colors duration-200">
                            <User name={name} email={email} plan={false} />
                            </span>
                        </Link>
                        ) : (
                        <div className="hidden sm:flex space-x-3">
                            <button
                            onClick={() => {setVisibility(setPopupState())}}
                            className="py-2 px-6 rounded-lg bg-[#46ACF5] hover:bg-[#4AB4FF] text-white font-medium shadow-sm transition-colors duration-200">
                            Sign up
                            </button>
                        </div>
                        )}

                        <div className="flex lg:hidden ml-4">
                        <button
                            type="button"
                            className="text-gray-300 hover:bg-[#353535] hover:text-white rounded-md p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#323232] shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                        >
                            <span className={`block py-3 px-4 rounded-md text-base font-medium transition-colors duration-200 ${
                            item.current ? 'bg-[#3d3d3d] text-white' : 'text-[#BABABA] hover:bg-[#3d3d3d] hover:text-white'
                            }`}>
                            {item.name}
                            </span>
                        </Link>
                        ))}
                        {name === "" && (
                        <div className="flex flex-col space-y-2 px-3 py-4 border-t border-[#444444]">
                            <button className="w-full py-2 px-4 rounded-lg bg-[#46ACF5] hover:bg-[#4AB4FF] text-white font-medium text-center shadow-sm transition-colors duration-200">
                            Log in
                            </button>
                        </div>
                        )}
                    </div>
                    </div>
                )}
            </nav>
            {   popupVisibility &&
                <AuthPopup/>
            }
            {
                subspopup &&
                <SubscriptionPopup close={setSubspopup}/>
            }
        </>
    )
}

function SubscriptionPopup({close}: {close: Dispatch<SetStateAction<boolean>>}) {
    return (
      <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="flex flex-row justify-center">
              <div className="bg-white w-96 p-8 rounded-3xl shadow-xl">
                  <div className="w-full flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-2 rounded-lg">
                              <Crown size={18} className="text-white" />
                          </div>
                          <h2 className="font-bold text-xl text-gray-800">Upgrade Your Experience</h2>
                      </div>
                      <button onClick={() => {
                        close(false)
                      }} className="text-gray-400 hover:text-gray-600">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="mb-6">
                      <p className="text-gray-600 mb-4">Unlock premium features and enhance your experience today!</p>
                      <div className="bg-gray-50 p-4 rounded-xl mb-4">
                          <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              Unlimited access to all content
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              Ad-free browsing experience
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              Exclusive member benefits
                          </li>
                          </ul>
                      </div>
                  </div>
                  <div className="w-full flex justify-between items-center">
                      <p className="text-gray-500 text-sm">Elevate your experience</p>
                      <Link href={"/pricing"}>
                          <button className="bg-gradient-to-r from-[#0077B6] to-[#4891E5] hover:from-[#226285] hover:to-[#367fd3] text-white py-2 px-6 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                              See Plans
                          </button>
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    )
  }