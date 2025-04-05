"use client"

import { useState } from "react"
import Image from "next/image"
import { setPopupState } from "../state/popup/popup"
import { useDispatch } from "react-redux"
import cross from "@/images/cross.png"
import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"


export default function AuthPopup() {

    const [alert, setAlert] = useState("")
    const setVisibility = useDispatch()
    const [process, setProcess] = useState(false)
    // const [getUserInfo, getUserIcons] = useGetUserInfo()

    const googleAuth = async () => {
        try {
            setProcess(true)
            signIn('google')
            setVisibility(setPopupState())
            redirect("/home")
        } catch(Error) {
            console.log(Error)
            setProcess(false)
        }
    }

return (
    <>
            <>
            <div className="fixed w-screen h-screen bg-black bg-opacity-60 z-30"></div>
            <div className="fixed w-full h-full flex items-center justify-center z-40 px-4">
                <div className="flex flex-col w-full max-w-md">
                    <div className="bg-white w-full p-6 sm:p-10 rounded-3xl shadow-xl">
                        {/* Header */}
                        <div className="flex justify-end mb-4 sm:mb-6">
                            <div className="w-6 h-6 hover:cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors">
                                <Image onClick={() => {setVisibility(setPopupState())}} src={cross} alt="close" />
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-center text-black font-bold text-xl sm:text-2xl pb-4 sm:pb-6">Sign In to X</h1>

                        {/* Alert */}
                        {alert && (
                            <div className="flex flex-row justify-center text-red-600 mb-4">
                                {alert}
                            </div>
                        )}   
                        <button 
                            onClick={() => {googleAuth()}} 
                            className="text-gray-700 bg-white border border-gray-300 font-medium w-full rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 text-sm mb-6 sm:mb-10 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            {process && <div className="w-5 h-5 mr-2 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>}
                            <div className="w-5 h-5">
                                <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                            </div>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>
            </div>
            </>
        {/* )} */}
    </>
    );
}