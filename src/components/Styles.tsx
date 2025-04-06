import { Sparkles } from 'lucide-react'

export default function Syles({ children }: { children: React.ReactNode }) {

    return (
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
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}