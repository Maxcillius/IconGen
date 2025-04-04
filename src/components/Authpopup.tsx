"use client"

import { useState } from "react"
import Image from "next/image"
import { setPopupState } from "../state/popup/popup"
import { useDispatch } from "react-redux"
import cross from "@/images/cross.png"
import { auth } from "@/utils/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { redirect } from "next/navigation"
import useGetUserInfo from "@/app/hooks/updateUser"


export default function AuthPopup() {

    const [signup, setSignup] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alert, setAlert] = useState("")
    const setVisibility = useDispatch()
    const [process, setProcess] = useState(false)
    const [showSignupPassword, setShowSignupPassword] = useState(false)
    const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)
    const [showSigninPassword, setShowSigninPassword] = useState(false)
    const [getUserInfo, getUserIcons] = useGetUserInfo()

    const signupCall = async () => {
        if(confirmPassword !== password) {
            setAlert("Entered password didn't match each other")
            return
        }
        try {
            setProcess(true)
            const response = await fetch("/api/auth/signup", 
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: { "Content-Type": "application/json" }
                }
            )
            const data = await response.json()
            if(data.success === 0) {
                setAlert(data.msg)
                setProcess(false)
                return
            }
            getUserInfo()
            getUserIcons()
            setVisibility(setPopupState())
            setProcess(false)
        } catch(error) {
            setProcess(false)
        }
    }

    const signinCall = async () => {
        try {
            setProcess(true)
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: { "Content-Type": "application/json" }
            })

            const data = await response.json()
            if(data.success === 0) {
                setAlert(data.msg)
                setProcess(false)
                return
            }
            getUserInfo()
            getUserIcons()
            setVisibility(setPopupState())
            setProcess(false)
        } catch(error) {
            setProcess(false)
        }
    }

    const googleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider).then(async (userCredential) => {
                const credential = GoogleAuthProvider.credentialFromResult(userCredential)
                if(credential) {
                    await fetch("/api/test", 
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: userCredential.user.email,
                                uid: userCredential.user.uid,
                                accessToken: credential.accessToken,
                                refreshToken: userCredential.user.refreshToken
                            }),
                            headers: { "Content-Type": "application/json" }
                        }
                    ).then((response) => {
                        if(!response.ok) {
                            throw new Error("Network response was not ok")
                        }
                        return response.json()
                    }).then((data) => {
                        console.log(data)
                    })
                }
                redirect("/home")
            })
        } catch(Error) {
            console.log(Error)
        }
    }

return (
    <>
    {signup && (
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
                    <h1 className="text-center text-black font-bold text-xl sm:text-2xl pb-4 sm:pb-6">Sign Up to X</h1>
                    
                    {/* Alert */}
                    {alert && (
                        <div className="flex flex-row justify-center text-red-600 mb-4">
                            {alert}
                        </div>
                    )}   
                    
                    {/* Form */}
                    <div className="flex flex-col justify-center gap-3 sm:gap-4 py-2 sm:py-4">
                        <input 
                        onChange={(e) => {setEmail(e.target.value)}} 
                        type="text" 
                        placeholder="Email" 
                        className="py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                        />

                        <div className="relative">
                            <input 
                                onChange={(e) => {setPassword(e.target.value)}} 
                                type={showSignupPassword ? "text" : "password"} 
                                placeholder="Password" 
                                className="py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all w-full"
                            />
                            {showSignupPassword ? 
                                <svg onClick={() => {setShowSignupPassword(!showSignupPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            :
                                <svg onClick={() => {setShowSignupPassword(!showSignupPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
                            }
                        </div>
                        <div className="relative">
                            <input 
                                onChange={(e) => {setConfirmPassword(e.target.value)}} 
                                type={showSignupConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm Password" 
                                className="py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all w-full"
                            />
                            {showSignupConfirmPassword ? 
                                <svg onClick={() => {setShowSignupConfirmPassword(!showSignupConfirmPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            :
                                <svg onClick={() => {setShowSignupConfirmPassword(!showSignupConfirmPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
                            }
                        </div>
                    </div>
                    
                    {/* Signup Button */}
                    <button 
                    onClick={() => {signupCall()}} 
                    className="text-white font-bold bg-[#6F80EE] w-full rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 text-sm mb-4 sm:mb-6 mt-3 sm:mt-4 hover:bg-[#7586f7] transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                    <div className="flex flex-row justify-center">
                        {process && <div className="w-5 h-5 mr-2 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>}
                        Sign up
                    </div>
                    </button>
                    
                    {/* Divider */}
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-center text-gray-500 text-xs sm:text-sm">or sign up with</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    
                    {/* Google Button */}
                    <button onClick={() => {googleAuth()}} className="text-gray-700 bg-white border border-gray-300 font-medium w-full rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 text-sm mb-6 sm:mb-10 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <div className="w-5 h-5">
                            <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                        </div>
                        <span>Sign up with Google</span>
                    </button>
                    
                    {/* Footer */}
                    <div className="flex flex-row justify-center gap-2">
                        <p className="text-xs sm:text-sm text-gray-600">Already have an account?</p>
                        <button 
                            onClick={() => {
                            setEmail("")
                            setPassword("")
                            setConfirmPassword("")
                            setSignup(!signup)
                            }} 
                            className="text-[#5809F6] text-xs sm:text-sm font-semibold hover:text-[#6c24fd] transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )}
    
        {!signup && (
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
                        
                        {/* Form */}
                        <div className="flex flex-col justify-center gap-3 sm:gap-4 py-2 sm:py-4">
                        <input 
                            onChange={(e) => {setEmail(e.target.value)}} 
                            type="text" 
                            placeholder="Email" 
                            className="py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <div className="relative">
                            <input 
                                onChange={(e) => {setPassword(e.target.value)}} 
                                type={showSigninPassword ? "text" : "password"} 
                                placeholder="Password" 
                                className="py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all w-full"
                            />
                            {showSigninPassword ? 
                                <svg onClick={() => {setShowSigninPassword(!showSigninPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            :
                                <svg onClick={() => {setShowSigninPassword(!showSigninPassword)}} className="hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#5e5c64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
                            }
                        </div>
                        </div>
                        
                        {/* Signin Button */}
                        <button 
                        onClick={() => {signinCall()}} 
                        className="text-white font-bold bg-[#6F80EE] w-full rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 text-sm mb-4 sm:mb-6 mt-3 sm:mt-4 hover:bg-[#7586f7] transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                        <div className="flex flex-row justify-center">
                            {process && <div className="w-5 h-5 mr-2 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>}
                            Sign in
                        </div>
                        </button>
                        
                        {/* Divider */}
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                            <span className="mx-4 text-center text-gray-500 text-xs sm:text-sm">or sign in with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                        
                        {/* Google Button */}
                        <button 
                            onClick={() => {googleAuth()}} 
                            className="text-gray-700 bg-white border border-gray-300 font-medium w-full rounded-2xl sm:rounded-3xl py-3 sm:py-4 px-4 text-sm mb-6 sm:mb-10 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <div className="w-5 h-5">
                                <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                            </div>
                            <span>Sign in with Google</span>
                        </button>
                        
                        {/* Footer */}
                        <div className="flex flex-row justify-center gap-2">
                            <p className="text-xs sm:text-sm text-gray-600">Don't have an account?</p>
                            <button 
                                onClick={() => {
                                setEmail("")
                                setPassword("")
                                setSignup(!signup)
                                }} 
                                className="text-[#5809F6] text-xs sm:text-sm font-semibold hover:text-[#6c24fd] transition-colors"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
    </>
    );
}