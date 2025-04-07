import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 sm:py-6 px-4 sm:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex items-center">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16H11V18H13V16Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM10 9H7V7H17V9H14V16H10V9Z" fill="currentColor" />
            </svg>
          </div>
          <div className="text-sm sm:text-sm font-semibold text-white px-2">IconGen Inc.</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
          {/* <Link
            href="/feedback/submit"
            className="hover:text-blue-400 text-[8px] lg:text-xs transition-colors duration-300 px-2 py-1"
          >
            Submit Feedback
          </Link> */}
          <Link
            href="/termsofservice"
            className="hover:text-blue-400 text-[8px] lg:text-xs transition-colors duration-300 px-2 py-1"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacypolicy"
            className="hover:text-blue-400 text-[8px] lg:text-xs transition-colors duration-300 px-2 py-1"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refundpolicy"
            className="hover:text-blue-400 text-[8px] lg:text-xs transition-colors duration-300 px-2 py-1"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}