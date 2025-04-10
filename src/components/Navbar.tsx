"use client"

import User from "./User"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import AuthPopup from "./Authpopup"
import { setPopupState } from "@/state/popup/popup"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const popupVisibility: boolean = useSelector((state: RootState) => {
        return state.popup.value
    })

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const section = usePathname().split("/")[1]

    const setVisibility = useDispatch()

    const navItems = [
      { name: "Profile", href: "/user/profile", current: section === "user" ? true : false },
      { name: "Home", href: "/home", current: section === "home" ? true : false },
      { name: "Tokens", href: "/token", current: section === "token" ? true : false },
      // { name: "Features", href: "/features", current: section === "features" ? true : false },
      // { name: "Pricing", href: "/pricing", current: section === "pricing" ? true : false },
    ]

    const {data: session, status} = useSession()

    return (
        <>
          <nav className="fixed w-full z-50">
            <div className="absolute inset-0 bg-[#04070a] backdrop-blur-md border-b border-[#1F2937] shadow-2xl"></div>
            <div className="relative">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                  {/* Logo Section */}
                  <Link href={"/"} onClick={() => {setMobileMenuOpen(false)}} className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 16H11V18H13V16Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM10 9H7V7H17V9H14V16H10V9Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-col hidden lg:block">
                      <h1 className="text-white font-bold text-xl tracking-tight">IconGen</h1>
                      <span className="text-[#4B5563] text-xs font-medium">AI Icon Generator</span>
                    </div>
                  </Link>
    
                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {navItems.map((item) => (
                        item.name !== "Profile" &&
                        <Link 
                          key={item.name}
                          href={item.href}
                        >
                          <span className={`relative py-2 px-6 rounded-xl transition-all duration-300 text-gray-400 hover:text-white group ${
                            item.current ? "text-white" : ""
                          }`}>
                            <span className="relative z-10">{item.name}</span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              item.current ? "opacity-100" : ""
                            }`}></div>
                            {item.current && (
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
    
                  {/* User Section */}
                  <div className="flex items-center space-x-4">
                      { status === "authenticated" &&
                        <Link href="/user/profile" className="md:block hidden">
                          <span className="flex items-center px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#2D3B4F] transition-all duration-300 group">
                            <User name={session.user!.name!} email={session.user!.email!}/>
                          </span>
                        </Link>
                      }
                      {
                        (status === "loading" || status == "unauthenticated") &&
                      <div className="hidden sm:flex items-center space-x-3">
                        <button
                          onClick={() => setVisibility(setPopupState())}
                          className="py-2 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                        >
                          Sign up
                        </button>
                      </div>
                    }
    
                    {/* Mobile Menu Button */}
                      { !session &&
                        <div className="flex lg:hidden">
                          <button
                            type="button"
                            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1E293B] transition-all duration-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                          >
                            {mobileMenuOpen ? (
                              <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      }
                      { session &&
                        <div className="flex lg:hidden">
                          <button
                            type="button"
                            className="lg:p-2 p-1 rounded-full lg:rounded-xl text-gray-400 hover:text-white lg:hover:bg-[#1E293B] transition-all duration-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                          >
                            <div className="md:hidden block">
                              <span className="flex items-center lg:px-4 lg:py-2 p-1 rounded-full lg:rounded-xl bg-[#1E293B] hover:bg-[#2D3B4F] transition-all duration-300 group">
                                <User name={session.user!.name!} email={session.user!.email!}/>
                              </span>
                            </div>
                          </button>
                        </div>
                      }
                  </div>
                </div>
              </div>
    
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden absolute w-full bg-[#111827] border-b border-[#1F2937] shadow-2xl">
                  <div className="px-4 py-3 space-y-1">
                    {navItems.map((item) => {
                      if(!session && item.name === "Profile") {
                        return null
                      } else {
                        return (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => {setMobileMenuOpen(false)}}
                          >
                            <span className={`block py-3 px-4 rounded-xl text-xs lg:text-base font-medium transition-all duration-300 ${
                              item.current 
                                ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-white" 
                                : "text-gray-400 hover:text-white hover:bg-[#1E293B]"
                            }`}>
                              {item.name}
                            </span>
                          </Link>
                        )
                      }
                    })}
                    {!session && (
                      <div className="flex flex-col space-y-2 py-4 mt-2 border-t border-[#1F2937]">
                        <button onClick={() => {
                          setVisibility(setPopupState())
                        }}
                         className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20">
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
          {popupVisibility && <AuthPopup />}
        </>
      );
    }