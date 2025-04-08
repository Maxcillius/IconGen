import React from 'react';
import { Mail, Globe } from 'lucide-react';

export default function TermsofService() {
    return (
        <>
            <div className='h-16 w-full' />
            <div className="min-h-screen bg-gray-900 text-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                    <div className="space-y-6 md:space-y-8">
                        {/* Header */}
                        <div className="text-center mb-8 md:mb-12">
                            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Terms of Service</h1>
                            <p className="text-sm md:text-base text-gray-400">Effective Date: March 14, 2025</p>
                        </div>

                        {/* Introduction */}
                        <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                Welcome to IconGen ("we," "us," or "our"). These Terms of Service ("Terms") govern your use of our web-based icon generation platform and related services (the "Service") available at icongen.com (the "Site").
                            </p>
                            <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300 leading-relaxed">
                                By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.
                            </p>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-6 md:space-y-8">
                            {/* Section 1 */}
                            <section className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">1. Use of the Service</h2>
                                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                    You must be at least 13 years old (or the minimum legal age in your country) to use the Service. If you use the Service on behalf of an organization, you are agreeing to these Terms for that organization and confirming that you have the authority to bind them.
                                </p>
                                <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300 leading-relaxed">
                                    You agree to use the Service only for lawful purposes and in accordance with these Terms.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">2. Account Registration</h2>
                                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                    To access certain features, you may be required to create an account. You are responsible for safeguarding your account credentials and agree not to share them. You are responsible for all activities that occur under your account.
                                </p>
                            </section>

                            {/* Section 3 */}
                            <section className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">3. Icon Usage & Licensing</h2>
                                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-300">
                                    <li>Personal and Commercial Use: You may use generated icons for both personal and commercial projects.</li>
                                    <li>No Resale or Redistribution: You may not resell, sublicense, or redistribute the icons as standalone assets.</li>
                                    <li>Ownership: All icons are generated based on inputs you provide. We do not claim ownership of your generated icons, but we reserve the right to use anonymized output for marketing and product improvement purposes.</li>
                                </ul>
                            </section>

                            {/* Contact Section */}
                            <section className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">11. Contact</h2>
                                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">If you have any questions about these Terms, please contact us at:</p>
                                <div className="flex flex-col space-y-2 text-sm md:text-base text-gray-300">
                                    <a href="mailto:support@icongen.com" className="flex items-center hover:text-blue-400 transition-colors">
                                        <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                        support@icongen.com
                                    </a>
                                    <a href="https://icongen.com" className="flex items-center hover:text-blue-400 transition-colors">
                                        <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                        icongen.com
                                    </a>
                                </div>
                            </section>
                        </div>

                        {/* Footer */}
                        <footer className="text-center text-sm md:text-base text-gray-400 mt-8 md:mt-12">
                            <p>© 2024 IconGen. All rights reserved.</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}