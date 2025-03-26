export default function Pricing() {
    return (
        <div>
            <div className="h-16 w-full"></div>
            <section className="py-10 bg-gradient-to-b from-[#1A1E23] to-[#0F2133] sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-4xl text-white font-bold lg:text-6xl sm:text-5xl font-poppins">We got a plan for you!</h2>
                        <p className="mt-4 text-lg leading-relaxed text-slate-400">Pay monthly or yearly and enjoy a 7 day free trial. Cancel whenever you feel like it - no fuss and no hoops.</p>
                    </div>
                    <div className="hidden mt-16 lg:block">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="py-8 pr-4"></th>
                                    <th className="px-4 py-8 text-center">
                                        <span className="text-base font-medium text-blue-600"> Free </span>
                                        <p className="mt-6 text-white text-6xl font-bold">$0</p>
                                        <p className="mt-2 text-base font-normal text-slate-400">Per month</p>
                                    </th>
                                    <th className="px-4 py-8 text-center">
                                        <span className="text-base font-medium text-blue-600"> Basic </span>
                                        <div className="flex flex-row justify-center mt-6 text-6xl font-bold text-white">$4<p className="text-xl self-end py-1">.59</p></div>
                                        <p className="mt-2 text-base font-normal text-slate-400">Per month</p>
                                    </th>
                                    <th className="px-4 py-8 text-center bg-gray-700 rounded-t-xl">
                                        <span className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full"> Popular </span>
                                        <div className="flex flex-row justify-center mt-6 text-6xl font-bold text-white">$9<p className="text-xl self-end py-1">.59</p></div>
                                        <p className="mt-2 text-base font-normal text-gray-200">Per month</p>
                                    </th>
                                    <th className="px-4 py-8 text-center">
                                        <span className="text-base font-medium text-blue-600"> Enterprise </span>
                                        <div className="flex flex-row justify-center mt-6 text-6xl font-bold text-white">$14<p className="text-xl self-end py-1">.59</p></div>
                                        <p className="mt-2 text-base font-normal text-slate-400">Per month</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Tokens</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">01 /day</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">50</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white ">50</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Quality</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">100 GB</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">500 GB</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">1 TB</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Size</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">15</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">Unlimited</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Mode</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Styles</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Save icons</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">WordPress install</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">Server speed</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">-</td>
                                    <td className="px-4 py-4 text-center text-white bg-gray-700 border-b border-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                    <td className="px-4 py-4 text-center border-b border-gray-400 text-white">
                                        <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-4"></td>
                                    <td className="px-4 py-6 text-center">
                                        <a href="#" title="" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                            Get Started
                                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </td>
                                    <td className="px-4 py-6 text-center">
                                        <a href="#" title="" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                            Get Started
                                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </td>
                                    <td className="px-4 py-6 text-center text-white bg-orange-600 rounded-b-xl">
                                        <a href="#" title="" className="inline-flex items-center font-semibold text-white">
                                            Get Started
                                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </td>
                                    <td className="px-4 py-6 text-center">
                                        <a href="#" title="" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                            Get Started
                                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Small Screen view */}
                <div className="block mt-12 border-t border-b border-gray-400 divide-y divide-gray-200 lg:hidden">
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">
                            <span className="text-sm font-medium text-blue-600"> Free </span>
                            <p className="mt-2 text-xl font-bold">$0</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                        </div>
                        <div className="px-2 py-2">
                            <span className="text-sm font-medium text-blue-600"> Team </span>
                            <p className="mt-2 text-xl font-bold">$99</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                        </div>
                        <div className="px-2 py-2">
                            <span className="text-sm font-medium text-blue-600"> Popular </span>
                            <p className="mt-2 text-xl font-bold">$150</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                        </div>
                        <div className="px-2 py-2">
                            <span className="text-sm font-medium text-blue-600"> Enterprise </span>
                            <p className="mt-2 text-xl font-bold">$490</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                        </div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">Website number</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">01</div>
                        <div className="px-2 py-2">10</div>
                        <div className="px-2 py-2">100</div>
                        <div className="px-2 py-2">Unlimited</div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">Server storage</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">100 GB</div>
                        <div className="px-2 py-2">500 GB</div>
                        <div className="px-2 py-2">1 TB</div>
                        <div className="px-2 py-2">Unlimited</div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">Database</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">-</div>
                        <div className="px-2 py-2">15</div>
                        <div className="px-2 py-2">Unlimited</div>
                        <div className="px-2 py-2">Unlimited</div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">Unmetered bandwidth</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">-</div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">SSD Disk</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">-</div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">VCPUS Fontworld</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">-</div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="px-2 py-4 sm:px-4">
                        <p className="font-semibold">WordPress install</p>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-2 py-2">-</div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="px-2 py-2">
                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
                        <div className="px-1 py-2 sm:px-4">
                            <span className="text-sm font-medium text-blue-600"> Free </span>
                            <p className="mt-2 text-xl font-bold">$0</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                            <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
                        </div>
                        <div className="px-1 py-2 sm:px-4">
                            <span className="text-sm font-medium text-blue-600"> Team </span>
                            <p className="mt-2 text-xl font-bold">$99</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                            <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
                        </div>
                        <div className="px-1 py-2 sm:px-4">
                            <span className="text-sm font-medium text-blue-600"> Popular </span>
                            <p className="mt-2 text-xl font-bold">$150</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                            <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
                        </div>
                        <div className="px-1 pt-2 pb-4 sm:px-4">
                            <span className="text-sm font-medium text-blue-600"> Enterprise </span>
                            <p className="mt-2 text-xl font-bold">$490</p>
                            <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                            <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}