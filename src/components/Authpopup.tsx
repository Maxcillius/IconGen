"use client"

import { useState } from "react"
import Image from "next/image"
import { setPopupState } from "../state/popup/popup"
import { useDispatch } from "react-redux"
import cross from "@/images/cross.png"
import { auth } from "@/utils/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { redirect } from "next/navigation"

export default function AuthPopup() {

    const [signup, setSignup] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alert, setAlert] = useState("")
    const setVisibility = useDispatch()

    const signupCall = async () => {
        if(confirmPassword !== password) {
            setAlert("Entered password didn't match each other")
            return
        }
        try {
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
            if (!response.ok) {
                console.error("Response not OK:", response.status, response.statusText);
                throw new Error("Network response was not ok");
            }
            const data = await response.json()
            if (data.success === 0) {
                setAlert(data.msg)
                return
            }
            setVisibility(setPopupState())
        } catch(Error) {
            console.log(Error)
        }
    }

    const signinCall = async () => {
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: { "Content-Type": "application/json" }
            })
            if (!response.ok) {
                console.error("Response not OK:", response.status, response.statusText);
                throw new Error("Network response was not ok");
            }
            const data = await response.json()
            if (data.success === 0) {
                setAlert(data.msg)
                return
            }
            setVisibility(setPopupState())
        } catch(Error) {
            console.log(Error)
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
            <div className="fixed w-full h-full flex items-center justify-center z-40">
                <div className="flex flex-col max-w-md w-full">
                    <div className="bg-white w-full p-10 rounded-3xl shadow-xl">
                        {/* Header */}
                        <div className="flex justify-end mb-6">
                            <div className="w-6 h-6 hover:cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors">
                                <Image onClick={() => {setVisibility(setPopupState())}} src={cross} alt="close" />
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-center text-black font-bold text-2xl pb-6">Sign Up to X</h1>
                        
                        {/* Alert */}
                        {alert && (
                        <div className="flex flex-row justify-center text-red-600 mb-4">
                            {alert}
                        </div>
                        )}
                        
                        {/* Form */}
                        <div className="flex flex-col justify-center gap-4 py-4">
                            <input 
                                onChange={(e) => {setEmail(e.target.value)}} 
                                type="text" 
                                placeholder="Email" 
                                className="py-4 px-6 rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            <input 
                                onChange={(e) => {setPassword(e.target.value)}} 
                                type="password" 
                                placeholder="Password" 
                                className="py-4 px-6 rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            <input 
                                onChange={(e) => {setConfirmPassword(e.target.value)}} 
                                type="password" 
                                placeholder="Confirm Password" 
                                className="py-4 px-6 rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        
                        {/* Signup Button */}
                        <button 
                        onClick={() => {signupCall()}} 
                        className="text-white font-bold bg-[#6F80EE] w-full rounded-3xl p-4 text-sm mb-6 mt-4 hover:bg-[#7586f7] transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                        Sign up
                        </button>
                        
                        {/* Divider */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="mx-4 text-center text-gray-500 text-sm">or sign up with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                        
                        {/* Google Button */}
                        <button onClick={() => {googleAuth()}} className="text-gray-700 bg-white border border-gray-300 font-medium w-full rounded-3xl p-4 text-sm mb-10 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <span>Google</span>
                        </button>
                        
                        {/* Footer */}
                        <div className="flex flex-row justify-center gap-2">
                            <p className="text-sm text-gray-600">Already have an account?</p>
                            <button 
                                onClick={() => {
                                setEmail("")
                                setPassword("")
                                setConfirmPassword("")
                                setSignup(!signup)
                                }} 
                                className="text-[#5809F6] text-sm font-semibold hover:text-[#6c24fd] transition-colors"
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
                <div className="fixed w-full h-full flex items-center justify-center z-40">
                    <div className="flex flex-col max-w-md w-full">
                        <div className="bg-white w-full p-10 rounded-3xl shadow-xl">
                            {/* Header */}
                            <div className="flex justify-end mb-6">
                                <div className="w-6 h-6 hover:cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors">
                                    <Image onClick={() => {setVisibility(setPopupState())}} src={cross} alt="close" />
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-center text-black font-bold text-2xl pb-6">Sign In to X</h1>
                            
                            {/* Form */}
                            <div className="flex flex-col justify-center gap-4 py-4">
                            <input 
                                onChange={(e) => {setEmail(e.target.value)}} 
                                type="text" 
                                placeholder="Email" 
                                className="py-4 px-6 rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            <input 
                                onChange={(e) => {setPassword(e.target.value)}} 
                                type="password" 
                                placeholder="Password" 
                                className="py-4 px-6 rounded-3xl border-2 border-gray-100 bg-gray-50 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            </div>
                            
                            {/* Signin Button */}
                            <button 
                            onClick={() => {signinCall()}} 
                            className="text-white font-bold bg-[#6F80EE] w-full rounded-3xl p-4 text-sm mb-6 mt-4 hover:bg-[#7586f7] transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                            Sign in
                            </button>
                            
                            {/* Divider */}
                            <div className="flex items-center justify-center mb-6">
                            <div className="flex-grow border-t border-gray-200"></div>
                                <span className="mx-4 text-center text-gray-500 text-sm">or sign in with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                            
                            {/* Google Button */}
                            <button onClick={() => {googleAuth()}} className="text-gray-700 bg-white border border-gray-300 font-medium w-full rounded-3xl p-4 text-sm mb-10 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <span>Google</span>
                            </button>
                            
                            {/* Footer */}
                            <div className="flex flex-row justify-center gap-2">
                                <p className="text-sm text-gray-600">Don"t have an account?</p>
                                <button 
                                    onClick={() => {
                                    setEmail("")
                                    setPassword("")
                                    setSignup(!signup)
                                    }} 
                                    className="text-[#5809F6] text-sm font-semibold hover:text-[#6c24fd] transition-colors"
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
    )
}