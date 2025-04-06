import { Crown, X } from "lucide-react";

export default function SubscriptionPopup({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) {
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