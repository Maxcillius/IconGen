"use client"

import { dall2, dall3 } from "../../interfaces/dimensions"
import { useState } from "react"
import { Crown, Download, X, Trash2, Info, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPopupState } from "@/state/popup/popup";
import { StaticImageData } from "next/image"
import Image from "next/image";
import { useSelector } from "react-redux";
import Sticker from "@/images/sticker.png"
import Pixel from "@/images/pixel.png"
import Vector from "@/images/vector.png"
import { useSession } from "next-auth/react";
import { RootState } from "@/state/store";

export default function Home() {
    const [quality, setQuality] = useState("standard")
    const [dimension, setDimension] = useState("small")
    const [prompt, setPrompt] = useState("")
    const [error, setError] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [subspopup, setSubspopup] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [mode, setMode] = useState("Pixel")

    const modeImages: Record<string, StaticImageData> = {
        "Sticker": Sticker,
        "Pixel": Pixel,
        "Vector": Vector,
    };

    const modes = [
        { id: "Pixel" },
        { id: "Sticker" },
        { id: "Vector" },
    ];

    const subscription = useSelector((state: RootState) => {
        return state.userInfo.value.subscription
    })
    const { data: session, status } = useSession()
    
    const setVisibility = useDispatch()

    const generateIcon = async () => {
        if(window.screen.width < 500) {
            window.scrollTo({ top: 550, behavior: "smooth" })
        }
        if (!session) {
            setVisibility(setPopupState())
            return
        }
        if (prompt === "") {
            setError("Please enter a prompt to generate your icon");
            return;
        }
        setGenerating(true)
        try {
            setError("")
            await fetch("/api/icon/generate",
                {
                    method: "POST",
                    body: JSON.stringify({
                        prompt: prompt,
                        mode: mode,
                        model: quality === "hd" ? "dall-e-3" : "dall-e-2",
                        quality: quality,
                        size: quality === "hd" ? dall3[dimension] : dall2[dimension],
                        style: "natural",
                    })
                }
            ).then(response => {
                return response.json()
            }).then(data => {
                if (data.success === 0) {
                    setError(data.msg)
                    setGenerating(false)
                    return
                }
                setImageLink(data.url)
            })
        } catch (error) {
            console.log(error)
        }
        setGenerating(false)
    }

    return (
        <>
            <div className="h-16 w-full"></div>
            <div className="min-h-screen bg-[#0A0F16]">
                {subspopup && <SubscriptionPopup close={setSubspopup} />}

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Panel - Style Library */}
                        <div className="w-full lg:w-72">
                            <div className="rounded-2xl bg-[#111827] border border-[#1F2937] overflow-hidden shadow-xl shadow-black/20">
                                <div className="p-4 bg-gradient-to-r from-[#1E293B] to-[#1a1f2b] border-b border-[#1F2937]">
                                    <h3 className="text-white font-semibold flex items-center gap-2">
                                        <Sparkles size={18} className="text-blue-400" />
                                        Style Library
                                    </h3>
                                </div>
                                <div className="p-4 h-[calc(90vh-12rem)] overflow-y-scroll flex flex-col gap-5">
                                    <div className="flex flex-row flex-wrap justify-evenly gap-5">
                                        {
                                            modes.map((style) => {
                                                return (
                                                    <div key={style.id} onClick={() => { setMode(style.id) }} className="relative hover:cursor-pointer">
                                                        <div className={`absolute w-full h-full rounded-xl ${mode === style.id ? "border-4 border-blue-600" : ""}`}></div>
                                                        <Image src={modeImages[style.id]} alt="icon"
                                                            className={`w-28 h-28 rounded-xl`}
                                                        >

                                                        </Image>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Main Content */}
                        <div className="flex-1 space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl text-white font-bold">Icon Generator</h1>
                                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-xs font-medium text-white rounded-full shadow-lg shadow-blue-500/20">PRO</span>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 animate-fade-in">
                                    <p className="text-red-400 flex items-center gap-2 text-xs lg:text-base">
                                        <Info size={16} />
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Preview and Settings Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Preview Panel */}
                                <div className="lg:col-span-2">
                                    <div className="bg-[#111827] rounded-2xl border border-[#1F2937] shadow-xl shadow-black/20 overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-white font-medium flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    Preview
                                                </h2>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => imageLink && window.open(imageLink, "_blank")}
                                                        className="p-2 bg-[#1E293B] hover:bg-[#2D3B4F] rounded-lg transition-all duration-300 text-gray-400 hover:text-white"
                                                    >
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="relative bg-[#0A0F16] rounded-xl border border-[#1F2937] p-4 lg:p-8 flex items-center justify-center">
                                                {
                                                    generating && (
                                                        <>
                                                            <div className="absolute w-64 h-64 rounded-full border-8 border-blue-700 border-l-transparent animate-spin"></div>
                                                        </>
                                                    )}
                                                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#1E293B] to-[#111827] p-1 shadow-2xl shadow-black/40">
                                                    <div className="w-full h-full rounded-full bg-[#0A0F16] flex items-center justify-center">
                                                        {imageLink &&
                                                            <Image
                                                                src={imageLink}
                                                                alt="Generated icon"
                                                                className="w-full h-full rounded-full object-cover"
                                                                width={500}
                                                                height={500}
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Panel */}
                                <div className="bg-[#111827] rounded-2xl border border-[#1F2937] shadow-xl shadow-black/20 overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-white font-medium flex items-center gap-2 mb-6">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            Settings
                                        </h2>
                                        <div className="space-y-6">
                                            {/* Quality Setting */}
                                            <div className="relative">
                                                <label className="text-gray-400 text-sm font-medium mb-2 block">Quality</label>
                                                <div className="grid grid-cols-2 gap-2 bg-[#0A0F16] p-1 rounded-lg">
                                                    <button
                                                        onClick={() => setQuality("standard")}
                                                        className={`py-2 px-4 text-xs lg:text-base rounded-md transition-all duration-300 ${quality === "standard"
                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                            : "text-gray-400 hover:text-white"
                                                            }`}
                                                    >
                                                        Standard
                                                    </button>
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setQuality("hd")}
                                                            className={`w-full py-2 px-4 text-xs lg:text-base rounded-md transition-all duration-300 ${quality === "hd"
                                                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                : "text-gray-400 hover:text-white"
                                                                } ${subscription < 1 ? "opacity-50" : ""}`}
                                                        >
                                                            HD
                                                        </button>
                                                        {subscription < 1 && (
                                                            <div onClick={() => { setSubspopup(true) }} className="bg-balck opacity-50 absolute inset-0 flex items-center justify-end pr-4 hover:cursor-pointer">
                                                                
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dimension Setting */}
                                            <div className="relative">
                                                <label className="text-gray-400 text-sm font-medium mb-2 block">Dimension</label>
                                                <div className="grid grid-cols-3 gap-2 bg-[#0A0F16] p-1 rounded-lg">
                                                    {["small", "medium", "large"].map((size, index) => {
                                                        if(quality === "hd" && size === "small") {
                                                            return null
                                                        } else {
                                                            return (
                                                                <div key={size} className="relative w-full">
                                                                    <button
                                                                        onClick={() => setDimension(size)}
                                                                        className={`w-full py-2 px-4 text-xs lg:text-base rounded-md capitalize transition-all duration-300 ${dimension === size
                                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                            : "text-gray-400 hover:text-white"
                                                                            } ${subscription < index && !session ? "opacity-50" : ""}`}
                                                                    >
                                                                        {size}
                                                                    </button>
                                                                    {subscription < index && size !== "small" && (
                                                                        <div onClick={() => { setSubspopup(true) }} className="bg-black opacity-50 hover:cursor-pointer absolute inset-0 flex items-center justify-end pr-2">
                                                                            
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>

                                            {/* Generate Button */}
                                            <button
                                                onClick={generateIcon}
                                                className="w-full py-3 text-sm lg:text-base px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                            >
                                                <Sparkles size={18} />
                                                Generate Icon
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Prompt Input */}
                            <div className="bg-[#111827] rounded-2xl border border-[#1F2937] shadow-xl shadow-black/20 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-white font-medium flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                Prompt
                                            </h2>
                                            <span className="px-2 py-1 bg-[#1E293B] text-xs text-gray-400 rounded-md">Required</span>
                                        </div>
                                        <button
                                            onClick={() => setPrompt("")}
                                            className="p-2 text-gray-500 hover:text-gray-400 transition-colors duration-300"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe your icon in detail (e.g., 'A modern tech logo with blue and purple gradient, minimalist style with abstract shapes')"
                                        className="w-full text-xs lg:text-base h-32 bg-[#0A0F16] text-gray-300 placeholder-gray-600 rounded-xl border border-[#1F2937] p-4 focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-sm">
                                        <span className="text-gray-500 text-[10px] lg:text-base">{prompt.length}/500 characters</span>
                                        <span className="text-gray-500 flex items-center gap-1 text-[7px] lg:text-base">
                                            <Info size={14} />
                                            Pro tip: Be specific about colors, style, and mood
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-96">

                </div>
            </div>
        </>
    );
}

function SubscriptionPopup({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#111827] w-full max-w-[384px] rounded-2xl border border-[#1F2937] shadow-2xl">
                <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg shadow-blue-500/20">
                                <Crown size={18} className="text-white sm:w-5 sm:h-5" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white">Upgrade to Pro</h2>
                        </div>
                        <button
                            onClick={() => close(false)}
                            className="text-gray-500 hover:text-gray-400 transition-colors duration-300"
                        >
                            <X size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base text-gray-400">
                            Unlock premium features and enhance your creative workflow!
                        </p>

                        <div className="bg-[#0A0F16] rounded-xl p-3 sm:p-4 border border-[#1F2937]">
                            <ul className="space-y-2 sm:space-y-3">
                                {["HD Quality Generation", "Larger Dimensions", "Priority Processing"].map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                            <span className="text-xs sm:text-sm text-gray-500">Starting at $4.59/mo</span>
                            <a
                                href="/pricing"
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-center rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                            >
                                Upgrade Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}