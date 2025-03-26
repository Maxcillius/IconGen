export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">SW</span>
            </div>
            <div className="text-xl font-semibold text-white">ShopWave Inc.</div>
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