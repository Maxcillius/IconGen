'use client'

import { dall2, dall3 } from "../../interfaces/dimensions"
import { useState } from "react"
import Image from "next/image"
import Styles from "../../components/Styles"
import Popup from "../../components/Authpopup"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useDispatch } from "react-redux"
import { Download, Save } from 'lucide-react'
import lock from "@/images/lock.png"
import brain from "@/images/image.jpg"

export default function Homepage() {
    const [quality, setQuality] = useState("standard")
    const [dimension, setDimension] = useState("small")
    const [prompt, setPrompt] = useState("")
    const [error, setError] = useState("")
    const [imageLink, setimageLink] = useState("")
    const [saved, setSaved] = useState(false)
    const [subspopup, setSubspopup] = useState(false)
    const styleContent: string = useSelector((state: RootState) => {
        return state.style.value
    })
    const subscription: number = useSelector((state: RootState) => {
        return state.subscription.value
    })
    const generateIcon = async () => {
        if(prompt == "") {
            setError("Prompt can't be empty")
            return
        }
        // console.log(styleContent)
        // try {
        //     await fetch("/api/icon/generate", 
        //         {
        //             method: "POST",
        //             body: JSON.stringify({
        //                 prompt: prompt,
        //                 mode: styleContent,
        //                 model: "dall-e-2",
        //                 quality: quality,
        //                 size: dall2[dimension],
        //                 style: "natural",
        //             })
        //         }
        //     ).then(response => {
        //         return response.json()
        //     }).then(data => {
        //         setimageLink(data.Images.data[0].url)
        //     })
        // } catch(error) {
        //     if (error instanceof Error) {
        //         setError(error.message)
        //     } else {
        //         console.log(error)
        //     }
        // }
    }
    const handleSave = async (imageLink: string) => {
        if(!saved) {
            try {
                await fetch("/api/icon/save", 
                    {
                        method: "POST",
                        body: JSON.stringify({
                            url: imageLink
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).then((res) => {
                    return res.json()
                }).then(data => {
                    if(!data.success) {
                        throw new Error(JSON.stringify(data.msg))
                    } else {
                        setSaved(true)
                    }
                })
            } catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <div className="h-16 w-full"></div>
            <section>
                <div className="bg-gradient-to-b from-[#1A1E23] to-[#0F2133] min-h-screen w-full">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64">
                        <div className="rounded-xl bg-[#0F1926] shadow-lg shadow-black/30 border border-[#1D3348] h-full">
                        <div className="flex items-center justify-center p-4 rounded-t-xl bg-[#162435]">
                            <h5 className="text-white font-semibold tracking-wide">Style Library</h5>
                        </div>
                        <div className="h-[calc(90vh-8rem)] mx-4 my-3 rounded-lg bg-[#1B263B] overflow-y-auto">
                            <Styles />
                        </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <h1 className="text-3xl md:text-4xl text-white font-poppins font-bold">Icon Generator</h1>
                            <span className="ml-3 px-3 py-1 bg-blue-500 text-xs text-white rounded-full">PRO</span>
                        </div>
                        </div>

                        {/* Error Message */}
                        {error != "" && (
                        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
                            <div className="text-red-400 font-medium flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                            </svg>
                            {error}
                            </div>
                        </div>
                        )}

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Icon Preview */}
                        <div className="lg:col-span-2 bg-[#0B1724] rounded-2xl border border-[#1D3348] shadow-lg shadow-black/20">
                            <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-white text-xl font-medium">Preview</h2>
                                <div className="flex gap-2">
                                <button 
                                    onClick={() => {
                                    if(imageLink) handleSave(imageLink)
                                    }}
                                    className={`p-2 rounded-lg hover:cursor-pointer transition-all duration-200 ${saved ? "bg-[#204558]" : "bg-[#005887] hover:bg-[#0077B6]"}`}
                                    title="Save current icon"
                                >
                                    <Save size={18} className="text-white" />
                                </button>
                                <button 
                                    onClick={() => {
                                    if(imageLink) window.open(imageLink, '_blank')
                                    }}
                                    className="p-2 bg-[#005887] hover:bg-[#0077B6] rounded-lg hover:cursor-pointer transition-all duration-200"
                                    title="Download icon"
                                >
                                    <Download size={18} className="text-white" />
                                </button>
                                </div>
                            </div>
                            <div className="bg-[#111E2D] rounded-xl border border-[#262F3D] p-4 flex items-center justify-center">
                                <div className="w-64 h-64 bg-slate-700 rounded-full p-2 shadow-xl shadow-black/40">
                                <Image 
                                    src={imageLink ? imageLink : brain} 
                                    alt="Generated icon preview"
                                    width={512}
                                    height={512}
                                    className="rounded-full w-full h-full object-cover"
                                />
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Settings Panel */}
                        <div className="bg-[#0B1724] rounded-2xl border border-[#1D3348] shadow-lg shadow-black/20">
                            <div className="p-6">
                            <h2 className="text-white text-xl font-medium mb-4">Settings</h2>
                            <div className="space-y-6">
                                {/* Quality Setting */}
                                <div>
                                <p className="text-white text-sm font-medium mb-2">Quality</p>
                                <div className="flex bg-[#1B263B] rounded-lg p-1 relative">
                                    <p
                                    onClick={() => {setQuality("standard")}}
                                    className={`text-center py-2 px-4 rounded-md hover:bg-[#0077B6] cursor-pointer text-white w-full font-medium transition-colors ${quality === "standard" ? "bg-[#0077B6]" : ""}`}>
                                        Standard
                                    </p>
                                    <div onClick={() => {
                                        if(subscription > 0) { setQuality("hd") }
                                        else {
                                            setSubspopup(true)
                                        }
                                    }} className={`group relative w-full rounded-md ${ subscription > 0 ? "hover:bg-[#0077B6]" : ""}`}>
                                        <p
                                            className={`${ subscription < 1 ? "group-hover:opacity-50" : ""} text-center py-2 px-3 rounded-md cursor-pointer text-white w-full font-medium transition-colors ${dimension === "large" ? "bg-[#0077B6]" : ""}`}>
                                            Medium
                                        </p>
                                        {subscription < 1 && (
                                            <div className={`absolute left-16 top-1/2 transform -translate-y-1/2 hover:cursor-pointer opacity-0 ${ subscription <= 1 ? "group-hover:opacity-100" : ""}`}>
                                                <Image src={lock} height={15} width={15} alt="lock" className="h-auto" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </div>

                                {/* Dimension Setting */}
                                <div>
                                <p className="text-white text-sm font-medium mb-2">Dimension</p>
                                <div className="flex bg-[#1B263B] rounded-lg p-1">
                                    {/* Small button */}
                                    <div className="relative w-full">
                                    <p
                                        onClick={() => {
                                        if(subscription > 0) { setDimension("small") }
                                        else {
                                            setSubspopup(true)
                                        }
                                        }}
                                        className={`text-center py-2 px-3 rounded-md hover:bg-[#0077B6] cursor-pointer text-white w-full font-medium transition-colors ${dimension === "small" ? "bg-[#0077B6]" : ""}`}>
                                        Small   
                                    </p>
                                    </div>

                                    {/* Medium button */}
                                    <div onClick={() => {
                                        if(subscription > 0) { setDimension("medium") }
                                        else {
                                            setSubspopup(true)
                                        }
                                    }}
                                    className={`group relative w-full rounded-md ${ subscription > 0 ? "hover:bg-[#0077B6]" : ""}`}>
                                    <p
                                        className={`${ subscription < 1 ? "group-hover:opacity-50" : ""} text-center py-2 px-3 rounded-md cursor-pointer text-white w-full font-medium transition-colors ${dimension === "large" ? "bg-[#0077B6]" : ""}`}>
                                        Medium
                                    </p>
                                    {subscription < 1 && (
                                        <div className={`absolute left-12 top-1/2 transform -translate-y-1/2 hover:cursor-pointer opacity-0 ${ subscription <= 1 ? "group-hover:opacity-100" : ""}`}>
                                            <Image src={lock} height={15} width={15} alt="lock" className="h-auto" />
                                        </div>
                                    )}
                                    </div>

                                    {/* Large button */}
                                    <div 
                                    onClick={() => {
                                        if(subscription > 1) { setDimension("large") }
                                        else {
                                            setSubspopup(true)
                                        }
                                    }}
                                    className={`group relative w-full rounded-md ${ subscription >= 1 ? "hover:bg-[#0077B6]" : ""}`}>
                                    <p
                                        className={`${ subscription <= 1 ? "group-hover:opacity-50" : ""} text-center py-2 px-3 rounded-md cursor-pointer text-white w-full font-medium transition-colors ${dimension === "large" ? "bg-[#0077B6]" : ""}`}>
                                        Large
                                    </p>
                                    {subscription <= 1 && (
                                        <div className={`absolute left-12 top-1/2 transform -translate-y-1/2 hover:cursor-pointer opacity-0 ${ subscription <= 1 ? "group-hover:opacity-100" : ""}`}>
                                            <Image src={lock} height={15} width={15} alt="lock" className="h-auto" />
                                        </div>
                                    )}
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button 
                                onClick={() => {generateIcon()}} 
                                className="mt-6 w-full text-center text-white bg-gradient-to-r from-[#0077B6] to-[#4891E5] py-3 rounded-xl cursor-pointer hover:opacity-90 font-bold transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                Generate Icon
                            </button>
                            </div>
                        </div>
                        </div>

                        {/* Prompt Input */}
                        <div className="bg-[#0B1724] rounded-2xl border border-[#1D3348] shadow-lg shadow-black/20 mb-8">
                        <div className="flex items-center justify-between p-5 border-b border-[#1D3348]">
                            <div className="flex items-center">
                            <span className="text-[#D1D1D1] font-semibold">Prompt</span>
                            <div className="ml-3 px-2 py-1 bg-[#1B263B] rounded-md text-xs text-gray-400">Required</div>
                            </div>
                            <div className="flex items-center">
                            <button className="bg-[#1B263B] hover:bg-[#243752] text-gray-400 p-2 rounded-md transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                            <button className="bg-[#1B263B] hover:bg-[#243752] text-gray-400 p-2 rounded-md ml-2 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                            </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <textarea 
                            onChange={(e) => {setPrompt(e.target.value)}} 
                            placeholder="Describe your icon in detail (e.g., 'A modern tech logo with blue and purple gradient, minimalist style with abstract shapes')"
                            className="text-white p-4 rounded-xl w-full h-40 bg-[#1B263B] focus:outline-none resize-none border border-[#243752] focus:border-[#0077B6] transition-colors"
                            ></textarea>
                            <div className="flex flex-col md:flex-row justify-between mt-3 text-sm text-gray-400">
                            <span>{prompt.length}/500 characters</span>
                            <div className="flex items-center mt-2 md:mt-0">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Pro tip: Be specific about colors, style, and mood</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </section>
            <section className="py-20 bg-gradient-to-t from-[#1A1E23] to-[#0F2133]">
                <div className="w-full p-20">
                    <h1 className="text-4xl text-slate-400 font-bold text-center p-10">Frequently Asked Questions</h1>
                </div>
                <div className="w-full p-20">
                    <h6 className="text-4xl text-slate-400 font-bold text-center p-10">What is Icon Generator?</h6>
                    <p className="px-20 text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="w-full p-20">
                    <h6 className="text-4xl text-slate-400 font-bold text-center p-10">How to use?</h6>
                    <p className="px-20 text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="w-full p-20">
                    <h6 className="text-4xl text-slate-400 font-bold text-center p-10">Features included</h6>
                    <p className="px-20 text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </section>
        </>
    )
}