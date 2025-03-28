export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16H11V18H13V16Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM10 9H7V7H17V9H14V16H10V9Z" fill="currentColor" />
            </svg>
          </div>
          <div className="text-xl font-semibold text-white">IconGen Inc.</div>
        </div>

        <div className="flex flex-wrap gap-8">
          <a href="#feedback" className="hover:text-blue-400 transition-colors duration-300">
            Submit Feedback
          </a>
          <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">
            Contact
          </a>
          <a href="#instagram" className="hover:text-blue-400 transition-colors duration-300">
            Instagram
          </a>
          <a href="#twitter" className="hover:text-blue-400 transition-colors duration-300">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}