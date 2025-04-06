"use client"

import { dall2, dall3 } from "../../interfaces/dimensions"
import { useState } from "react"
import { Download, Trash2, Info, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPopupState } from "@/state/popup/popup";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Sticker from "@/images/sticker.png"
import Pixel from "@/images/pixel.png"
import Vector from "@/images/vector.png"
import { StaticImageData } from "next/image"
import Styles from "@/components/Styles";
// import SubscriptionPopup from "@/components/SubscriptionPopup";

export default function Home() {
    const [quality, setQuality] = useState("standard")
    const [dimension, setDimension] = useState("small")
    const [count, setCount] = useState(1)
    const [prompt, setPrompt] = useState("")
    const [error, setError] = useState("")
    const [imageLink, setImageLink] = useState<{url: string}[]>([])
    // const [subspopup, setSubspopup] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [model, setModel] = useState("dall-e-2")
    const [mode, setMode] = useState("Pixel")
    // const [subscription, setSubscription] = useState(-1)

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
                        model: model,
                        quality: quality,
                        size: quality === "hd" ? dall3[dimension] : dall2[dimension],
                        style: "vivid",
                        count: count
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
                setImageLink(data.contents)
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
                {/* {subspopup && <SubscriptionPopup close={setSubspopup} />} */}

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Panel - Style Library */}
                        <Styles>
                            {
                                modes.map((style) => {
                                    return (
                                        <div key={style.id} onClick={() => {
                                            setMode(style.id)
                                        }} className={`relative hover:cursor-pointer`}>
                                            <div className={`absolute w-full h-full rounded-xl ${mode === style.id ? "border-4 border-blue-600" : ""}`}></div>
                                            <Image src={modeImages[style.id]} alt="icon"
                                                className={`w-28 h-28 rounded-xl`}
                                            >
                                            </Image>
                                        </div>
                                    )
                                })
                            }
                        </Styles>

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
                                            </div>
                                            <div className="relative bg-[#0A0F16] rounded-xl border border-[#1F2937] p-4 lg:p-8 flex items-center justify-center">
                                                {
                                                    generating &&
                                                    <div className="w-12 h-12 rounded-full border-blue-500 border-2 border-t-transparent animate-spin"></div>
                                                }
                                                {
                                                    imageLink && imageLink.length > 0 ? (
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                                                            {imageLink.map((img: {url: string}, index) => (
                                                                <div key={index} className="relative w-full h-32 lg:h-48">
                                                                    <Image
                                                                        src={img.url}
                                                                        alt={`Generated Icon ${index + 1}`}
                                                                        className="w-full h-full object-cover rounded-xl"
                                                                        width={500}
                                                                        height={500}
                                                                    />
                                                                    <a href={img.url} download className="absolute top-2 right-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg shadow-blue-500/20">
                                                                        <Download size={16} className="text-white" />
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        !generating &&
                                                        <div className="flex items-center justify-center h-full">
                                                            <p className="text-gray-500 text-sm">No icons generated yet</p>
                                                        </div>
                                                    )
                                                }
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
                                                            onClick={() => {
                                                                setQuality("hd")
                                                                setDimension("medium")
                                                                setModel("dall-e-3")
                                                            }}
                                                            className={`w-full py-2 px-4 text-xs lg:text-base rounded-md transition-all duration-300 ${quality === "hd"
                                                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                : "text-gray-400 hover:text-white"
                                                                }`}
                                                        >
                                                            HD
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dimension Setting */}
                                            <div className="relative">
                                                <label className="text-gray-400 text-sm font-medium mb-2 block">Dimension</label>
                                                <div className="grid grid-cols-3 gap-2 bg-[#0A0F16] p-1 rounded-lg">
                                                    {["small", "medium", "large"].map((size, index) => {
                                                        if((quality === "hd" || model === "dall-e-3") && size === "small") {
                                                            return null
                                                        } else {
                                                            return (
                                                                <div key={size} className="relative w-full">
                                                                    <button
                                                                        onClick={() => setDimension(size)}
                                                                        className={`w-full py-2 px-4 text-xs lg:text-base rounded-md capitalize transition-all duration-300 ${dimension === size
                                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                            : "text-gray-400 hover:text-white"
                                                                            }`}
                                                                    >
                                                                        {size}
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>

                                            {/* Number of Icons and Model*/}
                                            <div className="relative flex flex-col gap-5">
                                                <div className="flex flex-col">
                                                    <label className="text-gray-400 text-sm font-medium mb-2 block">Icons</label>
                                                    <div className="grid grid-cols-3 gap-2 bg-[#0A0F16] p-1 rounded-lg">
                                                        <div className="relative w-fit">
                                                            <input
                                                                defaultValue={1}
                                                                onChange={(e) => {setCount(Number(e.target.value))}}
                                                                min={1}
                                                                max={10}
                                                                type="number"
                                                                onClick={() => setCount(1)}
                                                                className="appreance-none w-full py-2 px-4 text-xs lg:text-base rounded-md focus:outline-none capitalize bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                            >
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 bg-[#0A0F16] p-1 rounded-lg">
                                                    <div className="relative w-full">
                                                        <button
                                                            onClick={() => {
                                                                if(quality!=="hd") setModel("dall-e-2")
                                                            }}
                                                            className={`w-full py-2 px-4 text-xs lg:text-base rounded-md capitalize transition-all duration-300 ${model === "dall-e-2"
                                                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                : "text-gray-400 hover:text-white"
                                                                }`}
                                                        >
                                                            Dall-e-2
                                                        </button>
                                                    </div>
                                                    <div className="relative w-full">
                                                        <button
                                                            onClick={() => setModel("dall-e-3")}
                                                            className={`w-full py-2 px-4 text-xs lg:text-base rounded-md capitalize transition-all duration-300 ${model === "dall-e-3"
                                                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                                                                : "text-gray-400 hover:text-white"
                                                                }`}
                                                        >
                                                            Dall-e-3
                                                        </button>
                                                    </div>
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
                        </div>
                    </div>
                </div>
                <div className="w-full h-96">

                </div>
            </div>
        </>
    );
}