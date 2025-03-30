"use client"
import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface NotFoundProps {
//   onBack?: () => void;
// }

// export default function NotFound({ onBack }: NotFoundProps) {
export default function NotFound() {
  // const router = useRouter();
  // const handleBack = onBack || (() => router.back());

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <AlertCircle className="h-24 w-24 text-indigo-500" />
        </div>
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Oops! The page you"re looking for seems to have wandered off into the digital void.
        </p>
        <button
          // onClick={handleBack}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back
        </button>
      </div>
    </div>
  );
}